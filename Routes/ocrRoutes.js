const express = require('express');
const router = express.Router();
const ocrController = require('../Controllers/ocrController');

router.post('/extract-code', ocrController.extractCodeFromImage);

module.exports = router;
