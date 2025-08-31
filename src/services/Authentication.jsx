import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth, useUser, SignedIn } from '@clerk/clerk-react';
import LoadingPage from '../components/Loading';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();
  const {user} = useUser()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/login");
    }
  }, [isSignedIn, isLoaded]);

    if(!isLoaded) return (<LoadingPage />)
    return <SignedIn>{children}</SignedIn>;
};

export default ProtectedRoute
