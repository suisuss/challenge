import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent
} from './students-service';

const handleGetAllStudents = asyncHandler(async (req: Request, res: Response) => {
  //write your code
});

const handleAddStudent = asyncHandler(async (req: Request, res: Response) => {
  //write your code
});

const handleUpdateStudent = asyncHandler(async (req: Request, res: Response) => {
  //write your code
});

const handleGetStudentDetail = asyncHandler(async (req: Request, res: Response) => {
  //write your code
});

const handleStudentStatus = asyncHandler(async (req: Request, res: Response) => {
  //write your code
});

export {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent
};
