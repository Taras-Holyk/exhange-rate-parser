const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../app');
const User = require('./../app/models/user.model');

chai.use(chaiHttp);

async function getAuthUser() {
  User.deleteMany({});

  const userData = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  const user = await new User(userData).save();

  const response = await chai.request(server)
    .post('/users/login')
    .set('Content-Type', 'application/json')
    .send({
      email: user.email,
      password: userData.password
    });

  return {
    token: response.body.token,
    user: { ...userData, id: user._id }
  };
}

module.exports = { getAuthUser };
