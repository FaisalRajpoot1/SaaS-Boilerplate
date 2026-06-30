import type { JSX } from 'react';
import { RouterProvider } from 'react-router';

import { AppProviders } from '@/app/providers';
import { router } from '@/app/router';

export default function App(): JSX.Element {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
