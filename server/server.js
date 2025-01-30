require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { sequelize } = require('./sequelize/models');

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.get('/test', (req, res, next) => {
    res.send('I hate humans');
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
    app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`))

})();


