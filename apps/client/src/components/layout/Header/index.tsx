import { NavLink, useNavigate } from 'react-router-dom';
import { userService } from 'services/user.service';
import { MenuUser } from './Menu';

export function Header() {
  const user = userService.user;
  const navigate = useNavigate();

  return (
    <div className="flex h-14 bg-white shadow-md justify-between items-center py-2 px-4">
      <h1 onClick={() => navigate('/')} className="cursor-pointer">Quero emprego!</h1>
      {user ? (
        <MenuUser />
      ) : (
        <div className="flex gap-2">
          <NavLink to="/login/empresa">Login</NavLink>
          <NavLink to="/signup/empresa">Criar conta</NavLink>
        </div>
      )}
    </div>
  );
}
