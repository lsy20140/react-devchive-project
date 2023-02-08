import { Outlet } from 'react-router-dom'
import SideBar from './components/SideBar';
import { AuthContextProvider } from './context/AuthContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Header from './components/Header';

const queryClient = new QueryClient()

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
          <div className='container'>
            <SideBar/>
            <div className='content'>
              <Header/>
              <Outlet/>
            </div>

          </div>
      </AuthContextProvider>
    </QueryClientProvider>


    </>
  );
}

export default App;
