import { Router } from 'express';
import * as departmentController from './department-controller';
import { validateRequest } from '../../utils';
import { departmentIdParamSchema, addDepartmentSchema, updateDepartmentSchema } from './department-schema';

const router = Router();

router.get('', departmentController.handleGetAllDepartments);
router.post('', validateRequest(addDepartmentSchema), departmentController.handleAddNewDepartment);
router.get('/:id', validateRequest(departmentIdParamSchema), departmentController.handleGetDepartmentById);
router.put('/:id', validateRequest(updateDepartmentSchema), departmentController.handleUpdateDepartmentById);
router.delete('/:id', validateRequest(departmentIdParamSchema), departmentController.handleDeleteDepartmentById);

export { router as departmentRoutes };
