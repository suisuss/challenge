import { Router } from 'express';
import * as rpController from './rp-controller';
import { validateRequest } from '../../utils';
import {
    roleIdParamSchema,
    addRoleSchema,
    updateRoleSchema,
    roleStatusSchema,
    rolePermissionsSchema,
    switchRoleSchema,
} from './rp-schema';

const router = Router();

router.get('', rpController.handleGetRoles);
router.post('', validateRequest(addRoleSchema), rpController.handleAddRole);
router.post('/switch', validateRequest(switchRoleSchema), rpController.handleSwitchRole);
router.put('/:id', validateRequest(updateRoleSchema), rpController.handleUpdateRole);
router.post('/:id/status', validateRequest(roleStatusSchema), rpController.handleRoleStatus);
router.get('/:id', validateRequest(roleIdParamSchema), rpController.handleGetRole);
router.get('/:id/permissions', validateRequest(roleIdParamSchema), rpController.handleGetRolePermission);
router.post('/:id/permissions', validateRequest(rolePermissionsSchema), rpController.handleAddRolePermission);
router.get('/:id/users', validateRequest(roleIdParamSchema), rpController.handleGetUsersByRoleId);

export { router as rpRoutes };
