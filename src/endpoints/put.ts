import { IncomingMessage, ServerResponse } from 'http';
import { errorInvalidId, errorPathInMethod } from '../constants/errorMessages';
import users from '../data/users';
import { User } from '../types/types';

export default function putEndpoint(
  path: string,
  req: IncomingMessage,
  res: ServerResponse,
) {
  const pathArr = path.split('/');
  const id = pathArr[3];

  if (pathArr.length < 5 && path.startsWith('/api/users/') && id) {
    const userIdInArray = users.findIndex((item) => item.id === id);
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    if (typeof +id === 'number') {
      if (userIdInArray !== -1) {
        req.on('end', () => {
          try {
            const userReq: User = JSON.parse(body);
            if (userReq.username && +userReq.age && userReq.hobbies) {
              users.splice(userIdInArray, 1);
              const updatedUser: User = {
                id,
                username: userReq.username,
                age: userReq.age,
                hobbies: userReq.hobbies,
              };
              users.push(updatedUser);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(userReq));
            } else {
              res.statusCode = 400;
              res.end('Error: request body does not contain required fields');
            }
          } catch {
            res.statusCode = 400;
            res.end('Error: could not parse JSON body');
          }
        });
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Error: User not found');
      }
    } else {
      errorInvalidId(res, path, id);
    }
  } else {
    errorPathInMethod(res, path, 'get');
  }
}
