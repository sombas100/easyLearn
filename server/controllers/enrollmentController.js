const { Enrollment, Course, User } = require('../sequelize/models');

const enrollInCourse = async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user.userId;

    try {
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const existingEnrollment = await Enrollment.findOne({ where: { userId, courseId } });
        if (existingEnrollment) {
            return res.status(400).json({ message: 'User has already enrolled in this course' });
        }

        const enrollment = await Enrollment.create({ userId, courseId });
        res.status(201).json({ message: 'User enrolled successfully', enrollment });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAllEnrollments = async (req, res) => {
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    try {
        const enrollments = await Enrollment.findAll({ include: [User, Course] });
        if (enrollments.length === 0) {
            return res.status(404).json({ message: 'No enrollments found' });
        }
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving enrollments', error: error.message });
    }
};

const getUserEnrollments = async (req, res) => {
    const userId = req.user.userId;

    try {
        const enrollments = await Enrollment.findAll({ where: { userId }, include: [Course] });
        if (enrollments.length === 0) {
            return res.status(404).json({ message: 'No enrollments found for this user' });
        }
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user enrollment details', error: error.message });
    }
};

const updateProgress = async (req, res) => {
    const { courseId, progress } = req.body;
    const userId = req.user.userId;

    try {
        if (progress < 0 || progress > 100) {
            return res.status(400).json({ message: 'Progress must be between 0 and 100' });
        }

        const enrollment = await Enrollment.findOne({ where: { userId, courseId } });
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        await enrollment.update({ progress });
        res.json({ message: 'Progress updated successfully', enrollment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating progress', error: error.message });
    }
};

module.exports = {
    enrollInCourse,
    getAllEnrollments,
    getUserEnrollments,
    updateProgress,
};
