const log = require('debug')('api:logging');
const app = require('./app');

const port = process.env.PORT || 4000;
app.listen(port, () => log(`API listening on port ${port}!`));
