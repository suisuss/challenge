import { z } from "zod";

const idParam = z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
});

export const departmentIdParamSchema = z.object({
    params: idParam,
});

export const addDepartmentSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Department name is required"),
    }),
});

export const updateDepartmentSchema = z.object({
    params: idParam,
    body: z.object({
        name: z.string().min(1, "Department name is required"),
    }),
});
