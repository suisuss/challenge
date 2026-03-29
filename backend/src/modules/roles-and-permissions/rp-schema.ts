import { z } from "zod";

const idParam = z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
});

export const roleIdParamSchema = z.object({
    params: idParam,
});

export const addRoleSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Role name is required"),
    }),
});

export const updateRoleSchema = z.object({
    params: idParam,
    body: z.object({
        name: z.string().min(1, "Role name is required"),
    }),
});

export const roleStatusSchema = z.object({
    params: idParam,
    body: z.object({
        status: z.boolean({ required_error: "Status is required" }),
    }),
});

export const rolePermissionsSchema = z.object({
    params: idParam,
    body: z.object({
        permissions: z.array(z.number()).min(1, "At least one permission is required"),
    }),
});

export const switchRoleSchema = z.object({
    body: z.object({
        userId: z.number({ required_error: "User ID is required" }),
        roleId: z.number({ required_error: "Role ID is required" }),
    }),
});
