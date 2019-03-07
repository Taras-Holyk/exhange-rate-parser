const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const faker = require('faker');
const server = require('./../app');
const ParserLog = require('./../app/models/parser-log.model');
const testHelper = require('./test.helper');

let token;
let user;

chai.use(chaiHttp);

describe('app controller', function () {
  ParserLog.collection.drop();

  beforeEach(async () => {
    ({ token, user } = await testHelper.getAuthUser());

    await new ParserLog({
      user_id: user.id,
      date: faker.date.recent(),
      origin: 'minfin',
      exchange_rates: []
    }).save();
  });

  it('should return exchange rates', function (done) {
    chai.request(server)
      .get('/exchange-rates')
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').equal(true);
        res.body.should.have.property('data').with.lengthOf(6);

        done();
      });
  });

  it('should generate pdf report', function (done) {
    chai.request(server)
      .get('/exchange-rates/export/pdf')
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').equal(true);
        res.body.should.have.property('data').an('object');
        res.body.data.should.have.property('filename').a('string');

        done();
      });
  });

  it('should generate csv report');
});
