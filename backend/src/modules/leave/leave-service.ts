import { ApiError } from '../../utils';
import {
  createNewLeavePolicy,
  updateLeavePolicyById,
  getLeavePolicies,
  getUsersByPolicyId,
  updatePolicyUsersById,
  enableDisableLeavePolicy,
  deleteUserFromPolicyById,
  getPolicyEligibleUsers,
  createNewLeaveRequest,
  updateLeaveRequestById,
  getLeaveRequestHistoryByUser,
  deleteLeaveRequestByRequestId,
  getPendingLeaveRequests,
  approveOrCancelPendingLeaveRequest,
  findReviewerIdByRequestId,
  getMyLeavePolicy,
  findPolicyStatusById
} from './leave-repository';

const checkIfPolicyIsActive = async (id: string | number): Promise<void> => {
  const policy = await findPolicyStatusById(id);
  if (!policy.is_active)
    throw new ApiError(403, 'Policy is not active. Please activate the policy first.');
};

const makeNewLeavePolicy = async (name: string): Promise<{ message: string }> => {
  const affectedRow = await createNewLeavePolicy(name);
  if (affectedRow <= 0) {
    throw new ApiError(500, 'Unable to add policy');
  }

  return { message: 'Policy added successfully' };
};

const updateLeavePolicy = async (
  name: string,
  id: string | number
): Promise<{ message: string }> => {
  await checkIfPolicyIsActive(id);

  const affectedRow = await updateLeavePolicyById(name, id);
  if (affectedRow <= 0) {
    throw new ApiError(500, 'Unable to update policy');
  }

  return { message: 'Policy updated successfully' };
};

const fetchLeavePolicies = async (): Promise<any[]> => {
  const policies = await getLeavePolicies();
  if (!Array.isArray(policies) || policies.length <= 0) {
    throw new ApiError(404, 'Leave policies not found');
  }

  return policies;
};

const processGetMyLeavePolicy = async (id: number): Promise<any[]> => {
  const policies = await getMyLeavePolicy(id);
  if (!Array.isArray(policies) || policies.length <= 0) {
    throw new ApiError(404, 'Leave policies not found');
  }

  return policies;
};

const fetchPolicyUsers = async (id: string | number): Promise<any[]> => {
  await checkIfPolicyIsActive(id);

  const users = await getUsersByPolicyId(id);
  if (!Array.isArray(users) || users.length <= 0) {
    throw new ApiError(404, 'Policy users not found');
  }

  return users;
};

const updatePolicyUsers = async (
  policyId: string | number,
  userIds: string
): Promise<{ message: string }> => {
  await checkIfPolicyIsActive(policyId);

  const affectedRow = await updatePolicyUsersById(policyId, userIds);
  if (affectedRow <= 0) {
    throw new ApiError(404, 'No users were updated or policy not found');
  }

  return { message: 'Users of policy updated' };
};

const deletePolicyUser = async (
  userId: string | number,
  policyId: string | number
): Promise<{ message: string }> => {
  await checkIfPolicyIsActive(policyId);

  const affectedRow = await deleteUserFromPolicyById(userId, policyId);
  if (affectedRow <= 0) {
    throw new ApiError(500, 'Unable to delete user from policy');
  }

  return { message: 'User deleted from policy successfully' };
};

const reviewLeavePolicy = async (
  status: boolean,
  policyId: string | number
): Promise<{ message: string }> => {
  const affectedRow = await enableDisableLeavePolicy(status, policyId);
  if (affectedRow <= 0) {
    const sts = status ? 'enable' : 'disable';
    throw new ApiError(500, `Unable to ${sts} policy`);
  }

  const responseStatus = status ? 'enabled' : 'disabled';
  return { message: `Policy ${responseStatus} successfully` };
};

const fetchPolicyEligibleUsers = async (): Promise<any[]> => {
  const users = await getPolicyEligibleUsers();
  if (!Array.isArray(users) || users.length <= 0) {
    throw new ApiError(404, 'Users not found');
  }

  return users;
};

const addNewLeaveRequest = async (payload: {
  policy: string | number;
  from: string;
  to: string;
  note: string;
  userId: number;
}): Promise<{ message: string }> => {
  await checkIfPolicyIsActive(payload.policy);

  const affectedRow = await createNewLeaveRequest(payload);
  if (affectedRow <= 0) {
    throw new ApiError(500, 'Unable to add new leave request');
  }

  return { message: 'Leave request added successfully' };
};

const updateLeaveRequest = async (payload: {
  id: string | number;
  policy: string | number;
  from: string;
  to: string;
  note: string;
}): Promise<{ message: string }> => {
  await checkIfPolicyIsActive(payload.policy);

  const affectedRow = await updateLeaveRequestById(payload);
  if (affectedRow <= 0) {
    throw new ApiError(500, 'Unable to update leave request');
  }

  return { message: 'Leave request updated successfully' };
};

const getUserLeaveHistory = async (userId: number): Promise<any[]> => {
  const leaves = await getLeaveRequestHistoryByUser(userId);
  if (!Array.isArray(leaves) || leaves.length <= 0) {
    throw new ApiError(404, 'Leaves not found');
  }

  return leaves;
};

const deleteLeaveRequest = async (
  leaveRequestId: string | number
): Promise<{ message: string }> => {
  const affectedRow = await deleteLeaveRequestByRequestId(leaveRequestId);
  if (affectedRow <= 0) {
    throw new ApiError(500, 'Unable to delete leave request');
  }

  return { message: 'Leave reuquest deleted successfully' };
};

const fetchPendingLeaveRequests = async (): Promise<any[]> => {
  const leaves = await getPendingLeaveRequests();
  if (!Array.isArray(leaves) || leaves.length <= 0) {
    throw new ApiError(404, 'Pending leave requests not found');
  }

  return leaves;
};

const reviewPendingLeaveRequest = async (
  userId: number,
  requestId: string | number,
  status: number
): Promise<{ message: string }> => {
  const user = await findReviewerIdByRequestId(requestId);
  if (!user) {
    throw new ApiError(404, 'User does not exist.');
  }

  const { reporter_id, role_id } = user;
  if (role_id !== 1 && reporter_id !== userId) {
    throw new ApiError(403, 'Forbidden. Authorised reviewer only.');
  }

  const affectedRow = await approveOrCancelPendingLeaveRequest(userId, requestId, status);
  if (affectedRow <= 0) {
    throw new ApiError(500, 'Operation failed');
  }

  return { message: 'Success' };
};

export {
  makeNewLeavePolicy,
  updateLeavePolicy,
  fetchLeavePolicies,
  fetchPolicyUsers,
  updatePolicyUsers,
  reviewLeavePolicy,
  deletePolicyUser,
  fetchPolicyEligibleUsers,
  addNewLeaveRequest,
  updateLeaveRequest,
  getUserLeaveHistory,
  deleteLeaveRequest,
  fetchPendingLeaveRequests,
  reviewPendingLeaveRequest,
  processGetMyLeavePolicy
};
