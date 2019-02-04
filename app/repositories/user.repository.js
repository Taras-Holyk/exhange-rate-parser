const model = require('@models/user.model');

function getByEmail(email) {
  return model.where({ email }).findOne();
}

module.exports = {
  getByEmail: getByEmail
};
