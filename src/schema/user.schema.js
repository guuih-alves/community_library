import { z } from 'zod';

//validação de dados com zod
const userSchema =  z.object({
    username: z.string().min(3, 'Username is required'),
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password must be al least 6 charact '),
    avatar: z.url('Invalid URL').optional()
})

const userIdSchema = z.object({
    userId: z.number().int().positive('User ID must be a positive integer')
});

export {userSchema, userIdSchema};