const { Course } = require('../sequelize/models');

const createCourse = async (req, res) => {
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    try {
        const course = await Course.create(req.body);
        res.status(201).json({ message: 'Course successfully created', course });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        if (courses.length === 0) {
            return res.status(404).json({ message: 'No courses found' });
        }
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const updateCourse = async (req, res) => {
    const { id } = req.params;
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        await course.update(req.body);
        res.json({ message: 'Course successfully updated', course });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const deleteCourse = async (req, res) => {
    const { id } = req.params;
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        await course.destroy();
        res.json({ message: 'Course successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const searchCourse = async (req, res) => {
    try {
        const { query } = req.query;
    
        if (!query || typeof query !== "string") {
          return res.status(400).json({ message: "Query parameter must be a string" });
        }
    
        const courses = await Course.findAll({
          where: {
            title: {
              [Op.iLike]: `%${query}%`
            },
          },
        });
    
        res.json(courses);
      } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
}

module.exports = {
    createCourse,
    getAllCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    searchCourse,
};
