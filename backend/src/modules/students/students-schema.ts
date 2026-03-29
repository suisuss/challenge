import { z } from "zod";

export const getStudentsSchema = z.object({
    query: z.object({
        name: z.string().optional(),
        className: z.string().optional(),
        section: z.string().optional(),
        roll: z.string().optional(),
    }),
});

export const studentIdParamSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "Student ID must be a number"),
    }),
});

export const addStudentSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().optional(),
        gender: z.string().optional(),
        dob: z.string().optional(),
        className: z.string().optional(),
        sectionName: z.string().optional(),
        roll: z.string().optional(),
        fatherName: z.string().optional(),
        fatherPhone: z.string().optional(),
        motherName: z.string().optional(),
        motherPhone: z.string().optional(),
        guardianName: z.string().optional(),
        guardianPhone: z.string().optional(),
        relationOfGuardian: z.string().optional(),
        currentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
    }),
});

export const updateStudentSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "Student ID must be a number"),
    }),
    body: z.object({
        name: z.string().min(1, "Name is required").optional(),
        email: z.string().email("Invalid email address").optional(),
        phone: z.string().optional(),
        gender: z.string().optional(),
        dob: z.string().optional(),
        className: z.string().optional(),
        sectionName: z.string().optional(),
        roll: z.string().optional(),
        fatherName: z.string().optional(),
        fatherPhone: z.string().optional(),
        motherName: z.string().optional(),
        motherPhone: z.string().optional(),
        guardianName: z.string().optional(),
        guardianPhone: z.string().optional(),
        relationOfGuardian: z.string().optional(),
        currentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
    }),
});

export const studentStatusSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "Student ID must be a number"),
    }),
    body: z.object({
        status: z.boolean({ required_error: "Status is required" }),
    }),
});
