import { useForm } from 'react-hook-form';
import type { RouterInput } from '@packages/trpc';
import { trpc } from 'lib/trpc';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { userService } from 'services/user.service';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAtomValue } from 'jotai';

type LoginBody = RouterInput['auth']['businessLogin'];

export function CandidateLogin() {
  const user = useAtomValue(userService.user)
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<LoginBody>({
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (data: LoginBody) => {
    try {
      const user = await trpc.auth.candidateLogin.mutate(data);
      userService.setUser(user)
      navigate("/")
    } catch(e) {
      toast.error(e.message)
    }
  };

  useEffect(() => {
    if (user) navigate("/")
  }, [user, navigate])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="Digite seu numero"
        {...register('phoneNumber')}
      />
      <Input
        type="text"
        className="mt-2"
        placeholder="Digite sua senha"
        {...register('password')}
      />

      <Button className="mt-2" type="submit">Logar</Button>
    </form>
  );
}
