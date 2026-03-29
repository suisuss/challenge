import { z } from 'zod';

const idParam = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number')
});

export const classTeacherIdParamSchema = z.object({
  params: idParam
});

export const addClassTeacherSchema = z.object({
  body: z.object({
    class: z.string().min(1, 'Class is required'),
    section: z.string(),
    teacher: z.number().min(1, 'Teacher is required')
  })
});

export const updateClassTeacherSchema = z.object({
  params: idParam,
  body: z.object({
    class: z.string().min(1, 'Class is required'),
    section: z.string(),
    teacher: z.number().min(1, 'Teacher is required')
  })
});
