const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//updateprofile
exports.updateProfile = async (req, res) => {
    try {
        //get data from body
        const { firstName, lastName, gender, dateOfBirth, phoneNumber, about } =
            req.body.data;
        console.log(req.body);
        const userID = req.user.id;
        console.log("fist");

        if (!userID) {
            return res.status(500).json({
                success: false,
                message: "User id field could not be fetched",
            });
        }

        console.log("fist");
        //get profile id

        const userDetails = await User.findById(userID);
        if (!userDetails) {
            return res.status(500).json({
                success: false,
                message: "User not found",
            });
        }
        console.log("first");
        const profileDetails = await Profile.findById(
            userDetails.additionalDetails
        );
        console.log("first");

        if (gender) {
            profileDetails.gender = gender;
        }
        if (dateOfBirth) {
            profileDetails.dateOfBirth = dateOfBirth;
        }
        if (phoneNumber) {
            profileDetails.phoneNumber = phoneNumber;
        }
        if (about) {
            profileDetails.about = about;
        }
        await profileDetails.save();

        if (firstName) {
            userDetails.firstName = firstName;
        }
        if (lastName) {
            userDetails.lastName = lastName;
        }

        await userDetails.save();

        const updatedUserDetails = await User.findById(userID).populate(
            "additionalDetails"
        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        });
    } catch (error) {
        console.log("profile updattion failed", error);
        return res.status(500).json({
            success: false,
            message: "Profile updated failed",
        });
    }
};

exports.getAllUserDetails = async (req, res) => {
    try {
        const userID = req.user.id;
        if (!userID) {
            return res.status(500).json({
                success: false,
                message: "UserID could not be fetched",
            });
        }

        const userDetails = await User.findById(userID)
            .populate("additionalDetails")
            .exec();
        if (!userDetails) {
            return res.status(500).json({
                success: false,
                message: "User coudl not be found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User info fetched succcessfully",
            userDetails,
        });
    } catch (error) {
        console.log("Data fetchign failed", error);
        return res.status(500).json({
            success: false,
            message: "User info fetching failed",
        });
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
        console.log("lg");
        const displayPicture = req.files.displayPicture;
        // console.log(req);
        console.log("hello");
        const userId = req.user.id;
        console.log(displayPicture);
        console.log("hello here");
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );
        console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        );
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getProfileImg = async (req, res) => {
    try {
        const userid = req.user.id;
        if (!userid) {
            return res.status(400).json({
                success: false,
                message: `Please provide me with a user id`,
            });
        }
        const user = await User.findById(userid);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            });
        }

        const imageurl = user.image;
        return res.status(200).json({
            success: true,
            message: "Profile image was fetched successfully",
            imageurl,
        });
    } catch (error) {
        console.log("Error occured while fetching the profile image ", error);
        return res.status(500).json({
            success: false,
            message: "Profile img not fetched ",
            error,
        });
    }
};

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let result = "";
    if (hours > 0) {
        result += `${hours}h `;
    }
    if (minutes > 0 || hours > 0) {
        // include minutes if hours are present
        result += `${minutes}m `;
    }
    result += `${secs}s`;

    return result.trim();
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findOne({ _id: userId })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSections",
                    },
                },
            })
            .exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            });
        }

        const courseData = await Promise.all(
            userDetails.courses.map(async (course) => {
                let totalDuration = 0;
                let totalSubSections = 0;

                const courseProgress = await CourseProgress.findOne({
                    userID: userId,
                    courseID: course._id,
                });
                const completedSubSections = courseProgress
                    ? courseProgress.completesVideos.length
                    : 0;

                course.courseContent.forEach((section) => {
                    section.subSections.forEach((subSection) => {
                        totalDuration += Number(subSection.duration);
                        totalSubSections++;
                    });
                });

                const progressPercentage =
                    totalSubSections > 0
                        ? (completedSubSections / totalSubSections) * 100
                        : 0;

                return {
                    ...course.toObject(),
                    duration: formatDuration(totalDuration),
                    progressPercentage: progressPercentage.toFixed(2), // Optional: format to 2 decimal places
                };
            })
        );

        console.log(courseData);

        return res.status(200).json({
            success: true,
            data: courseData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        // Delete Assosiated Profile with the User
        await Profile.findByIdAndDelete({ _id: user.additionalDetails });

        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "User Cannot be deleted successfully",
        });
    }
};

exports.getInstructorDashboardDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const courses = await Course.find({ instructor: userId });

        let totalStudents = 0;
        let totalAmount = 0;

        // Collect detailed stats for each course
        const courseStatData = courses.map((course) => {
            totalStudents += course.studentsEnrolled.length;
            totalAmount += course.studentsEnrolled.length * course.price;

            return {
                courseId: course._id,
                courseName: course.courseTitle,
                image: course.thumbnail,
                studentsEnrolled: course.studentsEnrolled.length,
                revenue: course.studentsEnrolled.length * course.price,
                price:course.price,
            };
        });

        // Send the response with the calculated details
        res.status(200).json({
            success: true,
            data: {
                totalStudents,
                totalAmount,
                courseStatData,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
