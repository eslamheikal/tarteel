import type { Request, Response } from 'express';

const ALLOWED_ORIGINS = [
  'http://localhost:4200',
];

export function applyCors(req: Request, res: Response) {
  const origin = req.headers.origin as string | undefined;
  const isAllowed = origin && ALLOWED_ORIGINS.includes(origin);

  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Vary', 'Origin');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');

  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

export function handlePreflight(req: Request, res: Response) {
  if (req.method === 'OPTIONS') {
    applyCors(req, res);
    res.status(204).end();
    return true;
  }
  return false;
}
