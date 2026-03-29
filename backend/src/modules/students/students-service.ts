import { ApiError, sendAccountVerificationEmail } from '../../utils';
import {
  findAllStudents,
  findStudentDetail,
  findStudentToSetStatus,
  addOrUpdateStudent,
  deleteStudentById,
} from './students-repository';
import { findUserById } from '../../shared/repository';

const checkStudentId = async (id: string | number): Promise<void> => {
  const isStudentFound = await findUserById(Number(id));
  if (!isStudentFound) {
    throw new ApiError(404, 'Student not found');
  }
};

const getAllStudents = async (payload: {
  name?: string;
  className?: string;
  section?: string;
  roll?: string;
}): Promise<any[]> => {
  const students = await findAllStudents(payload);
  if (students.length <= 0) {
    throw new ApiError(404, 'Students not found');
  }

  return students;
};

const getStudentDetail = async (id: string | number): Promise<any> => {
  await checkStudentId(id);

  const student = await findStudentDetail(id);
  if (!student) {
    throw new ApiError(404, 'Student not found');
  }

  return student;
};

const addNewStudent = async (payload: any): Promise<{ message: string }> => {
  const ADD_STUDENT_AND_EMAIL_SEND_SUCCESS =
    'Student added and verification email sent successfully.';
  const ADD_STUDENT_AND_BUT_EMAIL_SEND_FAIL =
    'Student added, but failed to send verification email.';
  try {
    const result = await addOrUpdateStudent(payload);
    if (!result.status) {
      throw new ApiError(500, result.message);
    }

    try {
      await sendAccountVerificationEmail({ userId: result.userId, userEmail: payload.email });
      return { message: ADD_STUDENT_AND_EMAIL_SEND_SUCCESS };
    } catch (error) {
      return { message: ADD_STUDENT_AND_BUT_EMAIL_SEND_FAIL };
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Unable to add student');
  }
};

const updateStudent = async (payload: any): Promise<{ message: string }> => {
  const result = await addOrUpdateStudent(payload);
  if (!result.status) {
    throw new ApiError(500, result.message);
  }

  return { message: result.message };
};

const setStudentStatus = async (payload: {
  userId: string | number;
  reviewerId: number;
  status: boolean;
}): Promise<{ message: string }> => {
  const { userId, reviewerId, status } = payload;
  await checkStudentId(userId);

  const affectedRow = await findStudentToSetStatus({ userId, reviewerId, status });
  if (affectedRow <= 0) {
    throw new ApiError(500, 'Unable to disable student');
  }

  return { message: 'Student status changed successfully' };
};

const deleteStudent = async (id: string | number): Promise<{ message: string }> => {
  await checkStudentId(id);

  const affectedRow = await deleteStudentById(id);
  if (affectedRow <= 0) {
    throw new ApiError(500, 'Unable to delete student');
  }

  return { message: 'Student deleted successfully' };
};

export {
  getAllStudents,
  getStudentDetail,
  addNewStudent,
  setStudentStatus,
  updateStudent,
  deleteStudent,
};
