import { NavLink, useNavigate } from 'react-router-dom';
import { userService } from 'services/user.service';
import { MenuUser } from './Menu';
import { useAtomValue } from 'jotai';
import { Button } from '@/components/ui/button';

export function Header() {
  const user = useAtomValue(userService.user);
  const navigate = useNavigate();

  return (
    <div className="flex h-14 bg-white shadow-md justify-between items-center py-2 px-4">
      <div
        className="flex flex-col leading-3.5 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <h1 className="cursor-pointer relative font-semibold">
          Quero <span className="text-[#89BD23] font-extrabold">emprego!</span>
        </h1>
        <span className="font-semibold ml-auto -mr-1">Mucambo</span>
      </div>

      {user ? (
        <MenuUser />
      ) : (
        <div className="flex gap-2">
          <NavLink to="/login/empresa">
            <Button variant="secondary">Login</Button>
          </NavLink>
          <NavLink to="/signup/empresa">
            <Button>Criar conta</Button>
          </NavLink>
        </div>
      )}
    </div>
  );
}
