import { z } from 'zod';

const idParam = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number')
});

const staffBodyFields = {
  name: z.string().min(1, 'Name is required'),
  role: z.number().min(1, 'Role is required'),
  gender: z.string().min(1, 'Gender is required'),
  maritalStatus: z.string().min(1, 'Marital status is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email address'),
  dob: z.string().optional(),
  joinDate: z.string().optional(),
  qualification: z.string().optional(),
  experience: z.string().optional(),
  currentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  emergencyPhone: z.string().optional(),
  systemAccess: z.boolean().optional(),
  reporterId: z.number().optional()
};

export const getStaffsSchema = z.object({
  query: z.object({
    userId: z.string().optional(),
    roleId: z.string().optional(),
    name: z.string().optional()
  })
});

export const staffIdParamSchema = z.object({
  params: idParam
});

export const addStaffSchema = z.object({
  body: z.object(staffBodyFields)
});

export const updateStaffSchema = z.object({
  params: idParam,
  body: z.object(staffBodyFields).partial()
});

export const staffStatusSchema = z.object({
  params: idParam,
  body: z.object({
    status: z.boolean({ required_error: 'Status is required' })
  })
});
