const express = require('express');
const router = express.Router();

// Contact controllers import
const {
    contactAdmin
} = require('../controllers/Contact');

// Define the route for handling contact requests
router.post("/sendMail", contactAdmin);

module.exports = router;
