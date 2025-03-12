import { useForm } from 'react-hook-form';
import type { RouterInput } from '@packages/trpc';
import { trpc } from 'lib/trpc';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userService } from '@/services/user.service';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type LoginBody = RouterInput['auth']['businessLogin'];

export function BusinessLogin() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<LoginBody>({
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (data: LoginBody) => {
    try {
      const user = await trpc.auth.businessLogin.mutate(data);
      userService.setUser(user)
      navigate("/")
    } catch (e) {
      toast.error(e.message)
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
        type="text"
        placeholder="Digite sua senha"
        className="mt-2"
        {...register('password')}
      />
      <Button type="submit" className="mt-2">Logar</Button>
    </form>
  );
}
