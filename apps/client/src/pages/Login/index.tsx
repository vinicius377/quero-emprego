import { UserType } from 'compoments/UserType';
import { Outlet } from 'react-router-dom';

export function Login() {
  return (
    <section>
      <UserType />
        <Outlet />
    </section>
  );
}
