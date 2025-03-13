import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { RouterInput } from '@packages/trpc';
import { trpc } from 'lib/trpc';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type CreateCandidate = RouterInput['candidate']['create'];

export function SignUpCandidate() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CreateCandidate>();

  const onSubmit = async (data: CreateCandidate) => {
    try {
      const createdCandidate = await trpc.candidate.create.mutate({
        password: data.password,
        description: data.description,
        title: data.title,
        phoneNumber: data.phoneNumber,
        name: data.name,
        birthDate: new Date(),
      });

      toast.success(
        `Bem vindo ${createdCandidate.name}, faça o login`,
      );
      navigate('/login/empresa');
    } catch (e) {}
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className="font-semibold">Dados pessoais</h3>
        <div className="space-y-2">
          <Input {...register('name')} placeholder="Digite seu nome" />
          <Input
            {...register('description')}
            placeholder="Digite uma descrição"
          />
          <Input {...register('title')} placeholder="Digite um título" />
          <Input {...register('password')} type="password" placeholder="Digite uma senha" />
          <Input {...register('phoneNumber')} placeholder="Digite seu número" />
        </div>
      </div>
      <Button className="mt-2" type="submit">Criar</Button>
    </form>
  );
}
