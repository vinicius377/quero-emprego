import { useForm } from 'react-hook-form';
import type { RouterInput } from '@packages/trpc';

type CreateBusiness = RouterInput['business']['create'];

export function SignUpBusiness() {
  const { register, handleSubmit } = useForm<CreateBusiness>();

  const onSubmit = (data: CreateBusiness) =>{

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <span>Dados</span>
        <input type="text" {...register('cnpj')} />
        <input type="text" {...register('phoneNumber')} />
        <input type="text" {...register('password')} />
        <input type="text" {...register('businessName')} />
      </div>
      <div>
        <span>Endereço</span>
        <input
          type="text"
          {...register('location.city')}
          value="Mucambo"
          disabled
        />
        <input type="text" {...register('location.state')} />
        <input type="text" {...register('location.number')} />
        <input
          type="text"
          {...register('location.postalCode')}
          value="62170000"
          disabled
        />
        <input type="text" {...register('location.neighborhood')} />
      </div>
      <button type="submit">Criar</button>
    </form>
  );
}
