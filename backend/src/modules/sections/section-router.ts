import { Router } from 'express';
import * as sectionController from './section-controller';
import { validateRequest } from '../../utils';
import { sectionIdParamSchema, addSectionSchema, updateSectionSchema } from './section-schema';

const router = Router();

router.get('', sectionController.handleGetAllSections);
router.post('', validateRequest(addSectionSchema), sectionController.handleAddNewSection);
router.get('/:id', validateRequest(sectionIdParamSchema), sectionController.handleGetSectionById);
router.put('/:id', validateRequest(updateSectionSchema), sectionController.handleUpdateSectionById);
router.delete('/:id', validateRequest(sectionIdParamSchema), sectionController.handleDeleteSectionById);

export { router as sectionRoutes };
