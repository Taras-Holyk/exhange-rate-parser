const express = require('express');
const controller = require('@controllers/user.controller');
const validator = require('@validators/user.validator');
const router = express.Router();

router.route('/register').post(validator.register, controller.register);
router.route('/login').post(validator.login, controller.login);

module.exports = router;
