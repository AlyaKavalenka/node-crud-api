import http from 'http';
import url from 'url';
import getEndpoint from './endpoints/get';

const hostname = 'localhost';
const port = 4000;

const server = http.createServer((req, res) => {
  if (req.url) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    if (path) {
      switch (method?.toLowerCase()) {
        case 'get':
          getEndpoint(path, res);
          break;

        default:
          res.statusCode = 404;
          res.end(`Error: not found method "${method}"`);
      }
    } else {
      res.statusCode = 404;
      res.end(`Error: not found path "${path}"`);
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export default server;
