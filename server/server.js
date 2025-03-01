require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { sequelize } = require('./sequelize/models');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const statRoutes = require('./routes/statRoutes')

const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api', statRoutes);

app.get('/test', (req, res, next) => {
    res.send('Lilli has a massive head');
    next();
})

const connectDb = async () => {
    console.log('Checking database connection...');

    try {
        await sequelize.authenticate();
        console.log('Database connection successful');
    } catch (error) {
        console.log('Database connection failed', error);
        process.exit(1);
    }
}

(async () => {
    console.log('Attemping to connect to the database...')
    await connectDb();
    app.listen(PORT, '0.0.0.0', () => console.log(`Server is listening on PORT: ${PORT}`))

})();


