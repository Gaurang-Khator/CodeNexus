const express = require('express');
const router=express.Router();

//Now importing the controlllers


//Course controllers import

const {
    createCourse,
    showAllCourses,
    getAllCourseDetails,
    editCourse,
    getAllMyCreatedCourses,
    deleteCourse,
    getAllEnrolledCourses,
    getCoursePlusProgressDetails
}=require('../controllers/Course');

//Rating and Reviews controllers import


const {
    createRating,
    getAverageRating,
    getAllRatingCourse,
    getAllRating
}=require('../controllers/RatingAndReviews');


//Section controllers import

const {
    createSection,
    updateSection,
    deleteSection
}=require('../controllers/Section');

//Subsection controllers import

const {
    createSubsection,
    updateSubSection,
    deleteSubsection
}=require('../controllers/Subsection');

//Category controllers impot

const {
    createCategory,
    showAllCategories,
    categoryPageDetails
}=require('../controllers/Category');

//Middlewares import
const {
    auth,
    isAdmin,
    isInstructor,
    isStudent
}=require('../middlewares/auth');




/**************************************************************************************************************************************** */

/* Course Routes */

/************************************************************************************************************ */

router.post("/createCourse",auth,isInstructor,createCourse);
router.get("/showAllCourses",showAllCourses);
router.post("/getCourseDetails",getAllCourseDetails);
router.post("/editCourse",auth,isInstructor,editCourse);
router.get("/getCreatedCourses",auth,isInstructor,getAllMyCreatedCourses);
router.post("/deleteCourse",auth,isInstructor,deleteCourse)
router.post("/getEnrolledCourses",auth,isInstructor,getAllEnrolledCourses)
router.post("/getCoursePlusProgressDetails",auth,isStudent,getCoursePlusProgressDetails)

router.post("/createSection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);


router.post("/createSubsection",auth,isInstructor,createSubsection);
router.post("/updateSubsection",auth,isInstructor,updateSubSection);
router.post("/deleteSubsection",auth,isInstructor,deleteSubsection);


/**************************************************************************************************************************************** */

/* Rating And Reviews Routes */

/************************************************************************************************************ */



router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getAllRatingCourse",getAllRatingCourse);
router.get("/getAllRating",getAllRating);



//Category routes


router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategories);
router.post("/categoryPageDetails",categoryPageDetails);


module.exports=router;
