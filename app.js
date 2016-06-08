var http = require('http');
var port = process.env.PORT || 3000;

function handle_request(request, response) { 
	response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World. Are you restless to go big restful?\n');
  console.log('hello-node.js was requested'); 
}
http.createServer(handle_request).listen(port, '127.0.0.1');
console.log('Started Node.js http server at http://127.0.0.1:' + port);
