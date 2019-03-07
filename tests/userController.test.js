const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const faker = require('faker');
const testHelper = require('./test.helper');
const server = require('./../app');

chai.use(chaiHttp);

let user;

describe('user controller', function () {
  beforeEach(async () => {
    ({ user } = await testHelper.getAuthUser());
  });

  it('should login user', function (done) {
    chai.request(server)
      .post('/users/login')
      .send({
        email: user.email,
        password: user.password
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').equal(true);
        res.body.should.have.property('token').be.a('string');

        done();
      });
  });

  it('should register user', function (done) {
    const password = faker.internet.password();

    chai.request(server)
      .post('/users')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: password,
        password_confirmation: password
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').equal(true);
        res.body.should.have.property('data').an('object');
        res.body.data.should.have.property('email').be.a('string');

        done();
      });
  });
});
