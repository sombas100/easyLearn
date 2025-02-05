const express = require('express');
const path = require('path');
const { enrollInCourse, getAllEnrollments, getUserEnrollments, updateProgress } = require('../controllers/enrollmentController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/enroll', authMiddleware, enrollInCourse);
router.get('/my-enrollments', authMiddleware, getUserEnrollments);
router.get('/all-enrollments', authMiddleware, adminMiddleware, getAllEnrollments);
router.put('/progress', authMiddleware,  updateProgress);

router.get('/certificate/:userId/:courseId', authMiddleware, (req, res) => {
    const { userId, courseId } = req.params;
    const certificatePath = path.join(__dirname, `../certificates/${userId}-${courseId}.pdf`);

    res.download(certificatePath, `Certificate-${courseId}.pdf`, (err) => {
        if (err) {
            res.status(500).json({ message: 'Error downloading certificate', error: err.message });
        }
    });
});

module.exports = router