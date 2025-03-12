import { trpc } from 'lib/trpc';
import type { RouterInput } from '@packages/trpc';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { PrivateRoute } from '@/components/PrivateRoute';

type CreateJobInput = RouterInput['jobAdvert']['create'];

function CreateJobAdvertComponent() {
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
        <Input {...register('title')} placeholder="Digite um título" />
        <Input
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

export const CreateJobAdvert = PrivateRoute(<CreateJobAdvertComponent />, "business")
