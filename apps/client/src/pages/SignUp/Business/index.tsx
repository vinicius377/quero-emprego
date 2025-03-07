import { useForm } from 'react-hook-form';
import type { RouterInput } from '@packages/trpc';
import { trpc } from '../../../lib/trpc';

type CreateBusiness = RouterInput['business']['create'];

export function SignUpBusiness() {
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
      const createdUser = await trpc.business.create.mutate({
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

      console.log(createdUser);
    } catch (e) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <span>Dados</span>
        <input type="text" placeholder="Digite o CNPJ" {...register('cnpj')} />
        <input
          type="text"
          placeholder="Digite o seu número"
          {...register('phoneNumber')}
        />
        <input
          type="text"
          placeholder="Digite a sua senha"
          {...register('password')}
        />
        <input
          type="text"
          placeholder="Digite o nome da sua empresa"
          {...register('businessName')}
        />
        <input
          type="text"
          placeholder="Digite o nome do responsável"
          {...register('responsableName')}
        />
      </div>
      <div>
        <span>Endereço</span>
        <input
          type="text"
          {...register('location.city')}
          placeholder="Digite o nome da cidade"
          disabled
        />
        <input type="text" {...register('location.state')} disabled />
        <input
          type="text"
          {...register('location.number')}
          placeholder="Digite o número"
        />
        <input type="text" {...register('location.postalCode')} disabled />
        <input
          type="text"
          {...register('location.neighborhood')}
          placeholder="Digite o bairro"
        />
        <input
          type="text"
          {...register('location.address')}
          placeholder="Digite o endereço"
        />
      </div>
      <button type="submit">Criar</button>
    </form>
  );
}
