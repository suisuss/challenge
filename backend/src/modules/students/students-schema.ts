import { z } from 'zod';

const idParam = z.object({
  id: z.string().regex(/^\d+$/, 'Student ID must be a number')
});

const studentBodyFields = {
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
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
  permanentAddress: z.string().optional()
};

export const getStudentsSchema = z.object({
  query: z
    .object({
      name: z.string().optional(),
      className: z.string().optional(),
      section: z.string().optional(),
      roll: z.string().optional()
    })
    .strict()
});

export const studentIdParamSchema = z.object({
  params: idParam
});

export const addStudentSchema = z.object({
  body: z.object(studentBodyFields)
});

export const updateStudentSchema = z.object({
  params: idParam,
  body: z.object(studentBodyFields).partial()
});

export const studentStatusSchema = z.object({
  params: idParam,
  body: z.object({
    status: z.boolean({ required_error: 'Status is required' })
  })
});
