import { UserType } from 'components/shared/UserType';
import { Outlet } from 'react-router-dom';

export function Login() {
  return (
    <section>
      <UserType />
      <div className="max-w-[30rem] m-auto mt-2">
        <Outlet />
      </div>
    </section>
  );
}
