import { ReactNode } from 'react';

type NavbarStartProps = {
  children: ReactNode;
};

export function NavbarStart({ children }: NavbarStartProps) {
  return (
    <div className='flex flex-1 max-sm:flex-row-reverse max-sm:items-center max-sm:justify-center items-stretch justify-start'>
      {children}
    </div>
  );
}
