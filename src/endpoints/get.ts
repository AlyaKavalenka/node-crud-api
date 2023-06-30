import { errorPathInMethod } from '../constants/errorMessages';
import users from '../data/users';
import { ServerResponse, IncomingMessage } from 'http';

export default function getEndpoint(
  path: string,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
) {
  const pathArr = path.split('/');

  if (pathArr.length < 5) {
    if (path === '/api/users') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(users));
    } else if (path.startsWith('/api/users/')) {
      const id = pathArr[3];
      const userById = users.find((item) => item.id === id);

      if (userById) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(userById));
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Error: User not found');
      }
    }
  } else {
    errorPathInMethod(res, path, 'get');
  }
}
