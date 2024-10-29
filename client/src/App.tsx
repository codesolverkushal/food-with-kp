import './App.css'
import MainLayout from './MainLayout';
import Login from './pages/auth/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    // children:[
    //   {
    //     path:"/logiin"
    //   }
    // ]
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<SignUp/>
  }
])
function App() {


  return (
    <>
      <RouterProvider router={appRouter}>
        
      </RouterProvider>
    </>
  )
}

export default App
