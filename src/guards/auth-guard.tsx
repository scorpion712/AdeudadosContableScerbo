import { ReactNode, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
   
import { paths } from '../routes/paths'; 
import { useRouter } from '../hooks';
import { useAuth } from '../hooks/useAuth';

export const AuthGuard = (props: { children: ReactNode | ReactNode []; }) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [checked, setChecked] = useState(false);

  // allowed routes without authentication
  const allowedRoutes = [
    paths.auth.login,
  ];

  const check = useCallback(() => {
    if (!isAuthenticated && !allowedRoutes.includes(window.location.pathname)) {
      const searchParams = new URLSearchParams({ returnTo: window.location.pathname }).toString();
      const href = paths.auth.login + `?${searchParams}`;
      router.replace(href, {});
    } else {
      setChecked(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, router]);

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(
    () => {
      check();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
