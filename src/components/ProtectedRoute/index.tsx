import React,{useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../store/slices/userSlice';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { Suspense } from 'react';
import { checkSession } from 'src/services/userServices/authServices';

const ProtectedRoute: React.FC = ({ children }) => {
  // const [isSessionValid, setIsSessionValid] = useState(true);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const [isMounted, setIsMounted] = useState(true);

  // const verifySession = async () => {
  //   const isValid = await checkSession();
  //   if (isMounted) {
  //     setIsSessionValid(isValid);
  //   }
  // };

  // useEffect(() => {
  //   verifySession();
  //   return () => {
  //     setIsMounted(false);
  //   };
  // }, []);


  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<SuspenseLoader />}>
      {children}
    </Suspense>
  );
};
export default ProtectedRoute;