const request = require('request-promise');
const dateHelper = require('@helpers/date.helper');

async function index(req, res) {
  let url = process.env.MIN_FIN_PARSER_URL;
  if (req.query.date) {
    url += '?date=' + dateHelper.formatDate(new Date(req.query.date));
  }

  try {
    const minFinExchangeRates = await request({
      uri: url,
      json: true
    });

    return res.status(200)
      .json({
        success: true,
        data: minFinExchangeRates
      });
  } catch (e) {
    return res.status(200)
      .json({
        success: false,
        message: 'Internal server error'
      });
  }
}

module.exports = {
  index
};
