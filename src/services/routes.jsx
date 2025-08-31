import { createBrowserRouter , useNavigate } from 'react-router-dom';
import React , {useStae , useEffect} from 'react'
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/Login'
import SignUpPage from '../pages/SignUpPage'
import LoadingPage from '../components/Loading'
import { SignedIn, SignedOut, RedirectToSignIn, RedirectToUserProfile , useAuth , useUser } from '@clerk/clerk-react';
import ProtectedRoute from './Authentication'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path:'/login',
    element: <LoginPage />
  },
  {
    path: '/sign-up',
    element: <SignUpPage />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
]);

export default router;
