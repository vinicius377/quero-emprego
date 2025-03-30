import { useForm } from 'react-hook-form';
import type { RouterInput } from '@packages/trpc';
import { trpc } from 'lib/trpc';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createBusinessValidator } from '@packages/validators/business/create-business';
import { zodResolver } from '@hookform/resolvers/zod';

type CreateBusiness = RouterInput['business']['create'];

export function SignUpBusiness() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      location: {
        city: 'Mucambo',
        postalCode: 62170000,
        state: 'CE',
      },
    },
    resolver: zodResolver(createBusinessValidator),
  });

  const onSubmit = async (data: CreateBusiness) => {
    try {
      const createdBusiness = await trpc.business.create.mutate({
        cnpj: data.cnpj,
        password: data.password,
        businessName: data.businessName,
        phoneNumber: data.phoneNumber,
        responsableName: data.responsableName,
        location: {
          city: data.location.city,
          state: data.location.state,
          number: data.location.number,
          address: data.location.address,
          postalCode: data.location.postalCode,
          neighborhood: data.location.neighborhood,
        },
      });
      toast.success(
        `Bem vindo ${createdBusiness.responsableName}, faça o login`,
      );
      navigate('/login/empresa');
    } catch (e) {
      toast.error(e.message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className="font-semibold">Dados</h3>
        <div className="space-y-2 ml-2">
          <Input
            placeholder="Digite o nome da sua empresa"
            {...register('businessName')}
          />
          <Input
            placeholder="Digite o nome do responsável"
            {...register('responsableName')}
          />
          <Input placeholder="Digite o CNPJ" {...register('cnpj')} />
          <div className="flex gap-2">
            <Input
              placeholder="Digite o seu número"
              {...register('phoneNumber')}
            />
            <Input
              placeholder="Digite a sua senha"
              type="password"
              {...register('password')}
            />
          </div>
        </div>
      </div>
      <div className="my-2">
        <h3 className="font-semibold">Endereço</h3>
        <div className="space-y-2 ml-2">
          <Input
            {...register('location.address')}
            placeholder="Digite o endereço"
          />
          <div className="flex gap-2">
            <Input
              {...register('location.neighborhood')}
              placeholder="Digite o bairro"
              className="w-full"
            />

            <Input
              {...register('location.number')}
              placeholder="Digite o número"
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Input styleField={{ flex: 2 }} {...register('location.postalCode')} disabled />
            <Input styleField={{ flex: 2 }} {...register('location.city')} disabled />
            <Input styleField={{ flex: 1 }} {...register('location.state')} disabled />
          </div>
        </div>
      </div>
      <Button type="submit">Criar</Button>
    </form>
  );
}