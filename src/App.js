import { Outlet } from 'react-router-dom'
import SideBar from './components/SideBar';
import { AuthContextProvider } from './context/AuthContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <div className='container'>
          <SideBar/>
          <Outlet/>
        </div>
      </AuthContextProvider>
    </QueryClientProvider>


    </>
  );
}

export default App;
