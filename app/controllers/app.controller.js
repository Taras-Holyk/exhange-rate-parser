const request = require('request-promise');
const dateHelper = require('@helpers/date.helper');
const parserLogRepository = require('@repositories/parser-log.repository');

async function index(req, res) {
  const requestedDate = dateHelper.formatDate(new Date(req.query.date));
  const recentlyRequestedData = await parserLogRepository.getRecentByUserAndDate(req.user.id, requestedDate);
  if (recentlyRequestedData) {
    return res.status(200)
      .json({
        success: true,
        data: recentlyRequestedData.exchange_rates
      });
  }

  let url = process.env.MIN_FIN_PARSER_URL;
  if (req.query.date) {
    url += '?date=' + requestedDate;
  }

  try {
    const minFinExchangeRates = await request({
      uri: url,
      json: true
    });

    parserLogRepository.store({
      user_id: req.user.id,
      date: requestedDate,
      origin: 'minfin',
      exchange_rates: minFinExchangeRates
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
