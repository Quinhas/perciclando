import { Logo } from '@/components/logo';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Menu } from 'lucide-react';
import { ReactNode } from 'react';

type NavbarMenuProps = {
  children: ReactNode;
};

export function NavbarMenu({ children }: NavbarMenuProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className='hidden sm:ml-6 sm:block'>
        <div className='flex space-x-4'>{children}</div>
      </div>
      <div className='sm:hidden'>
        <Button
          variant={'ghost'}
          colorScheme='green'
          onClick={onOpen}
        >
          <Menu />
        </Button>
      </div>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        size={'xs'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Logo />
          </DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
