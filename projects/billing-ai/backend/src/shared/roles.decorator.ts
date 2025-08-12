
import { SetMetadata } from '@nestjs/common';

// Roles metadata key
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
