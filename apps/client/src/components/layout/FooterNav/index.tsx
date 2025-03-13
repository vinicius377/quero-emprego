import { userService } from '@/services/user.service';
import { useAtomValue } from 'jotai';
import { AlignJustify, CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FooterNav() {
  const user = useAtomValue(userService.user);

  if (!user) return null;

  return (
    <div className="h-14 px-2 bg-white flex justify-around py-2 md:hidden">
      <Link to="/criar-emprego">
        <div className="flex flex-col items-center">
          <CirclePlus />
          Criar emprego
        </div>
      </Link>
      <Link to="/listar-empregos">
        <div className="flex flex-col items-center">
          <AlignJustify />
          Listar empregos
        </div>
      </Link>
    </div>
  );
}
