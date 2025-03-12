import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { trpc } from '@/lib/trpc';
import { userService } from 'services/user.service';
import Cookies from 'universal-cookie';

export function MenuUser() {
  const user = userService.user;
  const cookie = new Cookies();

  const signOut = () => {
    trpc.auth.signOut.mutate().then(() => cookie.remove('user'));
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{user.name.split(' ')[0]}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Configurações</MenubarItem>
          <MenubarItem onClick={signOut}>Sair</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
