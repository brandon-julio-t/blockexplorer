import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import BlockDetailPage from './pages/Blocks/[id]';
import Dashboard from './pages/Dashboard';
import TransactionDetailPage from './pages/Transactions/[id]';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/blocks/:id',
    element: <BlockDetailPage />,
  },
  {
    path: '/transactions/:id',
    element: <TransactionDetailPage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto my-4">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
