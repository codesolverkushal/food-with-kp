import Login from './pages/auth/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import HeroSection from './components/realComponent/HeroSection';
import MainLayout from './layout/MainLayout';
import Profile from './components/realComponent/Profile';
import SearchPage from './components/realComponent/SearchPage';
import RestaurantDetail from './components/realComponent/RestaurantDetail';
import Cart from './components/realComponent/Cart';
import Restaurant from './admin/Restaurant';
const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:<HeroSection/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/search/:text",
        element:<SearchPage/>
      },
      {
        path:"/restaurant/:id",
        element:<RestaurantDetail/>
      },
      {
        path:"/cart",
        element:<Cart/>
      },
      {
        path:"/admin/restaurant",
        element:<Restaurant/>
      },
     
    ]
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
