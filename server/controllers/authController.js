require('dotenv').config();
const { User } = require('../sequelize/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const saltRounds = 10

    try {
        const existingUser = await User.findOne({ where: { email }})
        if (existingUser) {
            return res.status(400).json({ message: 'This user already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create ({
            name: name,
            email: email,
            password: hashedPassword,
            role: role || 'Learner',
        })
        
        res.status(201).json({ message: 'User registered successfully', user: newUser })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', error: error.message })
    }
}


const login = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email }});
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed'});
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECTRET, { expiresIn: '1h' })
        res.json({ message: 'User successfully logged in', token})
    } catch (error) {
        res.status(500).json({ Error: 'Internal server error', error: error.message });
    }
}



module.exports = {
    register,
    login
}
