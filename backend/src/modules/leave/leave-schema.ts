import { z } from 'zod';

const idParam = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number')
});

export const addLeaveRequestSchema = z.object({
  body: z.object({
    policy: z.number().min(1, 'Policy is required'),
    from: z.string().min(1, 'From date is required'),
    to: z.string().min(1, 'To date is required'),
    note: z.string().min(1, 'Note is required')
  })
});

export const updateLeaveRequestSchema = z.object({
  params: idParam,
  body: z.object({
    policy: z.number().min(1, 'Policy is required'),
    from: z.string().min(1, 'From date is required'),
    to: z.string().min(1, 'To date is required'),
    note: z.string().min(1, 'Note is required')
  })
});

export const leaveIdParamSchema = z.object({
  params: idParam
});

export const addLeavePolicySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Policy name is required')
  })
});

export const updateLeavePolicySchema = z.object({
  params: idParam,
  body: z.object({
    name: z.string().min(1, 'Policy name is required')
  })
});

export const reviewLeaveStatusSchema = z.object({
  params: idParam,
  body: z.object({
    status: z.number({ required_error: 'Status is required' })
  })
});

export const policyUsersSchema = z.object({
  params: idParam,
  body: z.object({
    users: z.array(z.number()).min(1, 'You must select at least one user')
  })
});

export const removePolicyUserSchema = z.object({
  params: idParam,
  body: z.object({
    user: z.number({ required_error: 'User is required' })
  })
});
