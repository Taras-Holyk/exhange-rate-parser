const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('@models/user.model');
const userRepository = require('@repositories/user.repository');
const userTransformer = require('@transformers/user.transformer');

async function register(req, res) {
  try {
    const user = await (new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })).save();

    return res.status(200)
      .json({
        success: true,
        message: 'Registered successfully',
        data: userTransformer.transform(user)
      });
  } catch (error) {
    return res.status(400)
      .json({
        success: false,
        message: 'Unable to save to the database'
      });
  }
}

async function login(req, res) {
  const user = await userRepository.getByEmail(req.body.email);

  if (!user) {
    return res.status(400)
      .json({
        success: false,
        message: 'User not found'
      });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(403)
      .json({
        success: false,
        message: 'Wrong credentials'
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
      message: 'Authentication successful',
      token: token,
      type: 'Bearer'
    });
}

module.exports = {
  register: register,
  login: login
};
