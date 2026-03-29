import { Router } from 'express';
import * as accountController from './account-controller';
import { validateRequest } from '../../utils';
import { changePasswordSchema } from './account-schema';

const router = Router();

router.post('/change-password', validateRequest(changePasswordSchema), accountController.handlePasswordChange);
router.get('/me', accountController.handleGetAccountDetail);

export { router as accountRoutes };
