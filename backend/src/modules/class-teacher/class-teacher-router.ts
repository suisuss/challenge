import { Router } from 'express';
import * as classTeacherController from './class-teacher-controller';
import { checkApiAccess } from '../../middlewares';
import { validateRequest } from '../../utils';
import {
  classTeacherIdParamSchema,
  addClassTeacherSchema,
  updateClassTeacherSchema
} from './class-teacher-schema';

const router = Router();

router.get('', checkApiAccess, classTeacherController.handleGetClassTeachers);
router.post(
  '',
  checkApiAccess,
  validateRequest(addClassTeacherSchema),
  classTeacherController.handleAddClassTeacher
);
router.get(
  '/:id',
  checkApiAccess,
  validateRequest(classTeacherIdParamSchema),
  classTeacherController.handleGetClassTeacherDetail
);
router.put(
  '/:id',
  checkApiAccess,
  validateRequest(updateClassTeacherSchema),
  classTeacherController.handleUpdateClassTeacherDetail
);

export { router as classTeacherRoutes };
