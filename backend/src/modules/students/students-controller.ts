import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent, deleteStudent } from "./students-service";

const handleGetAllStudents = asyncHandler(async (req: Request, res: Response) => {
    const { name, className, section, roll } = req.query as {
        name?: string;
        className?: string;
        section?: string;
        roll?: string;
    };
    const students = await getAllStudents({ name, className, section, roll });
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req: Request, res: Response) => {
    const payload = req.body;
    const message = await addNewStudent(payload);
    res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const message = await updateStudent({ ...payload, userId: id });
    res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const student = await getStudentDetail(id);
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { status } = req.body;
    const { id: reviewerId } = req.user!;
    const message = await setStudentStatus({ userId, reviewerId, status });
    res.json(message);
});

const handleDeleteStudent = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const message = await deleteStudent(id);
    res.json(message);
});

export {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
    handleDeleteStudent,
};
