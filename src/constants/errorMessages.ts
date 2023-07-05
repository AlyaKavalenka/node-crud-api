import { IncomingMessage, ServerResponse } from 'http';

export function errorPathInMethod(
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
  path: string,
  method: string,
) {
  res.statusCode = 404;
  res.end(
    `Error: not found path "${path}" in method "${method.toUpperCase()}"`,
  );
}

export function errorInvalidId(res: ServerResponse, path: string, id: string) {
  res.statusCode = 400;
  res.end(`Error: invalid id "${id}" in path "${path}"`);
}
