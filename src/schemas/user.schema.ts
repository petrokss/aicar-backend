import { object, string, TypeOf, z } from 'zod';
import { Role } from '../entity/User';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required'
    }),
    email: string({
      required_error: 'Email address is required'
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required'
    })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    role: z.optional(z.nativeEnum(Role)),
    description: z.optional(string())
  })
});

export const loginUserSchema = object({
  body: object({
    username: string({
      required_error: 'Username is required'
    }).email('Invalid username'),
    password: string({
      required_error: 'Password is required'
    })
  })
});

export type createUserInput = TypeOf<typeof createUserSchema>['body'];

export type loginUserInput = TypeOf<typeof loginUserSchema>['body'];
