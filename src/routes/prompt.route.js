const express = require('express');
const { createPromptSet } = require('../controllers/prompt.controller');
const router = express.Router();

router.post('/basic', createPromptSet);

module.exports = router;
