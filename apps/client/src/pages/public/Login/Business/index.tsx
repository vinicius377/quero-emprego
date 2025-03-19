import { useForm } from 'react-hook-form';
import type { RouterInput } from '@packages/trpc';
import { trpc } from 'lib/trpc';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userService } from '@/services/user.service';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginValidator } from '@packages/validators/auth/login';
import { zodResolver } from '@hookform/resolvers/zod';

type LoginBody = RouterInput['auth']['businessLogin'];

export function BusinessLogin() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(loginValidator),
  });

  const onSubmit = async (data: LoginBody) => {
    try {
      const user = await trpc.auth.businessLogin.mutate(data);
      userService.setUser(user);
      navigate('/');
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="Digite seu numero"
        {...register('phoneNumber')}
      />
      <Input
        type="password"
        placeholder="Digite sua senha"
        className="mt-2"
        {...register('password')}
      />

      <div className="max-w-[25rem] m-auto flex w-full">
        <Button type="submit" className="mt-2 w-full">
          Logar
        </Button>
      </div>
    </form>
  );
}
