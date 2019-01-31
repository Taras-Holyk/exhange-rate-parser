const request = require('request-promise');

async function index(req, res) {
  const options = {
    uri: process.env.MIN_FIN_PARSER_URL,
    json: true
  };
  const minFinExchangeRates = await request(options);

  res.status(200)
    .json({
      success: true,
      data: minFinExchangeRates
    });
}

module.exports = {
  index
};
