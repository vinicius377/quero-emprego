import { RoutePages } from "./Routes";

function App() {
  //const create = () => {
  //  trpc.business.create.mutate({
  //    cnpj: '47890880000182',
  //    businessName: 'teste',
  //    responsableName: 'Vinicius',
  //    phoneNumber: 88992647992,
  //    password: 'senha123',
  //    location: {
  //      state: 'CE',
  //      neighborhood: 'Centro',
  //      postalCode: 62170000,
  //      address: 'Rua Vicente Gomes',
  //      number: 22,
  //      city: 'Mucambo',
  //    },
  //  });
  //};

  return (
    <div className="content">
      <RoutePages />
    </div>
  );
}

export default App;
