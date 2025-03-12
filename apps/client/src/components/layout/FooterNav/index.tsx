import { AlignJustify, CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FooterNav() {
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
