import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { RouterInput } from '@packages/trpc';
import { trpc } from 'lib/trpc';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCandidateValidator } from '@packages/validators/candidate/create-candidate';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker } from '@/components/ui/date-picker';
import { useMemo } from 'react';

type CreateCandidate = RouterInput['candidate']['create'];

export function SignUpCandidate() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(createCandidateValidator),
  });
  const limitBirthDate = useMemo(() => {
    const date = new Date()
    const yearsToJob = 16
    date.setFullYear(date.getFullYear() - yearsToJob)
    return date
  }, [])

  const onSubmit = async (data: CreateCandidate) => {
    try {
      const createdCandidate = await trpc.candidate.create.mutate({
        password: data.password,
        phoneNumber: data.phoneNumber,
        name: data.name,
        birthDate: data.birthDate,
      });

      toast.success(`Bem vindo ${createdCandidate.name}, faça o login`);
      navigate('/login/empresa');
    } catch (e) { }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className="font-semibold">Dados pessoais</h3>
        <div className="space-y-2">
          <Input
            {...register('name')}
            error={errors.name?.message}
            placeholder="Digite seu nome"
          />
          <Input
            {...register('phoneNumber')}
            error={errors.phoneNumber?.message}
            placeholder="Digite seu número"
          />
          <Input
            {...register('password')}
            type="password"
            placeholder="Digite uma senha"
            error={errors.password?.message}
          />
          <DatePicker
            title="Data de nascimento"
            // limiteAfter={limitBirthDate}
            selected={watch('birthDate')}
            onSelect={(date) => setValue('birthDate', date as Date)}
          />
        </div>
      </div>
      <Button className="mt-2" type="submit">
        Criar
      </Button>
    </form>
  );
}
