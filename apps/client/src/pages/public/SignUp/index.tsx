import { UserType } from 'components/UserType';
import { Outlet } from 'react-router-dom';

export function SignUp() {

  return (
    <section>
      <UserType />    
      <Outlet />
    </section>
  );
}
