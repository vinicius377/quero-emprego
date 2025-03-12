import { userService } from '@/services/user.service';
import type { ReactNode } from 'react';
import { NotFoundPage } from '../NotFoundPage';
import type { Role } from '@/types/Roles';

export function PrivateRoute(children: ReactNode, role: Role) {
  const user = userService.user;

  if (user?.role === role) {
    return children;
  }

  return <NotFoundPage />;
}
