const fs = require('fs');
const http = require('http');
const https = require('https');
const app = require('./app');
const connectDB = require('./config/db');

//for SSL connection - only DEV not trusted cert
const key = fs.readFileSync(__dirname + '/./selfsigned.key');
const cert = fs.readFileSync(__dirname + '/./selfsigned.crt');

const credentials = { key: key, cert: cert };
const secureServer = https.createServer(credentials, app);

const server = http.createServer(app);
const port = process.env.PORT || 3000;

//connect to mongo
connectDB();

secureServer.listen('8443', console.log(`Server running on port 8443`));
server.listen(port, console.log(`Server running on port ${port}`));
