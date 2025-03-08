import { trpc } from 'lib/trpc';
import type { RouterInput } from '@packages/trpc';
import { useForm } from 'react-hook-form';

type CreateJobInput = RouterInput['jobAdvert']['create'];

export function CreateJobAdvert() {
  const { register, handleSubmit } = useForm<CreateJobInput>();

  const onSubmit = (data: CreateJobInput) => {
    try {
      trpc.jobAdvert.create.mutate({
        title: data.title,
        description: data.description,
        remuneration: data.remuneration,
      });
    } catch (e) {}
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('title')} placeholder="Digite um título" />
        <input
          {...register('remuneration')}
          placeholder="Digite a remuneração"
        />
        <textarea
          {...register('description')}
          placeholder="Digite uma descrição"
        >
          {' '}
        </textarea>
        <button type="submit">Criar</button>
      </form>
    </section>
  );
}
