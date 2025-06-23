const CourseProgress = require('../models/CourseProgress');

exports.updateCourseProgress = async (req, res) => {
    try {
        const { subSectionId, courseId } = req.body;
        const userId = req.user.id;

        if (!subSectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const courseProgress = await CourseProgress.findOne({ courseID: courseId, userID: userId });
        if (courseProgress) {
            if (courseProgress.completesVideos.includes(subSectionId)) {
                return res.status(400).json({
                    success: false,
                    message: "The subsection is already completed",
                });
            } else {
                courseProgress.completesVideos.push(subSectionId);
                await courseProgress.save();

                return res.status(200).json({
                    success: true,
                    message: "Video marked as completed"
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                message: "Course progress not found"
            });
        }

    } catch (error) {
        console.error("Error occurred while updating the course progress:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating course progress"
        });
    }
};
