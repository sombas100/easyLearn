const express = require('express');
const { enrollInCourse, getAllEnrollments, getUserEnrollments, updateProgress } = require('../controllers/enrollmentController');
const {authMiddleware ,adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/enroll', authMiddleware, enrollInCourse);
router.get('/my-enrollments', authMiddleware, getUserEnrollments);
router.get('/all-enrollments', authMiddleware, adminMiddleware, getAllEnrollments);
router.put('/progress', authMiddleware,  updateProgress);

module.exports = router