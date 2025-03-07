import { trpc } from "./lib/trpc";
import { RoutePages } from "./Routes";

function App() {
  const create = () => {
    trpc.business.edit.mutate()
  };

  return (
    <div className="content">
      <RoutePages />
      <button onClick={create}>asdasd</button>
    </div>
  );
}

export default App;
