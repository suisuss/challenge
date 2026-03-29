import { Router } from 'express';
import * as staffsController from './staffs-controller';
import { validateRequest } from '../../utils';
import {
  getStaffsSchema,
  staffIdParamSchema,
  addStaffSchema,
  updateStaffSchema,
  staffStatusSchema
} from './staffs-schema';

const router = Router();

router.get('', validateRequest(getStaffsSchema), staffsController.handleGetAllStaffs);
router.post('', validateRequest(addStaffSchema), staffsController.handleAddStaff);
router.get('/:id', validateRequest(staffIdParamSchema), staffsController.handleGetStaff);
router.put('/:id', validateRequest(updateStaffSchema), staffsController.handleUpdateStaff);
router.post('/:id/status', validateRequest(staffStatusSchema), staffsController.handleReviewStaffStatus);

export { router as staffsRoutes };
