import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import {
  addNewLeaveRequest,
  reviewPendingLeaveRequest,
  makeNewLeavePolicy,
  fetchLeavePolicies,
  updateLeavePolicy,
  updatePolicyUsers,
  fetchPolicyUsers,
  deletePolicyUser,
  fetchPolicyEligibleUsers,
  reviewLeavePolicy,
  getUserLeaveHistory,
  deleteLeaveRequest,
  fetchPendingLeaveRequests,
  updateLeaveRequest,
  processGetMyLeavePolicy
} from './leave-service';

const handleMakeNewPolicy = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const newPolicy = await makeNewLeavePolicy(name);
  res.json(newPolicy);
});

const handleGetLeavePolicies = asyncHandler(async (req: Request, res: Response) => {
  const leavePolicies = await fetchLeavePolicies();
  res.json({ leavePolicies });
});

const handleGetMyLeavePolicy = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user!;
  const leavePolicies = await processGetMyLeavePolicy(id);
  res.json({ leavePolicies });
});

const handleUpdateLeavePlicy = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const id = req.params.id;
  const updatedPolicy = await updateLeavePolicy(name, id);
  res.json(updatedPolicy);
});

const handleUpdatePolicyUsers = asyncHandler(async (req: Request, res: Response) => {
  const { users } = req.body;
  const id = req.params.id;
  const message = await updatePolicyUsers(id, users);
  res.json(message);
});

const handleGetPolicyUsers = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const users = await fetchPolicyUsers(id);
  res.json({ users });
});

const handleRemovePolicyUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { user } = req.body;
  const message = await deletePolicyUser(user, id);
  res.json(message);
});

const handleFetchPolicyEligibleUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await fetchPolicyEligibleUsers();
  res.json({ users });
});

const handleCreateNewLeaveRequest = asyncHandler(async (req: Request, res: Response) => {
  const { id: userId } = req.user!;
  const { policy, from, to, note } = req.body;
  const message = await addNewLeaveRequest({ policy, from, to, note, userId });
  res.json(message);
});

const handleReviewLeaveRequest = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;
  const { id: userId } = req.user!;
  const leaveRequestId = req.params.id;

  const message = await reviewPendingLeaveRequest(userId, leaveRequestId, status);
  res.json(message);
});

const handleReviewLeavePolicy = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { status } = req.body;

  const message = await reviewLeavePolicy(status, id);
  res.json(message);
});

const handleUpdateLeaveRequest = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const id = req.params.id;
  const payload = { ...body, id };

  const message = await updateLeaveRequest(payload);
  res.json(message);
});

const handleGetUserLeaveHistory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user!;
  const leaveHistory = await getUserLeaveHistory(id);
  res.json({ leaveHistory });
});

const handleDeleteLeaveRequest = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const message = await deleteLeaveRequest(id);
  res.json(message);
});

const handleFetchPendingLeaveRequests = asyncHandler(async (req: Request, res: Response) => {
  const pendingLeaves = await fetchPendingLeaveRequests();
  res.json({ pendingLeaves });
});

export {
  handleCreateNewLeaveRequest,
  handleReviewLeaveRequest,
  handleMakeNewPolicy,
  handleGetLeavePolicies,
  handleUpdateLeavePlicy,
  handleUpdatePolicyUsers,
  handleGetPolicyUsers,
  handleRemovePolicyUser,
  handleFetchPolicyEligibleUsers,
  handleReviewLeavePolicy,
  handleUpdateLeaveRequest,
  handleGetUserLeaveHistory,
  handleDeleteLeaveRequest,
  handleFetchPendingLeaveRequests,
  handleGetMyLeavePolicy
};
