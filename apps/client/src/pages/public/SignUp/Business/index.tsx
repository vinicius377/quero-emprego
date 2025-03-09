import { useForm } from 'react-hook-form';
import type { RouterInput } from '@packages/trpc';
import { trpc } from 'lib/trpc';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type CreateBusiness = RouterInput['business']['create'];

export function SignUpBusiness() {
  const navigate = useNavigate()
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
      toast.success(`Bem vindo ${createdBusiness.responsableName}, faça o login`)
      navigate("/login/empresa")
    } catch (e) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <span>Dados</span>
        <input placeholder="Digite o CNPJ" {...register('cnpj')} />
        <input placeholder="Digite o seu número" {...register('phoneNumber')} />
        <input placeholder="Digite a sua senha" {...register('password')} />
        <input
          placeholder="Digite o nome da sua empresa"
          {...register('businessName')}
        />
        <input
          placeholder="Digite o nome do responsável"
          {...register('responsableName')}
        />
      </div>
      <div>
        <span>Endereço</span>
        <input
          {...register('location.city')}
          placeholder="Digite o nome da cidade"
          disabled
        />
        <input {...register('location.state')} disabled />
        <input {...register('location.number')} placeholder="Digite o número" />
        <input {...register('location.postalCode')} disabled />
        <input
          {...register('location.neighborhood')}
          placeholder="Digite o bairro"
        />
        <input
          {...register('location.address')}
          placeholder="Digite o endereço"
        />
      </div>
      <button type="submit">Criar</button>
    </form>
  );
}
