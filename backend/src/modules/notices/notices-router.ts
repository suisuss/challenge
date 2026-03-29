import { Router } from 'express';
import * as noticeController from './notices-controller';
import { checkApiAccess } from '../../middlewares';
import { validateRequest } from '../../utils';
import {
  addNoticeSchema,
  updateNoticeSchema,
  noticeIdParamSchema,
  noticeStatusSchema,
  addNoticeRecipientSchema,
  updateNoticeRecipientSchema
} from './notices-schema';

const router = Router();

router.get('/recipients/list', checkApiAccess, noticeController.handleFetchNoticeRecipients);
router.get('/recipients', checkApiAccess, noticeController.handleGetNoticeRecipients);
router.get('/recipients/:id', checkApiAccess, validateRequest(noticeIdParamSchema), noticeController.handleGetNoticeRecipient);
router.post('/recipients', checkApiAccess, validateRequest(addNoticeRecipientSchema), noticeController.handleAddNoticeRecipient);
router.put('/recipients/:id', checkApiAccess, validateRequest(updateNoticeRecipientSchema), noticeController.handleUpdateNoticeRecipient);
router.delete('/recipients/:id', checkApiAccess, validateRequest(noticeIdParamSchema), noticeController.handleDeleteNoticeRecipient);
router.post('/:id/status', checkApiAccess, validateRequest(noticeStatusSchema), noticeController.handleNoticeStatus);
router.get('/pending', checkApiAccess, noticeController.handleFetchAllPendingNotices);
router.get('/:id', checkApiAccess, validateRequest(noticeIdParamSchema), noticeController.handleFetchNoticeDetailById);
router.get('', checkApiAccess, noticeController.handleFetchAllNotices);
router.post('', checkApiAccess, validateRequest(addNoticeSchema), noticeController.handleAddNotice);
router.put('/:id', checkApiAccess, validateRequest(updateNoticeSchema), noticeController.handleUpdateNotice);

export { router as noticesRoutes };
