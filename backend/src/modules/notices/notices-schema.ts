import { z } from "zod";

const idParam = z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
});

const noticeBodyFields = {
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    status: z.number().min(1, "Status is required"),
    recipientType: z.enum(["EV", "SP"]),
    recipientRole: z.number().optional(),
    firstField: z.union([z.number(), z.string()]).optional(),
};

export const addNoticeSchema = z.object({
    body: z.object(noticeBodyFields),
});

export const updateNoticeSchema = z.object({
    params: idParam,
    body: z.object(noticeBodyFields),
});

export const noticeIdParamSchema = z.object({
    params: idParam,
});

export const noticeStatusSchema = z.object({
    params: idParam,
    body: z.object({
        status: z.number({ required_error: "Status is required" }),
    }),
});

export const addNoticeRecipientSchema = z.object({
    body: z.object({
        roleId: z.number().min(1, "Role is required"),
        primaryDependentName: z.string().min(1, "Name is required"),
        primaryDependentSelect: z.string().min(1, "Select statement is required"),
    }),
});

export const updateNoticeRecipientSchema = z.object({
    params: idParam,
    body: z.object({
        roleId: z.number().min(1, "Role is required"),
        primaryDependentName: z.string().min(1, "Name is required"),
        primaryDependentSelect: z.string().min(1, "Select statement is required"),
    }),
});
