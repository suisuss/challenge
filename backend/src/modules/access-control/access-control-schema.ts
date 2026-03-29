import { z } from 'zod';

const idParam = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number')
});

export const accessControlIdParamSchema = z.object({
  params: idParam
});

export const addAccessControlSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    type: z.string().min(1, 'Type is required'),
    path: z.string().optional(),
    method: z.string().optional()
  })
});

export const updateAccessControlSchema = z.object({
  params: idParam,
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    type: z.string().min(1, 'Type is required'),
    path: z.string().optional(),
    method: z.string().optional()
  })
});
