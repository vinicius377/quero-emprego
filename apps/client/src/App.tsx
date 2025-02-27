import './App.css';
import { trpc } from './lib/trpc';

const App = () => {

  trpc.business.createBusiness.mutate({
    location: {
      city: "tetse"
    },
    cnpj: 123123,
    phoneNumber: 123123,
    businessName: "asdasd",
    responsableName: "aaaa"
  })
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
    </div>
  );
};

export default App;
