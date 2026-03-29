import { z } from 'zod';

export const StudentFilterSchema = z.object({
  class: z.string().optional(),
  section: z.string().optional(),
  name: z.string().optional(),
  roll: z.string().optional()
});

export const BasicInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  gender: z.string().min(1, 'Gender is required'),
  dob: z.union([z.date(), z.string()]),
  phone: z.string().min(1, 'Phone is required').regex(/^[\d\s+\-()]+$/, 'Invalid phone number'),
  email: z.string().min(1, 'Email is required').email('Invalid email address')
});

export const AcademicInfoSchema = z.object({
  class: z.string().min(1, 'Class is required'),
  section: z.string(),
  roll: z.string().min(1, 'Roll is required').regex(/^\d+$/, 'Roll must be a number'),
  admissionDate: z.union([z.date(), z.string()])
});

export const AddressInfoSchema = z.object({
  currentAddress: z.string().min(1, 'Current Address is required'),
  permanentAddress: z.string().min(1, 'Permanent Address is required')
});

export const ParentsAndGuardianInfoSchema = z.object({
  fatherName: z.string().min(1, 'Father Name is required'),
  fatherPhone: z.string().regex(/^[\d\s+\-()]*$/, 'Invalid phone number').optional(),
  motherName: z.string().optional(),
  motherPhone: z.string().regex(/^[\d\s+\-()]*$/, 'Invalid phone number').optional(),
  guardianName: z.string().min(1, 'Guardian Name is required'),
  guardianPhone: z
    .string()
    .min(1, 'Guardian Phone is required')
    .regex(/^[\d\s+\-()]+$/, 'Invalid phone number'),
  relationOfGuardian: z.string().min(1, 'Relation of guardian is required')
});

export const OtherInfoSchema = z.object({
  systemAccess: z.boolean()
});

export const StudentSchema = BasicInfoSchema.extend(AcademicInfoSchema.shape)
  .extend(AddressInfoSchema.shape)
  .extend(ParentsAndGuardianInfoSchema.shape)
  .extend(OtherInfoSchema.shape);
