import { Router } from 'express';
import * as studentController from './students-controller';

const router = Router();

router.get('', studentController.handleGetAllStudents);
router.post('', studentController.handleAddStudent);
router.get('/:id', studentController.handleGetStudentDetail);
router.post('/:id/status', studentController.handleStudentStatus);
router.put('/:id', studentController.handleUpdateStudent);

export { router as studentsRoutes };
