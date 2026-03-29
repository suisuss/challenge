import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
    processGetAllDepartments,
    processAddNewDepartment,
    processGetDepartmentById,
    processUpdateDepartmentById,
    processDeleteDepartmentById,
} from "./department-service";

const handleGetAllDepartments = asyncHandler(async (req: Request, res: Response) => {
    const departments = await processGetAllDepartments();
    res.json({ departments });
});

const handleAddNewDepartment = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;
    const message = await processAddNewDepartment(name);
    res.json(message);
});

const handleGetDepartmentById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const department = await processGetDepartmentById(id);
    res.json(department);
});

const handleUpdateDepartmentById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name } = req.body;
    const message = await processUpdateDepartmentById({ id, name });
    res.json(message);
});

const handleDeleteDepartmentById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const message = await processDeleteDepartmentById(id);
    res.json(message);
});

export {
    handleGetAllDepartments,
    handleGetDepartmentById,
    handleUpdateDepartmentById,
    handleDeleteDepartmentById,
    handleAddNewDepartment,
};
