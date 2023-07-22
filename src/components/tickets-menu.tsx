import { Button, Card, CardBody } from '@chakra-ui/react';
import Link from 'next/link';

export function TicketsMenu() {
  return (
    <Card className='p-2 min-w-[17rem] sm:w-[17rem] w-full'>
      <CardBody className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Link href='/admin/tickets'>
            <Button
              colorScheme='blue'
              w='full'
            >
              Ingressos
            </Button>
          </Link>
          <Link href='/admin/tickets/new'>
            <Button
              colorScheme='blue'
              w='full'
            >
              Criar Ingresso
            </Button>
          </Link>
          <Link href='/admin/tickets/validate'>
            <Button
              colorScheme='blue'
              w='full'
            >
              Ler QR Code
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
