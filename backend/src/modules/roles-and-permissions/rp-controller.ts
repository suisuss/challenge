import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import {
  fetchRoles,
  addRole,
  updateRole,
  processRoleStatus,
  fetchRole,
  addRolePermission,
  getRolePermissions,
  fetchUsersByRoleId,
  processSwitchRole
} from './rp-service';

const handleGetRoles = asyncHandler(async (req: Request, res: Response) => {
  const roles = await fetchRoles();
  res.json({ roles });
});

const handleGetRole = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const role = await fetchRole(id);
  res.json(role);
});

const handleAddRole = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const message = await addRole(name);
  res.json(message);
});

const handleUpdateRole = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;
  const message = await updateRole(id, name);
  res.json(message);
});

const handleRoleStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { status } = req.body;
  const message = await processRoleStatus(id, status);
  res.json(message);
});

const handleAddRolePermission = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { permissions } = req.body;
  const message = await addRolePermission(id, permissions);
  res.json(message);
});

const handleGetRolePermission = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const permissions = await getRolePermissions(id);
  res.json({ permissions });
});

const handleGetUsersByRoleId = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const users = await fetchUsersByRoleId(id);
  res.json({ users });
});

const handleSwitchRole = asyncHandler(async (req: Request, res: Response) => {
  const { userId, roleId } = req.body;
  const message = await processSwitchRole(userId, roleId);
  res.json(message);
});

export {
  handleAddRole,
  handleGetRoles,
  handleUpdateRole,
  handleRoleStatus,
  handleGetRole,
  handleAddRolePermission,
  handleGetRolePermission,
  handleGetUsersByRoleId,
  handleSwitchRole
};
