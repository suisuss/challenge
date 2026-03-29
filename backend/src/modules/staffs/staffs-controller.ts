import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
    processUpdateStaff,
    processGetAllStaffs,
    processReviewStaffStatus,
    processGetStaff,
    processAddStaff,
} from "./staffs-service";

const handleGetAllStaffs = asyncHandler(async (req: Request, res: Response) => {
    const { userId, roleId, name } = req.query as { userId?: string; roleId?: string; name?: string };
    const staffs = await processGetAllStaffs({ userId, roleId, name });
    res.json({ staffs });
});

const handleGetStaff = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const staff = await processGetStaff(id);
    res.json(staff);
});

const handleReviewStaffStatus = asyncHandler(async (req: Request, res: Response) => {
    const payload = req.body;
    const userId = req.params.id as string;
    const { id: reviewerId } = req.user!;
    const message = await processReviewStaffStatus({ ...payload, userId, reviewerId });
    res.json(message);
});

const handleAddStaff = asyncHandler(async (req: Request, res: Response) => {
    const payload = req.body;
    const message = await processAddStaff(payload);
    res.json(message);
});

const handleUpdateStaff = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id as string;
    const payload = req.body;
    const message = await processUpdateStaff({ ...payload, userId });
    res.json(message);
});

export {
    handleGetAllStaffs,
    handleGetStaff,
    handleReviewStaffStatus,
    handleAddStaff,
    handleUpdateStaff,
};
