import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  fetchAllClasses,
  fetchClassDetail,
  addClass,
  updateClassDetail,
  deleteClass,
} from "./classes-service";

const handleFetchAllClasses = asyncHandler(async (req: Request, res: Response) => {
  const classes = await fetchAllClasses();
  res.json({ classes });
});

const handleFetchClassDetail = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const classDetail = await fetchClassDetail(id);
  res.json(classDetail);
});

const handleAddClass = asyncHandler(async (req: Request, res: Response) => {
  const { name, sections } = req.body;
  const payload = { name, sections };
  const message = await addClass(payload);
  res.json(message);
});

const handleUpdateClass = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { name, sections } = req.body;
  const payload = { id, name, sections };
  const message = await updateClassDetail(payload);
  res.json(message);
});

const handleDeleteClass = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const message = await deleteClass(id);
  res.json(message);
});

export {
  handleFetchAllClasses,
  handleFetchClassDetail,
  handleAddClass,
  handleUpdateClass,
  handleDeleteClass,
};
