const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course=require('../models/Course')
require("dotenv").config();
const {uploadImageToCloudinary}=require('../utils/imageUploader')

exports.createSubsection = async (req, res) => {
    try {
        // Fetch the data
        const { title, description, sectionID,duration,courseID } = req.body;
        const video = req.files.video;

        // Validation
        if (!title || !description || !sectionID || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields must be filled"
            });
        }

        // Upload video and get its URL
        const videoURL = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // Create the subsection
        const subsectionDetails = await SubSection.create({
            title,
            description,
            duration,
            videoURL: videoURL.secure_url
        });

        // Update the section with the new subsection
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionID },
            {
                $push: {
                    subSections: subsectionDetails._id
                }
            },
            { new: true }
        );

        const updatedCourse=await Course.findById(courseID).populate({
            path: 'courseContent',
            populate: {
                path: 'subSections'
            }
        })
        .exec();

        return res.status(200).json({
            success: true,
            message: "Subsection has been added successfully",
            data:updatedCourse
        });
    } catch (error) {
        console.error("Subsection creation failed ", error);
        return res.status(500).json({
            success: false,
            message: "Subsection creation error"
        });
    }
};

exports.updateSubSection = async (req, res) => {
    try {
        const { title, description, duration, subsectionID,courseID } = req.body;

        // Validation
        if (!subsectionID) {
            return res.status(400).json({
                success: false,
                message: "Subsection ID field must be filled"
            });
        }

        // Find the subsection by ID
        const subsectionDetails = await SubSection.findById(subsectionID);
        if (!subsectionDetails) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found"
            });
        }

        // Update subsection fields if provided
        if (title) {
            subsectionDetails.title = title;
        }
        if (description) {
            subsectionDetails.description = description;
        }
        if (duration) {
            subsectionDetails.duration = duration;
        }
        if (req.files && req.files.video) {
            // Upload video and get its URL
            const video=req.files.video;
            const videoURL = await imageUploader(video, process.env.FOLDER_NAME);
            subsectionDetails.videoURL = videoURL.secure_url;
        }

        // Save the updated subsection
        await subsectionDetails.save();

        const updatedCourse=await Course.findById(courseID).populate({
            path: 'courseContent',
            populate: {
                path: 'subSections'
            }
        })
        .exec();

        return res.status(200).json({
            success: true,
            message: "Subsection updated successfully",
            data:updatedCourse
        });
    } catch (error) {
        console.error("Subsection updation failed ", error);
        return res.status(500).json({
            success: false,
            message: "Subsection updation error"
        });
    }
};

exports.deleteSubsection = async (req, res) => {
    try {
        // Fetch the section ID and subsection ID from the request parameters
        console.log("backend bhi pahuch gya");
        const { sectionID, subsectionID,courseID } = req.body;

        // Validation
        if (!sectionID || !subsectionID) {
            return res.status(400).json({
                success: false,
                message: "Both section ID and subsection ID are required."
            });
        }

        // Remove the subsection from the Subsection model
        await SubSection.findByIdAndDelete(subsectionID);

        // Remove the subsection reference from the section model
        const updatedSection = await Section.findByIdAndUpdate(
            sectionID,
            {
                $pull: { subsections: subsectionID } // Updated to 'subsections'
            },
            { new: true }
        );

        const updatedCourse=await Course.findById(courseID).populate({
            path: 'courseContent',
            populate: {
                path: 'subSections'
            }
        })
        .exec();

        return res.status(200).json({
            success: true,
            message: "Subsection deleted successfully",
            data:updatedCourse
        });
    } catch (error) {
        console.error("An error occurred while deleting the subsection", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete the subsection"
        });
    }
};
