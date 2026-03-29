import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { fetchDashboardData } from "./dashboard-service";

const handleGetDashboardData = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user!;
  const dashboard = await fetchDashboardData(id);
  res.json(dashboard);
});

export {
  handleGetDashboardData,
};
