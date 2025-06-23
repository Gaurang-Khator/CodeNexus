const express = require('express');
const router = express.Router();

// Contact controllers import
const {
    updateCourseProgress
} = require('../controllers/CourseProgress');

const {auth,isStudent}=require('../middlewares/auth')

// Define the route for handling contact requests
router.post("/updateCourseProgress",auth,isStudent, updateCourseProgress);

module.exports = router;
