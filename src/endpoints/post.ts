import users from '../data/users';
import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

export default function postEndpoint(
  path: string,
  req: IncomingMessage,
  res: ServerResponse,
) {
  if (path === '/api/users') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const user: User = JSON.parse(body);

        if (user.username && +user.age && user.hobbies) {
          user.id = uuidv4();
          users.push(user);
          res.statusCode = 201;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(user));
        } else {
          res.statusCode = 400;
          res.end('Error: request body does not contain required fields');
        }
      } catch (err) {
        res.statusCode = 400;
        res.end('Error: could not parse JSON body');
      }
    });
  } else {
    res.statusCode = 404;
    res.end(`Error: not found path "${path}"`);
  }
}
