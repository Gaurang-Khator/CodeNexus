const Category = require("../models/Category");
const Course = require("../models/Course");
const mongoose=require('mongoose');

//Category creation
exports.createCategory = async (req, res) => {
    try {
        //fetch
        const { name, description } = req.body;
        //validate
        if (!name || !description) {
            return res.status(500).json({
                success: false,
                message: "Name or desciption field is empty",
            });
        }
        //create
        const createdCategory = await Category.create({
            categoryName: name,
            categoryDescription: description,
        });

        return res.status(200).json({
            success: true,
            message: "Category was created successfully",
            createdCategory,
        });
    } catch (error) {
        console.log("Error occure durinr category creation ", error);
        return res.status(500).json({
            success: false,
            message: "Category was not created successfully",
        });
    }
};

exports.showAllCategories = async (req, res) => {
    try {
        console.log("he");
        const allCategories = await Category.find(
            {},
            { categoryName: true, categoryDescription: true }
        );
        return res.status(200).json({
            success: true,
            message: "All Category were fetched successfully",
            allCategories,
        });
    } catch (error) {
        console.log("Problem occured during fetching all Category", error);
        return res.status(500).json({
            success: false,
            message: "Category was not fetched successfully",
            error,
        });
    }
};
exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category Id is missing.",
            });
        }

        const selectedCategoryInfo = await Category.findById(categoryId);
        if (!selectedCategoryInfo) {
            return res.status(404).json({
                success: false,
                message: "Category not found in the database.",
            });
        }

        const selectedCategoryPopular = await Category.findById(categoryId)
            .populate({
                path: "course",
                options: { sort: { enrolledstudent: -1 } },
                populate:({
                    path:"instructor"
                })
            })
            
            .exec();

        const selectedCategoryNewest = await Category.findById(categoryId)
            .populate({
                path: "course",
                options: { sort: { createdAt: -1 } },
                populate:({
                    path:"instructor"
                })

            })
            .exec();

        // Fetch all categories except the selected one
        const allCategoriesExceptSelected = await Category.find({ _id: { $ne: categoryId } }).exec();

        // Randomly select one category from the array
        const randomCategoryIndex = Math.floor(Math.random() * allCategoriesExceptSelected.length);
        const randomCategory = allCategoriesExceptSelected[randomCategoryIndex];

        const randomCategoryPopular = await Category.findById(randomCategory._id)
            .populate({
                path: "course",
                options: { sort: { enrolledstudent: -1 } },
                populate:({
                    path:"instructor"
                })
            })
            .exec();

            let courseWithMostStudents = await Course.aggregate([
                {
                    $match: {
                        studentsEnrolled: { $exists: true, $ne: [], $type: "array" }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        courseTitle: 1,
                        price: 1,
                        courseDescription: 1,
                        thumbnail: 1,
                        enrolledStudentCount: { $size: "$studentsEnrolled" },
                        instructor:true
                    }
                },
                {
                    $sort: { enrolledStudentCount: -1 }
                },
                {
                    $limit: 10
                }
            ]);
    
            // Populate instructor field for the aggregated courses
            courseWithMostStudents = await Course.populate(courseWithMostStudents, {
                path: "instructor",
                select: "firstName lastName" // Adjust the fields you want to select from the instructor model
            });

        return res.status(200).json({
            success: true,
            data: {
                selectedCategoryInfo,
                selectedCategoryNewest,
                selectedCategoryPopular,
                randomCategoryPopular,
                courseWithMostStudents,
            },
        });
    } catch (error) {
        console.error("Error fetching category page details:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching category page details.",
            error: error.message,
        });
    }
};
