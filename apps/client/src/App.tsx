import { QueryClientProvider } from "@tanstack/react-query";
import { RoutePages } from "./pages/Routes";
import { queryClient } from "lib/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RoutePages />
    </QueryClientProvider>
  );
}

export default App;
