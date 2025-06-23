
const Category = require("../models/Category");
const Course = require("../models/Course");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");

require("dotenv").config();

exports.editCourse = async (req, res) => {
    try {
        let {
            courseTitle,
            courseDescription,
            category,
            price,
            whatYouWillLearn,
            instructions,
            tag,
            courseID,
            status,
        } = req.body;
        console.log("got status", status);

        const courseDetails = await Course.findById(courseID);
        if (courseTitle) {
            courseDetails.courseTitle = courseTitle;
        }
        if (courseDescription) {
            courseDetails.courseDescription = courseDescription;
        }
        if (price) {
            courseDetails.price = price;
        }
        if (whatYouWillLearn) {
            courseDetails.whatYouWillLearn = whatYouWillLearn;
        }
        if (category) {
            courseDetails.category = category;
        }
        if (tag) {
            tag = reverseToStringEffect(tag);
            courseDetails.tag = tag;
        }
        if (instructions) {
            instructions = reverseToStringEffect(instructions);
            courseDetails.instructions = instructions;
        }
        if (status) {
            courseDetails.status = status;
        }
        if (req.files && req.files.thumbnailImage) {
            const thumbnail = req.files.thumbnailImage;
            const thumbnailURL = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            );
            courseDetails.thumbnail = thumbnailURL.secure_url;
        }

        await courseDetails.save();

        const updatedCourse = await Course.findById(courseID);

        return res.status(200).json({
            success: true,
            message: "Course edited successfully",
            updatedCourse,
        });
    } catch (error) {
        console.log("Error occured while editing the coursae", error);
        return res.status(500).json({
            success: false,
            error,
        });
    }
};
function reverseToStringEffect(str) {
    if (typeof str === "undefined") {
        throw new Error("The input string is undefined");
    }

    if (typeof str !== "string") {
        throw new Error("The input is not a string");
    }

    // Parse the JSON string
    try {
        return JSON.parse(str);
    } catch (error) {
        throw new Error("Error parsing JSON string: " + error.message);
    }
}
exports.createCourse = async (req, res) => {
    try {
        //DATA FETCHING
        let {
            courseTitle,
            courseDescription,
            whatYouWillLearn,
            price,
            category,
            tag,
            instructions,
        } = req.body;

        let status = req.body.status;

        const thumbnail = req.files.thumbnailImage;

        console.log("thumbnail m ye mila hai ", thumbnail);

        //DATA VALIDATION

        if (
            !courseTitle ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !category ||
            !tag
        ) {
            return res.status(500).json({
                success: false,
                message: "All Details are not filled ",
            });
        }

        console.log(instructions);
        instructions = reverseToStringEffect(instructions);
        tag = reverseToStringEffect(tag);

        console.log(instructions);
        console.log("Updated", instructions);
        console.log("Updated", tag);

        if (!status || status === undefined) {
            status = "Draft";
        }

        //INSTRUCTOR DETAILS FETCH
        const userID = req.user.id;

        const instructorDetails = await User.findById(userID);

        if (!instructorDetails) {
            return res.status(500).json({
                success: false,
                message: "Instructor Details not found",
            });
        }
        //confirming if category exist
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(500).json({
                success: false,
                message: "Category Details not found ",
            });
        }

        //UPLOADING THUMBNAIL ON CLOUDINARY
        const thumbnailURL = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );

        //CREATING NEW COURSE
        const courseDetails = await Course.create({
            courseTitle,
            courseDescription,
            price,
            thumbnail: thumbnailURL.secure_url,
            whatYouWillLearn,
            instructor: instructorDetails._id,
            category: categoryDetails._id,
            tag,
            status,
            instructions,
        });

        //UPDATING USER BY ADDING COURSE IN INSTRUCOTR COURSES COLUMN
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: courseDetails._id,
                },
            },
            { new: true }
        );

        //UPDATING CATEGORY
        await Category.findByIdAndUpdate(
            { _id: categoryDetails._id },
            {
                $push: {
                    course: courseDetails._id,
                },
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Course Added Successfully",
            success: true,
            courseDetails,
        });
    } catch (error) {
        console.log("Problem occured while creating the course", error);
        return res.status(500).json({
            success: false,
            message: "Course Creation failed",
        });
    }
};

