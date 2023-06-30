import http from 'http';
import url from 'url';
import getEndpoint from './endpoints/get';
import postEndpoint from './endpoints/post';
import putEndpoint from './endpoints/put';
import deleteEndpoint from './endpoints/delete';
import dotenv from 'dotenv';

dotenv.config();

const hostname = 'localhost';
const port = +(process.env.PORT || 4000);

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

        case 'post':
          postEndpoint(path, req, res);
          break;

        case 'put':
          putEndpoint(path, req, res);
          break;

        case 'delete':
          deleteEndpoint(path, res);
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
