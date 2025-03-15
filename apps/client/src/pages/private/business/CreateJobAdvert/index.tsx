import { trpc } from 'lib/trpc';
import type { RouterInput } from '@packages/trpc';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { PrivateRoute } from '@/components/shared/PrivateRoute';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <Input {...register('title')} placeholder="Digite um título" />
        <Input
          {...register('remuneration')}
          placeholder="Digite a remuneração"
        />
        <div>
          <Textarea
            {...register('description')}
            placeholder="Digite uma descrição"
            className="w-full p-2 border border-[#c4c4c4] resize-none rounded"
          />
        </div>
        <Button type="submit">Criar</Button>
      </form>
    </section>
  );
}

export const CreateJobAdvert = (
  <PrivateRoute role="business">
    <CreateJobAdvertComponent />{' '}
  </PrivateRoute>
);
