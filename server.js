const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');

const server = http.createServer(app);
const port = process.env.PORT || 5000;

//connect to mongo
connectDB();

server.listen(port, console.log(`Server running on port ${process.env.PORT}`));
