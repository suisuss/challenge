import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
    processGetAllSections,
    processGetSectionById,
    processUpdateSectionById,
    processDeleteSectionById,
    processAddNewSection,
} from "./section-service";

const handleGetAllSections = asyncHandler(async (req: Request, res: Response) => {
    const sections = await processGetAllSections();
    res.json({ sections });
});

const handleAddNewSection = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;
    const message = await processAddNewSection(name);
    res.json(message);
});

const handleGetSectionById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const section = await processGetSectionById(id);
    res.json(section);
});

const handleUpdateSectionById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name } = req.body;
    const message = await processUpdateSectionById({ id, name });
    res.json(message);
});

const handleDeleteSectionById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const message = await processDeleteSectionById(id);
    res.json(message);
});

export {
    handleGetAllSections,
    handleGetSectionById,
    handleUpdateSectionById,
    handleDeleteSectionById,
    handleAddNewSection,
};
