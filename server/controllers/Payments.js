const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const { mailSender } = require("../utils/MailSender");
const crypto=require('crypto');
const CourseProgress = require("../models/CourseProgress");

exports.createOrder = async (req, res) => {
    try {
        const { courses } = req.body;
        const userID = req.user.id;

        console.log(courses);

        if (!courses || courses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No courses provided",
            });
        }

        let totalAmt = 0;
        for (let courseID of courses) {
            if (!mongoose.Types.ObjectId.isValid(courseID)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid course ID: ${courseID}`,
                });
            }

            const courseDetail = await Course.findById(courseID);
            if (!courseDetail) {
                return res.status(404).json({
                    success: false,
                    message: `Course not found: ${courseID}`,
                });
            }

            // Check if the user is already enrolled in the course
            const isEnrolled = courseDetail.studentsEnrolled.includes(new mongoose.Types.ObjectId(userID));
            if (isEnrolled) {
                return res.status(400).json({
                    success: false,
                    message: `Already enrolled in course: ${courseDetail.name}`,
                });
            }

            totalAmt += courseDetail.price;
        }

        const receiptId = `receipt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

        const options = {
            amount: totalAmt * 100,
            currency: "INR",
            receipt: receiptId,
        };

        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success: true,
            message: "Payment order initiated successfully",
            order: paymentResponse,
        });
    } catch (error) {
        console.error("Error occurred in creating the payment order:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}
exports.verifyOrder = async (req, res) => {
    try {
        const razorpay_order_id = req.body?.formData?.razorpay_order_id;
        const razorpay_payment_id = req.body?.formData?.razorpay_payment_id;
        const razorpay_signature = req.body?.formData?.razorpay_signature;
        console.log("verify ki body ",req.body);

        const { courses } = req.body?.formData;
        const userID = req.user.id;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !courses ||
            !userID
        ) {
            return res.status(404).json({
                success: false,
                message: "The fields were empty",
            });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            // Enroll the student in the course
            await enrollTheStudent(userID, courses, res);

            for(let course of courses){
                const createdCourseProgess=await CourseProgress.create({userID:userID,courseID:course});
            }

            return res.status(200).json({
                success: true,
                message: "Student enrolled successfully",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const enrollTheStudent = async (userID, courses, res) => {
    try {
        if (!userID || !courses) {
            return res.status(500).json({
                success: false,
                message: "Some data not found while enrolling",
            });
        }

        for (let course of courses) {
            // Add the course id to the user
            const updatedUser = await User.findByIdAndUpdate(
                userID,
                {
                    $push: { courses: course },
                },
                { new: true }
            );

            // Add the user to the course
            const updatedCourse = await Course.findByIdAndUpdate(
                course,
                {
                    $push: { studentsEnrolled: userID },
                },
                { new: true }
            );

            // Send the mail
            await mailSender(
                updatedUser.emailID,
                "Message regarding the course enrollment",
                "You have been successfully enrolled in the course"
            );
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                "Some error occurred while enrolling the student in the course",
        });
    }
};

exports.sendSuccessMail = async (req, res) => {
    try {
        const { order_id, payment_id, amt } = req.body;
        const userID = req.user.id;


        // Validate input
        if (!order_id || !payment_id || !amt) {
            return res.status(400).json({
                success: false,
                message: "All fields must be filled",
            });
        }

        // Fetch user from the database
        const student = await User.findById(userID);

        // Check if user exists
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Send success email
        await mailSender(
            student.emailID,
            "Course bought successfully",
            `With order ID: ${order_id} \nWith payment ID: ${payment_id} \nWith the amount of ${amt/100}`
        );

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Success mail sent",
        });
    } catch (error) {
        console.error("Error occurred while sending mail:", error);
        return res.status(500).json({
            success: false,
            message: "Some error occurred while sending success mail",
            error: error.message,
        });
    }
};
