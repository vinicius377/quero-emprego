import { useForm } from 'react-hook-form';
import type { RouterInput } from '@packages/trpc';
import { trpc } from 'lib/trpc';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type CreateBusiness = RouterInput['business']['create'];

export function SignUpBusiness() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CreateBusiness>({
    defaultValues: {
      location: {
        city: 'Mucambo',
        postalCode: 62170000,
        state: 'CE',
      },
    },
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
    } catch (e) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className="font-medium">Dados</h3>
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
          <Input
            placeholder="Digite o seu número"
            {...register('phoneNumber')}
          />
          <Input placeholder="Digite a sua senha" type="password" {...register('password')} />
        </div>
      </div>
      <div className="my-2">
        <h3 className="font-medium">Endereço</h3>
        <div className="space-y-2 ml-2">
          <Input
            {...register('location.neighborhood')}
            placeholder="Digite o bairro"
          />
          <Input
            {...register('location.address')}
            placeholder="Digite o endereço"
          />
          <Input
            {...register('location.number')}
            placeholder="Digite o número"
          />
          <div className="flex gap-2">
            <Input {...register('location.postalCode')} disabled />
            <Input {...register('location.city')} disabled />
            <Input {...register('location.state')} disabled />
          </div>
        </div>
      </div>
      <Button type="submit">Criar</Button>
    </form>
  );
}
