import Cookies from 'universal-cookie';
import type { RouterOutput } from '@packages/trpc';
import { atom } from 'jotai';
import { store } from '@/lib/jotai';

type TokenData = RouterOutput['auth']['businessLogin'];

class UserService {
  private cookie = new Cookies();
  private key = 'user';
  private _user = atom(this.cookie.get(this.key) as TokenData | null);

  get user() {
    return this._user
  }

  setUser(user: TokenData) {
    store.set(this._user, user);
    return this.cookie.set(this.key, user, { expires: user.expires });
  }
  
  remove() {
    store.set(this._user, null);
    this.cookie.remove(this.key)
  }
}

export const userService = new UserService();
