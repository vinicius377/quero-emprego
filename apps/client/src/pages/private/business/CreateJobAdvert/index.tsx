import { trpc } from 'lib/trpc';
import type { RouterInput } from '@packages/trpc';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { PrivateRoute } from '@/components/shared/PrivateRoute';
import { Button } from '@/components/ui/button';
import JoditEditor from 'jodit-react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { createJobAdvertValidator } from "@packages/validators/job/create-job-advert"
import { zodResolver } from "@hookform/resolvers/zod"

type CreateJobInput = RouterInput['jobAdvert']['create'];

function CreateJobAdvertComponent() {
  const editor = useRef(null);
  const { register, handleSubmit, watch, setValue, reset } = useForm({
    resolver: zodResolver(createJobAdvertValidator)
  });

  const onSubmit = async (data: CreateJobInput) => {
    try {
      await trpc.jobAdvert.create.mutate({
        title: data.title,
        description: data.description,
        remuneration: data.remuneration,
      });
      toast.success("Emprego criado")
      reset()
    } catch (e) {
      toast.error(e.message)
    }
  };

  return (
    <section>
      <h1 className="font-semibold text-xl mb-2">
        Criar uma postagem de emprego
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <Input {...register('title')} placeholder="Digite um título" />
        <Input
          {...register('remuneration')}
          type="number"
          placeholder="Digite a remuneração"
        />
        <JoditEditor
          ref={editor}
          value={watch('description')}
          onChange={(newContent) => setValue('description', newContent)}
        />
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
