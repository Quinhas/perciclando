import { ReactNode } from 'react';

type NavbarEndProps = {
  children: ReactNode;
};

export function NavbarEnd({ children }: NavbarEndProps) {
  return (
    <div className='flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
      {children}
    </div>
  );
}
