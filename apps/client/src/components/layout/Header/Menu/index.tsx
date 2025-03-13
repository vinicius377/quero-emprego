import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { trpc } from '@/lib/trpc';
import { useAtomValue } from 'jotai';
import { Link } from 'react-router-dom';
import { userService } from 'services/user.service';
import Cookies from 'universal-cookie';

export function MenuUser() {
  const user = useAtomValue(userService.user);
  const cookie = new Cookies();

  if (!user) return null

  const signOut = async () => {
    try {
      await trpc.auth.signOut.mutate()

      cookie.remove('user')
      userService.remove()
    } catch {

    }
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{user.name.split(' ')[0]}</MenubarTrigger>
        <MenubarContent>
          <div className="hidden md:block">
            {user.role === 'business' ? (
              <BusinessOptions />
            ) : (
              <CandidateOptions />
            )}
          </div>
          <MenubarItem onClick={signOut}>Sair</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

const BusinessOptions = () => {
  return (
    <>
      <MenubarItem>
        <Link to="/criar-emprego">Criar emprego</Link>
      </MenubarItem>
      <MenubarItem>
        <Link to="/listar-empregos">Listar empregos</Link>
      </MenubarItem>
    </>
  );
};

const CandidateOptions = () => {
  return (
    <>
      <MenubarItem>
        <Link to="/criar-emprego">Perfil</Link>
      </MenubarItem>
    </>
  );
};
