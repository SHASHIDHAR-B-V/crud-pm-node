const http = require('http');
const app = require('./mf.js');
let server = http.createServer(app);

server.listen(8000, () => {
  console.log('server running successfully on port 8k');
});
