import { UserType } from 'components/shared/UserType';
import { Outlet } from 'react-router-dom';

export function SignUp() {

  return (
    <section className="max-w-[40rem] m-auto">
      <UserType />    
      <Outlet />
    </section>
  );
}
