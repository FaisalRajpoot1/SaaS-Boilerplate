/**
 * Express type augmentation.
 *
 * `requireAuth` attaches the authenticated principal to the request so
 * downstream handlers can read `req.user` in a type-safe way.
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}

export {};
