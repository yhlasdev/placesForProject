import { Suspense } from 'react';
import { Loader } from '../shared/Loader/Loader';

export default function PageWrapperNoAuth({ children }) {
  return (
    <Suspense fallback={
      <div className=' flex h-screen items-center justify-center '>
        <Loader />
      </div>}>
      {children}
    </Suspense>
  );
};