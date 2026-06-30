import { Router } from 'express';

import { getHealth } from './health.controller.js';

/**
 * Health module router. Mounted at `/health` by the route registry.
 */
export const healthRouter: Router = Router();

healthRouter.get('/', getHealth);
