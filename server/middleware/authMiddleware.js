const jwt = require('jsonwebtoken');
const { User } = require('../sequelize/models'); 
require('dotenv').config();

exports.authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            
            const user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });

            if (!user) {
                return res.status(401).json({ message: 'User not found, authorization denied.' });
            }

            req.user = user; 
            req.user.isAdmin = user.role === 'Admin'; 

            next(); 
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token, authorization denied.' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token found' });
    }
};


exports.adminMiddleware = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: Admin access only' });
    }
    next();
};
