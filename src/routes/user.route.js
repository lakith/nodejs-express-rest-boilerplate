const express = require('express');
const router = express.Router();
const userControler = require('../controllers/user.controller')

/* GET users listing. */
router.post('/signup', userControler.signUp);

module.exports = router;
