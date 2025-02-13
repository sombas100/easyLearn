const express = require('express');
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, adminMiddleware, getAllUsers);
router.get('/:id', authMiddleware, adminMiddleware, getUser);
router.put('/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/:id',authMiddleware, adminMiddleware, deleteUser);

module.exports = router;