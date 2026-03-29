import { ApiError } from '../../utils';
import {
  getClassTeachers,
  addClassTeacher,
  getClassTeacherById,
  updateClassTeacherById,
  findAllTeachers
} from './class-teacher-repository';

const fetchAllClassTeachers = async (): Promise<any[]> => {
  const data = await getClassTeachers();
  return Array.isArray(data) ? data : [];
};

const addNewClassTeacher = async (payload: {
  className: string;
  section: string;
  teacher: number;
}): Promise<{ message: string }> => {
  const affectedRow = await addClassTeacher(payload);
  if (affectedRow <= 0) {
    throw new ApiError(500, 'Unable to add class teacher');
  }

  return { message: 'Class teacher added successfully' };
};

const fetchClassTeacherDetailById = async (id: number | string): Promise<any> => {
  const classTeacherDetail = await getClassTeacherById(id);
  if (!classTeacherDetail) {
    throw new ApiError(404, 'Class teacher detail not found');
  }

  return classTeacherDetail;
};

const updateClassTeacher = async (payload: {
  id: number | string;
  className: string;
  section: string;
  teacher: number;
}): Promise<{ message: string }> => {
  const affectedRow = await updateClassTeacherById(payload);
  if (affectedRow <= 0) {
    throw new ApiError(500, 'Unable to update class teacher detail');
  }

  return { message: 'Class teacher detail updated successfully' };
};

const getAllTeachers = async (): Promise<any[]> => {
  const teachers = await findAllTeachers();
  if (teachers.length <= 0) {
    throw new ApiError(404, 'Teachers not found');
  }
  return teachers;
};

export {
  fetchAllClassTeachers,
  addNewClassTeacher,
  fetchClassTeacherDetailById,
  updateClassTeacher,
  getAllTeachers
};
