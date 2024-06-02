const express = require('express');
const { createChatCompletion } = require('../controllers/chat.controller');

const router = express.Router();

router.post('/', createChatCompletion);

module.exports = router;
