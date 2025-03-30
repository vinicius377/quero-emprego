import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { trpc } from '@/lib/trpc';
import { Role } from '@packages/types/enums';
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
            {user.role === Role.business && (
              <BusinessOptions />
            )}
            {user.role === Role.candidate && (
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
        <Link className="w-full h-full" to="/criar-emprego">Criar post</Link>
      </MenubarItem>
      <MenubarItem>
        <Link className="w-full h-full" to="/listar-empregos">Listar posts</Link>
      </MenubarItem>
    </>
  );
};

const CandidateOptions = () => {
  return (
    <>
      <MenubarItem>
        <Link className="w-full h-full" to="/perfil">Perfil</Link>
      </MenubarItem>
    </>
  );
};