//show all courses
exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find(
            {},
            {
                courseTitle: true,
                courseDescription: true,
                price: true,
                whatYouWillLearn: true,
                instructor: true,
                thumbnail: true,
                studentsEnrolled: true,
            }
        )
            .populate("instructor")
            .exec();

        return res.status(200).json({
            message: "Course Fetched Successfully",
            success: true,
            allCourses,
        });
    } catch (error) {
        console.log("Problem occured while fetching the course", error);
        return res.status(500).json({
            success: false,
            message: "Course Fetch failed",
        });
    }
};

exports.getAllCourseDetails = async (req, res) => {
    try {
        const { courseID } = req.body;
        console.log(req.body);

        if (!courseID) {
            return res.status(500).json({
                success: false,
                message: "Course id not found",
            });
        }

        const course = await Course.findById(courseID)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSections",
                },
            })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .exec();

        if (!course) {
            return res.status(500).json({
                success: false,
                message: "Course not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course info fetched successfully",
            data: course,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Course info fetching failed",
        });
    }
};

//show all  instructor courses
exports.getAllMyCreatedCourses = async (req, res) => {
    try {
        const userID = req.user.id;

        const user = await User.findById(userID).populate("courses").exec();
        if (!user) {
            return res.status(500).json({
                sucess: false,
                message: "User not found",
            });
        }
        const createdCourses = user.courses;
        return res.status(200).json({
            message: "Course Fetched Successfully",
            success: true,
            data: createdCourses,
        });
    } catch (error) {
        console.log("Problem occured while fetching the courses", error);
        return res.status(500).json({
            success: false,
            message: "Course Fetch failed",
        });
    }
};
//show all  bought student  courses
exports.getAllEnrolledCourses = async (req, res) => {
    try {
        const userID = req.user.id;

        const user = await User.findById(userID).populate("courses").exec();
        if (!user) {
            return res.status(500).json({
                sucess: false,
                message: "User not found",
            });
        }
        const boughtCourses = user.courses;
        return res.status(200).json({
            message: "Course Fetched Successfully",
            success: true,
            data: boughtCourses,
        });
    } catch (error) {
        console.log("Problem occured while fetching the courses", error);
        return res.status(500).json({
            success: false,
            message: "Course Fetch failed",
        });
    }
};

exports.getCoursePlusProgressDetails = async (req, res) => {
    try {
        const { courseID } = req.body;
        const userID = req.user.id;

        if (!courseID) {
            return res.status(400).json({
                success: false,
                message: "Course id not found",
            });
        }

        const course = await Course.findById(courseID).populate({
            path: "courseContent",
            populate: {
                path: "subSections",
            },
        });

        let courseProgress = await CourseProgress.findOne({ courseID, userID });
        if (!courseProgress) {
            courseProgress = await CourseProgress.create({ courseID, userID });
        }
        const completedLectures = courseProgress.completesVideos
            ? courseProgress.completesVideos
            : [];

        if (!course) {
            return res.status(500).json({
                success: false,
                message: "Course not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course info fetched successfully",
            data: { course, completedLectures },
        });
    } catch (error) {
        console.error(
            "An error occurred while fetching the course info",
            error
        );
        return res.status(500).json({
            success: false,
            message: "Course info fetching failed",
        });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        // Fetch the section ID and course ID from the request parameters
        const { courseID } = req.body;

        const userID = req.user.id;

        // Validation
        if (!courseID) {
            return res.status(400).json({
                success: false,
                message: "course ID are required.",
            });
        }

        // Remove the section from the Section model
        await Course.findByIdAndDelete(courseID);

        // Remove the section reference from the Course model
        await User.findByIdAndUpdate(courseID, {
            $pull: { course: courseID },
        });

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        console.error("An error occurred while deleting the courses", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete the course",
        });
    }
};
