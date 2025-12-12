import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

export const authenticate = (roles?: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const token = header.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? 'development-secret');
      if (typeof decoded === 'object' && decoded !== null && 'sub' in decoded) {
        req.user = {
          id: String(decoded.sub),
          role: typeof decoded === 'object' && 'role' in decoded ? String((decoded as any).role) : 'USER'
        };
      }

      if (roles && req.user && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};
