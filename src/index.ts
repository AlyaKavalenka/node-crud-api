import http from 'http';
import { Users } from '../types/types';

const hostname = 'localhost';
const port = 4000;
const users: Users = [];

const server = http.createServer((_, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export default server;
