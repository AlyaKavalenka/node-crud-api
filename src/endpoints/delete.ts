import users from '../data/users';
import { ServerResponse } from 'http';
import { errorInvalidId, errorPathInMethod } from '../constants/errorMessages';

export default function deleteEndpoint(path: string, res: ServerResponse) {
  const pathArr = path.split('/');
  const id = pathArr[3];

  if (pathArr.length < 5 && path.startsWith('/api/users/') && id) {
    const userIdInArray = users.findIndex((item) => item.id === id);
    if (typeof +id === 'number') {
      if (userIdInArray !== -1) {
        users.splice(userIdInArray, 1);
        res.statusCode = 204;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Successfully deleted!');
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
