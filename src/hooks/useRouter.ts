import { useMemo } from 'react';
import { NavigateOptions, To, useNavigate } from 'react-router-dom';

/**
 * This is a wrapper over `react-router/useNavigate` hook.
 * We use this to help us maintain consistency between CRA and Next.js
 * 
 */
export const useRouter = () => {
  const navigate = useNavigate();

  return useMemo(() => {
    return {
      back: () => navigate(-1),
      forward: () => navigate(1),
      refresh: () => navigate(0),
      push: (href: To, options?: NavigateOptions) => navigate(href, options),
      replace: (href: To, options: NavigateOptions) => navigate(href, { ...options, replace: true }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      prefetch: (_href: To) => { },
    };
  }, [navigate]);
};
