const { Lesson } = require('../sequelize/models');

const createLesson = async (req, res) => {
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    try {
        if (!req.body.courseId) {
            return res.status(400).json({ message: 'Course ID is required' });
        }

        const lesson = await Lesson.create(req.body);
        res.status(201).json({ message: 'Lesson successfully created', lesson });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.findAll();
        if (lessons.length === 0) {
            return res.status(404).json({ message: 'No lessons found' });
        }
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getLesson = async (req, res) => {
    const { id } = req.params;

    try {
        const lesson = await Lesson.findByPk(id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const updateLesson = async (req, res) => {
    const { id } = req.params;
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    try {
        const lesson = await Lesson.findByPk(id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        await lesson.update(req.body);
        res.json({ message: 'Lesson successfully updated', lesson });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const deleteLesson = async (req, res) => {
    const { id } = req.params;
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    try {
        const lesson = await Lesson.findByPk(id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        await lesson.destroy();
        res.json({ message: 'Lesson successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getAllLessons,
    getLesson,
    createLesson,
    updateLesson,
    deleteLesson,
};
