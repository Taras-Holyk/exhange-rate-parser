const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('@models/user.model');
const userRepository = require('@repositories/user.repository');

async function register(req, res) {
  try {
    const user = await (new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })).save();

    res.status(200)
      .json({
        status: true,
        message: 'Registered successfully',
        data: user
      });
  } catch (error) {
    res.status(400)
      .send('unable to save to database');
  }
}

async function login(req, res) {
  const user = await userRepository.getByEmail(req.body.email);

  if (!user) {
    res.status(400)
      .json({
        success: false,
        message: 'User not found'
      });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    res.status(403)
      .json({
        success: false,
        message: 'Bad credentials'
      });
  }

  const token = jwt.sign(
    {
      email: user.email,
      name: user.name,
      id: user._id
    },
    process.env.APP_KEY,
    {
      expiresIn: '24h'
    }
  );

  return res.status(200)
    .json({
      success: true,
      message: 'Authentication successful!',
      token: token,
      type: 'Bearer'
    });
}

module.exports = {
  register: register,
  login: login
};
