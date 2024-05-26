const express = require('express');

const router = express.Router();
const { calculateTip, getTip } = require('../controller/tipController');
const { verifyToken } = require('../middleware/userAuth');
const { validateCalculateTip, validateGetTip } = require('../middleware/tipValidator');

router.post('/calculate', validateCalculateTip, verifyToken, calculateTip);
router.get('/', validateGetTip, verifyToken, getTip);

module.exports = router;