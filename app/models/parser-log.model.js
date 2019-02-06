const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ParserLog = new Schema({
  user_id: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    enum: ['minfin'],
    required: true
  },
  exchange_rates: Schema.Types.Mixed
}, {
  collection: 'parser_log',
  timestamps: true
});

module.exports = mongoose.model('ParserLog', ParserLog);
