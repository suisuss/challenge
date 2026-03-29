import { z } from "zod";

const idParam = z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
});

export const classIdParamSchema = z.object({
    params: idParam,
});

export const addClassSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Class name is required"),
        sections: z.union([z.array(z.string()), z.string()]),
    }),
});

export const updateClassSchema = z.object({
    params: idParam,
    body: z.object({
        name: z.string().min(1, "Class name is required"),
        sections: z.union([z.array(z.string()), z.string()]),
    }),
});
