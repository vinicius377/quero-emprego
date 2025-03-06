import { useForm } from 'react-hook-form';
import './App.css';
import type { RouterInput } from '@packages/trpc';
import { trpc } from './lib/trpc';

type LoginBody = RouterInput['auth']['businessLogin'];

function App() {
  const { register, handleSubmit } = useForm<LoginBody>({
    defaultValues: {
      password: '',
    },
  });

  const create = () => {
    trpc.business.create.mutate({
      cnpj: '47890880000182',
      businessName: 'teste',
      responsableName: 'Vinicius',
      phoneNumber: 88992647992,
      password: 'senha123',
      location: {
        state: "CE" ,
        neighborhood: "Centro",
        postalCode: 62170000,
        address: "Rua Vicente Gomes",
        number: 22,
        city: "Mucambo"
      },
    });
  };

  const onSubmit = async (data: LoginBody) => {
    try {
      console.log(data);
      const user = await trpc.auth.businessLogin.mutate(data);
      console.log(user);
    } catch {}
  };

  return (
    <div className="content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Digite seu numero"
          {...register('phoneNumber')}
        />
        <input
          type="text"
          placeholder="Digite sua senha"
          {...register('password')}
        />

        <button type="submit">Logar</button>
      </form>
      <button onClick={create} type="button">create</button>
    </div>
  );
}

export default App;
