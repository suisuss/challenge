import { Router } from 'express';
import * as classesController from './classes-controller';
import { checkApiAccess } from '../../middlewares';
import { validateRequest } from '../../utils';
import { classIdParamSchema, addClassSchema, updateClassSchema } from './classes-schema';

const router = Router();

router.get('', checkApiAccess, classesController.handleFetchAllClasses);
router.get(
  '/:id',
  checkApiAccess,
  validateRequest(classIdParamSchema),
  classesController.handleFetchClassDetail
);
router.post('', checkApiAccess, validateRequest(addClassSchema), classesController.handleAddClass);
router.put(
  '/:id',
  checkApiAccess,
  validateRequest(updateClassSchema),
  classesController.handleUpdateClass
);
router.delete(
  '/:id',
  checkApiAccess,
  validateRequest(classIdParamSchema),
  classesController.handleDeleteClass
);

export { router as classesRoutes };
