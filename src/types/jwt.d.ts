import type { Role } from '../entity/User';
import { JwtPayload } from 'jsonwebtoken';

export type CustomJwtPayload = JwtPayload & { role?: Role };

export type DecodedToken = string | CustomJwtPayload;
