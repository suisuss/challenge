import { ApiError, sendAccountVerificationEmail } from '../../utils';
import {
  addOrUpdateStaff,
  reviewStaffStatus,
  getAllStaffs,
  getStaffDetailById
} from './staffs-repository';

const processGetAllStaffs = async (payload: {
  userId?: string;
  roleId?: string;
  name?: string;
}): Promise<any[]> => {
  const staffs = await getAllStaffs(payload);
  if (staffs.length <= 0) {
    throw new ApiError(404, 'Staffs not found');
  }
  return staffs;
};

const processGetStaff = async (id: string | number): Promise<any> => {
  const staff = await getStaffDetailById(id);
  if (!staff) {
    throw new ApiError(404, 'Staff detail not found');
  }
  return staff;
};

const processReviewStaffStatus = async (payload: {
  status: boolean;
  userId: string | number;
  reviewerId: number;
}): Promise<{ message: string }> => {
  const affectedRow = await reviewStaffStatus(payload);
  if (affectedRow <= 0) {
    throw new ApiError(500, 'Unable to update staff status');
  }
  return { message: 'Staff status updated successfully' };
};

const processAddStaff = async (payload: any): Promise<{ message: string }> => {
  const ADD_STAFF_AND_EMAIL_SEND_SUCCESS = 'Staff added and verification email sent successfully.';
  const ADD_STAFF_AND_BUT_EMAIL_SEND_FAIL = 'Staff added, but failed to send verification email.';
  try {
    const result = await addOrUpdateStaff(payload);
    if (!result.status) {
      const detail = result.description
        ? `${result.message}: ${result.description}`
        : result.message;
      throw new ApiError(500, detail || 'Unable to add staff');
    }

    try {
      await sendAccountVerificationEmail({ userId: result.userId, userEmail: payload.email });
      return { message: ADD_STAFF_AND_EMAIL_SEND_SUCCESS };
    } catch (error) {
      return { message: ADD_STAFF_AND_BUT_EMAIL_SEND_FAIL };
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Unable to add staff');
  }
};

const processUpdateStaff = async (payload: any): Promise<{ message: string }> => {
  const result = await addOrUpdateStaff(payload);
  if (!result.status) {
    const detail = result.description ? `${result.message}: ${result.description}` : result.message;
    throw new ApiError(500, detail || 'Unable to update staff');
  }

  return { message: result.message };
};

export {
  processGetAllStaffs,
  processGetStaff,
  processReviewStaffStatus,
  processAddStaff,
  processUpdateStaff
};
