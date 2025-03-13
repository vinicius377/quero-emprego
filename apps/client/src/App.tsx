import 'react-toastify/ReactToastify.css';
import './App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { RoutePages } from './pages/Routes';
import { queryClient } from 'lib/queryClient';
import { ToastContainer } from 'react-toastify';
import { Layout } from 'components/layout';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'jotai';
import { store } from './lib/jotai';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <ToastContainer theme="colored" />
          <Layout>
            <RoutePages />
          </Layout>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
