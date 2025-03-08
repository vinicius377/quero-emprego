import type { RouterInput } from '@packages/trpc';
import { trpc } from 'lib/trpc';
import { useForm } from 'react-hook-form';

type CreateCandidate = RouterInput['candidate']['create'];

export function SignUpCandidate() {
  const { register, handleSubmit } = useForm<CreateCandidate>();

  const onSubmit = async (data: CreateCandidate) => { 
    try {
      const createdCandidate = await trpc.candidate.create.mutate({
        password: data.password,
        description: data.description,
        title: data.title,
        phoneNumber: data.phoneNumber,
        name: data.name,
        birthDate: new Date()
      })
    } catch (e) {

    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <span>Dados pessois</span>
        <input {...register('name')} placeholder="Digite seu nome" />
        <input
          {...register('description')}
          placeholder="Digite uma descrição"
        />
        <input {...register('title')} placeholder="Digite um título" />
        <input {...register('password')} placeholder="Digite uma senha" />
        <input {...register('phoneNumber')} placeholder="Digite seu número" />
      </div>
      <button type="submit">Criar</button>
    </form>
  );
}
