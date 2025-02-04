const express = require('express');
const { createCourse, getAllCourses, getCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const {authMiddleware ,adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',authMiddleware, adminMiddleware, createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourse);
router.put('/:id',authMiddleware, adminMiddleware, updateCourse);
router.delete('/:id',authMiddleware, adminMiddleware, deleteCourse);


module.exports = router;