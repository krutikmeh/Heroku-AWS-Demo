const pg = require('pg');
var client  = new pg.Client({
    user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
});
client.connect();
module.exports.myConnection = client;