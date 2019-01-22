const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true
});

module.exports = mongoose;
