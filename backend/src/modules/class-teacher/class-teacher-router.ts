import { Router } from 'express';
import * as classTeacherController from './class-teacher-controller';
import { checkApiAccess } from '../../middlewares';

const router = Router();

router.get('', checkApiAccess, classTeacherController.handleGetClassTeachers);
router.post('', checkApiAccess, classTeacherController.handleAddClassTeacher);
router.get('/:id', checkApiAccess, classTeacherController.handleGetClassTeacherDetail);
router.put('/:id', checkApiAccess, classTeacherController.handleUpdateClassTeacherDetail);

export { router as classTeacherRoutes };
