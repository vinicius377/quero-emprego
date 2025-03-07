import { useForm } from 'react-hook-form';
import type { RouterInput } from '@packages/trpc';
import { trpc } from '../../lib/trpc';

type LoginBody = RouterInput['auth']['businessLogin'];

export function Login() {
  const { register, handleSubmit } = useForm<LoginBody>({
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (data: LoginBody) => {
    try {
      console.log(data);
      const user = await trpc.auth.businessLogin.mutate(data);
      console.log(user);
    } catch {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Digite seu numero"
        {...register('phoneNumber')}
      />
      <input
        type="text"
        placeholder="Digite sua senha"
        {...register('password')}
      />

      <button type="submit">Logar</button>
    </form>
  );
}
