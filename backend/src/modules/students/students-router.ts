import { Router } from 'express';
import * as studentController from './students-controller';
import { validateRequest } from '../../utils';
import {
  getStudentsSchema,
  studentIdParamSchema,
  addStudentSchema,
  updateStudentSchema,
  studentStatusSchema,
} from './students-schema';

const router = Router();

router.get('', validateRequest(getStudentsSchema), studentController.handleGetAllStudents);
router.post('', validateRequest(addStudentSchema), studentController.handleAddStudent);
router.get('/:id', validateRequest(studentIdParamSchema), studentController.handleGetStudentDetail);
router.post(
  '/:id/status',
  validateRequest(studentStatusSchema),
  studentController.handleStudentStatus,
);
router.put('/:id', validateRequest(updateStudentSchema), studentController.handleUpdateStudent);
router.delete(
  '/:id',
  validateRequest(studentIdParamSchema),
  studentController.handleDeleteStudent,
);

export { router as studentsRoutes };
