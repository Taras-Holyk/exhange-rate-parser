const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'test') {
  mongoose.connect(`mongodb://${process.env.TEST_DB_HOST}/${process.env.TEST_DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true
  });
} else {
  mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true
  });
}

module.exports = mongoose;
