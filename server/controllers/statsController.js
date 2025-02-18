const { User, Course, Enrollment } = require('../sequelize/models')

const getStats = async (req, res) => {
    try {
        const userStats = await User.count();
        const courseStats = await Course.count();
        const enrollmentStats = await Enrollment.count();

        if (!userStats || !courseStats || !enrollmentStats) {
            return res.status(404).json({ message: 'Statistics could not be found'})
        }

        res.json({ 
            users: userStats,
            courses: courseStats,
            enrollments: enrollmentStats
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message })
    }
}

module.exports = {
    getStats
}