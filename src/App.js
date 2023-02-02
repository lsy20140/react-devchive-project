import { Outlet } from 'react-router-dom'
import SideBar from './components/SideBar';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <>
    <AuthContextProvider>
      <div className='container'>
        <SideBar/>
        <Outlet/>
      </div>

    </AuthContextProvider>

    </>
  );
}

export default App;
