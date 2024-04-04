const http = require('http');
const app = require('./app');
let server = http.createServer(app);

server.listen(5000, () => {
  console.log('server running successfully on port 5k');
});
