import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import * as React from 'react';

import {queryConfig} from '@/lib/react-query';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({children}: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );
  return (
    <React.Suspense>
      <QueryClientProvider client={queryClient}>
        {import.meta.env.DEV && <ReactQueryDevtools />}
        {children}
      </QueryClientProvider>
    </React.Suspense>
  );
};
