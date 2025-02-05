import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'expo-router';
import { useNavigationContainerRef } from '@react-navigation/native';

import { useAppSelector } from '@/store';
import Loader from './Loader';

interface AuthState {
  user: any;
  loading: boolean;
}

const publicRoutes = ['/login', '/register'];

export default function withAuth<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<T>
) {
  return function ProtectedComponent(props: T) {
    const [isMounted, setIsMounted] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const navigationRef = useNavigationContainerRef();

    const { user, loading } = useAppSelector(
      (state: { auth: AuthState }) => state.auth
    );

    useEffect(() => {
      setIsMounted(true);
    }, []);

    useEffect(() => {
      if (
        isMounted &&
        !user &&
        !publicRoutes.includes(pathname) &&
        navigationRef.isReady()
      ) {
        router.replace('/login');
      }
    }, [isMounted, user, pathname, navigationRef]);

    if (loading || !isMounted) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };
}
