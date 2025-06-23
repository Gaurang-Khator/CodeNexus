const express = require('express');
const router=express.Router();

//Now importing the controlllers


//Profile controllers import

const {
    updateProfile,
    getAllUserDetails,
    deleteAccount,
    getEnrolledCourses,
    updateDisplayPicture,
    getProfileImg,
    getInstructorDashboardDetails
}=require('../controllers/Profile');


//Middlewares import
const {
    auth,
    isStudent,
    isInstructor
}=require('../middlewares/auth');




/**************************************************************************************************************************************** */

/* Profile Routes */

/************************************************************************************************************ */

router.post("/updateProfile",auth,updateProfile);
router.delete("/deleteAccount",auth,deleteAccount);
router.post("/updateDisplayPicture",auth,updateDisplayPicture);
router.post("/getEnrolledCourses",auth,isStudent,getEnrolledCourses);
router.get("/getUserDetails",auth,getAllUserDetails);
router.get("/getProfileImg",auth,getProfileImg);
router.post("/getInstructorDashboardDetails",auth,isInstructor,getInstructorDashboardDetails);


module.exports=router;

