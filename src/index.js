import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Memos from './pages/Memos/Memos';
import MemoDetail from './pages/Memos/MemoDetail';
import ErrorArchive from './pages/ErrorArchive/ErrorArchive';
import ErrorDetail from './pages/ErrorArchive/ErrorDetail';
import Mypage from './pages/Mypage';
import NewMemo from './pages/Memos/NewMemo';
import NewError from './pages/ErrorArchive/NewError';
import MusicList from './pages/MusicList';
import EditMemo from './pages/Memos/EditMemo';
import MyWork from './pages/MyWork';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFound/>,
    children: [
      {index: true, element: <Home/>},
      {path: '/home', element: <Home/>},
      {path: '/memos', element: <Memos/>},
      {path: '/memos/new', element: <NewMemo/>},
      {path: '/memos/:id', element: <MemoDetail/>},
      {path: '/memos/edit/:id', element: <EditMemo/>},
      {path: '/errorarchive', element: <ErrorArchive/>},
      {path: '/errorarchive/new', element: <NewError/>},
      {path: '/errorarchive/:id', element: <ErrorDetail/>},
      {path: '/mywork', element: <MyWork/>},
      {path: '/music', element: <MusicList/>},
      {path: '/mypage', element: <Mypage/>},
    ]

  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
