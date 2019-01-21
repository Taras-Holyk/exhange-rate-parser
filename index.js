const config = require('dotenv').config();
if (config.error) {
    throw config.error;
}

const port = process.env.APP_PORT || 3000;
const app = require('./server');

require('./config/database');

app.listen(port, function () {
    console.log(`App running on the port ${port}`);
});