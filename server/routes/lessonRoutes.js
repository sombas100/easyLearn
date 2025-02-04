const express = require('express');
const { getAllLessons, getLesson, createLesson, updateLesson, deleteLesson } = require('../controllers/lessonController');
const {authMiddleware, adminMiddleware} = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllLessons);
router.get('/:id', getLesson);
router.post('/',authMiddleware, adminMiddleware, createLesson);
router.put('/:id', authMiddleware, adminMiddleware, updateLesson);
router.delete('/:id', authMiddleware, adminMiddleware, deleteLesson);


module.exports = router;
