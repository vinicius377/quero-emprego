import { userService } from '@/services/user.service';
import { Role } from '@packages/types/enums';
import { useAtomValue } from 'jotai';
import { AlignJustify, CirclePlus, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FooterNav() {
  const user = useAtomValue(userService.user);

  if (!user) return null;

  return (
    <div className="h-14 border border-[#c4c4c4] px-2 bg-white flex justify-around py-2 md:hidden">
      {user.role === Role.business && <BusinessOptions />}
      {user.role === Role.candidate && <CandidateOptions />}
    </div>
  );
}

const BusinessOptions = () => (
  <>
    <Link to="/criar-emprego">
      <div className="flex flex-col items-center">
        <CirclePlus />
        Criar post
      </div>
    </Link>
    <Link to="/listar-empregos">
      <div className="flex flex-col items-center">
        <AlignJustify />
        Listar posts 
      </div>
    </Link>
  </>
);

const CandidateOptions = () => (
  <>
    <Link to="/perfil">
      <div className="flex flex-col items-center">
        <UserRound />
        Perfil
      </div>
    </Link>
  </>
);

