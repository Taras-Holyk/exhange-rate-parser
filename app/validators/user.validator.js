const helper = require('@helpers/validation.helper');

function register(req, res, next) {
  req.checkBody('name').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage('Name cannot be empty');

  req.checkBody('email')
    .isEmail()
    .withMessage('Provide correct email')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Email cannot be empty');

  req.checkBody('password').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage('Password cannot be empty');

  return helper.processErrors(req, res, next);
}

function login(req, res, next) {
  req.checkBody('email')
    .isEmail()
    .withMessage('Provide correct email')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Email cannot be empty');

  req.checkBody('password').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage('Password cannot be empty');

  return helper.processErrors(req, res, next);
}

module.exports = {
  register,
  login
};
