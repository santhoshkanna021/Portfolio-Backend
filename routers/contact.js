const express = require('express');
const router = express.Router();
const { Contact } = require('../controllers/contact');

router.post('/', Contact);

module.exports = router;
