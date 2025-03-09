import { QueryClientProvider } from '@tanstack/react-query';
import { RoutePages } from './pages/Routes';
import { queryClient } from 'lib/queryClient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer theme="colored"/>
      <RoutePages />
    </QueryClientProvider>
  );
}

export default App;
