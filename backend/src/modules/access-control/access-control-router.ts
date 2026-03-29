import { Router } from 'express';
import * as accessControlController from './access-control-controller';
import { isUserAdmin } from '../../middlewares';
import { validateRequest } from '../../utils';
import { accessControlIdParamSchema, addAccessControlSchema, updateAccessControlSchema } from './access-control-schema';

const router = Router();

router.get('', isUserAdmin, accessControlController.handleGetAllAccessControls);
router.post('', isUserAdmin, validateRequest(addAccessControlSchema), accessControlController.handleAddAccessControl);
router.put('/:id', isUserAdmin, validateRequest(updateAccessControlSchema), accessControlController.handleUpdateAccessControl);
router.delete('/:id', isUserAdmin, validateRequest(accessControlIdParamSchema), accessControlController.handleDeleteAccessControl);
router.get('/me', accessControlController.handleGetMyAccessControl);

export { router as accessControlRoutes };
