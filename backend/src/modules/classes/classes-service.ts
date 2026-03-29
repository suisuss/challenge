import { ApiError } from "../../utils";
import {
  getAllClasses,
  getClassDetail,
  addNewClass,
  updateClassDetailById,
  deleteClassById,
} from "./classes-repository";

const fetchAllClasses = async (): Promise<any[]> => {
  const classes = await getAllClasses();
  if (!Array.isArray(classes) || classes.length <= 0) {
    throw new ApiError(404, "Classes not found");
  }

  return classes;
};

const fetchClassDetail = async (id: number | string): Promise<any> => {
  const classDetail = await getClassDetail(id);
  if (!classDetail) {
    throw new ApiError(404, "Class detail not found");
  }

  return classDetail;
};

const addClass = async (payload: { name: string; sections: string[] }): Promise<{ message: string }> => {
  const affectedRow = await addNewClass(payload);
  if (affectedRow <= 0) {
    throw new ApiError(500, "Unable to add new class");
  }

  return { message: "Class added successfully" };
};

const updateClassDetail = async (payload: {
  id: number | string;
  name: string;
  sections: string[];
}): Promise<{ message: string }> => {
  const affectedRow = await updateClassDetailById(payload as any);
  if (affectedRow <= 0) {
    throw new ApiError(500, "Unable to update class detail");
  }
  return { message: "Class detail updated successfully" };
};

const deleteClass = async (id: number | string): Promise<{ message: string }> => {
  const affectedRow = await deleteClassById(id);
  if (affectedRow <= 0) {
    throw new ApiError(500, "Unable to delete class");
  }
  return { message: "Class deleted successfully" };
};

export {
  fetchAllClasses,
  fetchClassDetail,
  addClass,
  updateClassDetail,
  deleteClass,
};
