const express = require('express');
const { createCourse, getAllCourses, getCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const {authMiddleware ,adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();
const {Lesson} = require('../sequelize/models')

router.post('/',authMiddleware, adminMiddleware, createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourse);
router.put('/:id',authMiddleware, adminMiddleware, updateCourse);
router.delete('/:id',authMiddleware, adminMiddleware, deleteCourse);

router.get('/:id/lessons', async (req, res) => {
    try {
        const { id } = req.params;
        const lessons = await Lesson.findAll({ where: { courseId: id } })
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Could not fetch the lessons from this course', error: error.message });
    }
})


module.exports = router;