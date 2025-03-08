import { UserType } from 'compoments/UserType';
import { trpc } from 'lib/trpc';
import { Outlet } from 'react-router-dom';

export function Login() {
  const signOut = () => {
    trpc.auth.signOut.mutate();
  };
  return (
    <section>
      <UserType />
      <button onClick={signOut} type="button">
        Sair
      </button>
      <Outlet />
    </section>
  );
}
