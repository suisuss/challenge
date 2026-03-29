import { z } from 'zod';

const idParam = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number')
});

export const sectionIdParamSchema = z.object({
  params: idParam
});

export const addSectionSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Section name is required')
  })
});

export const updateSectionSchema = z.object({
  params: idParam,
  body: z.object({
    name: z.string().min(1, 'Section name is required')
  })
});
