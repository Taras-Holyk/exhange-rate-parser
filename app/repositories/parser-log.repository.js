const Model = require('@models/parser-log.model');

function getRecentByUserAndDate(userId, date) {
  const startDate = new Date();
  let endDate = new Date(startDate);
  startDate.setMinutes(startDate.getMinutes() - 15);

  return Model.findOne({
    user_id: userId,
    date: date,
    origin: 'minfin',
    createdAt: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ createdAt: -1 });
}

function getLastByUser(userId) {
  return Model.findOne({
    user_id: userId,
    origin: 'minfin'
  }).sort({ createdAt: -1 });
}

function store(params) {
  return new Model(params).save();
}

module.exports = {
  getRecentByUserAndDate,
  store,
  getLastByUser
};
