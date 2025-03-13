import { userService } from '@/services/user.service';
import type { ReactNode } from 'react';
import { NotFoundPage } from '../NotFoundPage';
import type { Role } from '@/types/Roles';
import { useAtomValue } from 'jotai';

export function PrivateRoute({
  children,
  role,
}: {
  children: ReactNode;
  role: Role;
}) {
  const user = useAtomValue(userService.user);

  if (user?.role === role) {
    return children;
  }

  return <NotFoundPage />;
}
