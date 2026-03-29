import { Router } from 'express';
import * as leaveController from './leave-controller';
import { checkApiAccess } from '../../middlewares';
import { validateRequest } from '../../utils';
import {
  addLeaveRequestSchema,
  updateLeaveRequestSchema,
  leaveIdParamSchema,
  addLeavePolicySchema,
  updateLeavePolicySchema,
  reviewLeaveStatusSchema,
  policyUsersSchema,
  removePolicyUserSchema
} from './leave-schema';

const router = Router();

router.post('/policies', checkApiAccess, validateRequest(addLeavePolicySchema), leaveController.handleMakeNewPolicy);
router.get('/policies', checkApiAccess, leaveController.handleGetLeavePolicies);
router.get('/policies/me', checkApiAccess, leaveController.handleGetMyLeavePolicy);
router.put('/policies/:id', checkApiAccess, validateRequest(updateLeavePolicySchema), leaveController.handleUpdateLeavePlicy);
router.post('/policies/:id/status', checkApiAccess, validateRequest(reviewLeaveStatusSchema), leaveController.handleReviewLeavePolicy);
router.post('/policies/:id/users', checkApiAccess, validateRequest(policyUsersSchema), leaveController.handleUpdatePolicyUsers);
router.get('/policies/:id/users', checkApiAccess, validateRequest(leaveIdParamSchema), leaveController.handleGetPolicyUsers);
router.delete('/policies/:id/users', checkApiAccess, validateRequest(removePolicyUserSchema), leaveController.handleRemovePolicyUser);
router.get(
  '/policies/eligible-users',
  checkApiAccess,
  leaveController.handleFetchPolicyEligibleUsers
);

router.get('/request', checkApiAccess, leaveController.handleGetUserLeaveHistory);
router.post('/request', checkApiAccess, validateRequest(addLeaveRequestSchema), leaveController.handleCreateNewLeaveRequest);
router.put('/request/:id', checkApiAccess, validateRequest(updateLeaveRequestSchema), leaveController.handleUpdateLeaveRequest);
router.delete('/request/:id', checkApiAccess, validateRequest(leaveIdParamSchema), leaveController.handleDeleteLeaveRequest);

router.get('/pending', checkApiAccess, leaveController.handleFetchPendingLeaveRequests);
router.post('/pending/:id/status', checkApiAccess, validateRequest(reviewLeaveStatusSchema), leaveController.handleReviewLeaveRequest);

export { router as leaveRoutes };
