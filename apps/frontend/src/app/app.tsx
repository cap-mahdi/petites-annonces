import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRoutes } from 'react-router-dom';
import { routes } from '../routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function App() {
  const element = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        {element}
      </div>
    </QueryClientProvider>
  );
}

export default App;
