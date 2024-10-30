import MainLayout from './MainLayout';
import Login from './pages/auth/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
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
  },
  {
    path:"/forgot-password",
    element:<ForgotPassword/>
  },
  {
    path:"/reset-password",
    element:<ResetPassword/>
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
