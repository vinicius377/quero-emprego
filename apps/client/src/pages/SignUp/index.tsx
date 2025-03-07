import { UserType } from 'compoments/UserType';
import { Outlet, useNavigate } from 'react-router-dom';

export function SignUp() {


  return (
    <section>
      <UserType />    
      <Outlet />
    </section>
  );
}
