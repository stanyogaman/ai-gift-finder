import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

export const authenticate = (options?: string[] | { requireAdmin?: boolean; roles?: string[] }) => {
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

      // Handle legacy array format or new options format
      let roles: string[] | undefined;
      let requireAdmin = false;

      if (Array.isArray(options)) {
        roles = options;
      } else if (options && typeof options === 'object') {
        roles = options.roles;
        requireAdmin = options.requireAdmin || false;
      }

      // Check admin requirement
      if (requireAdmin && req.user?.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Admin access required' });
      }

      // Check role requirements
      if (roles && req.user && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};
