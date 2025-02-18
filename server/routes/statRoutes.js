const express = require('express');
const { getStats } = require('../controllers/statsController')
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware')

const router = express.Router();

router.get('/admin/stats',authMiddleware, adminMiddleware, getStats)


module.exports = router;