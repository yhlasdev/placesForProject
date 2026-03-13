import { Suspense } from 'react';
import AuthMiddleware from '../middleware/AuthMiddleware';
import { Loader } from '../shared/Loader/Loader';

export default function PageWrapper({ children }) {
  return (
    <Suspense fallback={
      <div className='flex h-screen items-center justify-center'>
        <Loader />
      </div>
    }>
      <AuthMiddleware>
        {children}
      </AuthMiddleware>
    </Suspense>
  );
};