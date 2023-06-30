import users from '../data/users';
import { ServerResponse, IncomingMessage } from 'http';

export default function getEndpoint(
  path: string,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
) {
  if (path === '/api/users') {
    console.log('in users');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(users));
  } else {
    res.statusCode = 404;
    res.end(`Error: not found path "${path}" in method "GET"`);
  }
}
