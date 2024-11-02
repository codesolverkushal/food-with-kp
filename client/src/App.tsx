import Login from './pages/auth/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import Navbar from './components/realComponent/Navbar';
const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Navbar/>,
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
  },
  {
    path:"/verify-email",
    element:<VerifyEmail/>
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
