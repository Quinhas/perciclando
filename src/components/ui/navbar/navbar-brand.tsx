import { ReactNode } from 'react';

type NavbarBrandProps = {
  children: ReactNode;
};

export function NavbarBrand({ children }: NavbarBrandProps) {
  return (
    <div className='flex flex-shrink-0 items-center max-sm:flex-grow max-sm:justify-center'>
      {children}
    </div>
  );
}
