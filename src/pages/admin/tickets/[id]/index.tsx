import { Logo } from '@/components/logo';
import { TicketsContainer } from '@/components/tickets-container';
import ApplicationException from '@/errors/application-exception';
import { Ticket, ticketsService } from '@/services/perciclando-api/tickets';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Skeleton,
  Text,
  useToast,
} from '@chakra-ui/react';
import { toPng } from 'html-to-image';
import { Check, Share2, XCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useCallback, useEffect, useRef, useState } from 'react';
import QRCode from 'react-qr-code';

interface TicketDetailsParsedUrlQuery extends ParsedUrlQuery {
  id: string;
}

export default function TicketDetails() {
  const [ticket, setTicket] = useState<Ticket | null | undefined>(undefined);
  const [hideButtons, setHideButtons] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query as TicketDetailsParsedUrlQuery;

  const cardRef = useRef<HTMLDivElement>(null);

  const getTicketData = useCallback(async () => {
    try {
      const data = await ticketsService.getById({ id });
      setTicket(data);
    } catch (error) {
      setTicket(null);
    }
  }, [id]);

  useEffect(() => {
    getTicketData();
  }, [getTicketData]);

  async function shareTicket() {
    if (!cardRef.current || !ticket) {
      toast({
        description: 'Ingresso inválido. Tente novamente.',
        colorScheme: 'red',
        position: 'bottom',
      });
      return;
    }

    setHideButtons(true);

    const dataUrl = await toPng(cardRef.current, {
      cacheBust: false,
      quality: 0.95,
      backgroundColor: 'transparent',
      canvasWidth: 396 * 2.5,
      canvasHeight: 565 * 2.5,
    });
    const link = document.createElement('a');
    link.download = `Perciclando-${String(ticket.number).padStart(3, '0')}.png`;
    link.href = dataUrl;
    link.click();

    setHideButtons(false);
  }
  async function validateTicket() {
    try {
      if (!ticket) {
        toast({
          description: 'Ingresso inválido. Tente novamente.',
          colorScheme: 'red',
          position: 'bottom',
        });
        return;
      }

      await ticketsService.validate({
        id: ticket.id,
      });

      toast({
        description: 'Ingresso validado com sucesso!',
        colorScheme: 'green',
        position: 'bottom',
      });
    } catch (err) {
      const message =
        err instanceof ApplicationException
          ? err.message
          : 'Não foi possível validar o ingresso. Tente novamente';

      toast({
        description: message,
        colorScheme: 'red',
        position: 'bottom',
      });
    }

    setHideButtons(false);
  }

  if (ticket === undefined) {
    return (
      <TicketsContainer>
        <Flex
          bg={'transparent'}
          w={['100%', '396px']}
          p={[0, '1rem']}
        >
          <Card
            w={['100%', '380px']}
            aspectRatio={'3/4'}
            bg={'green.500'}
            textColor={'green.900'}
            position={'relative'}
          >
            <CardHeader className='space-y-0'>
              <h3 className='text-2xl font-semibold leading-none tracking-tight'>
                Perciclando - 10 Anos
              </h3>
              <Skeleton
                h={'1.5rem'}
                w={'10ch'}
                colorScheme='green'
              />
            </CardHeader>
            <CardBody>
              <div className='flex flex-col border-2 rounded border-solid border-green-600 w-full items-center justify-center p-2 gap-4 aspect-square'>
                <Skeleton
                  w={'256px'}
                  h={'256px'}
                  colorScheme='green'
                />
                <Skeleton
                  h={'1.25rem'}
                  w={'15ch'}
                  colorScheme='green'
                />
              </div>
            </CardBody>
            <CardFooter className='flex items-center justify-center'>
              <Logo className='text-3xl' />
            </CardFooter>
          </Card>
        </Flex>
      </TicketsContainer>
    );
  }

  if (ticket === null) {
    return (
      <TicketsContainer>
        <Flex
          bg={'transparent'}
          w={['100%', '396px']}
          p={[0, '1rem']}
        >
          <Card
            w={['100%', '380px']}
            aspectRatio={'3/4'}
            position={'relative'}
          >
            <CardHeader className='space-y-0'>
              <h3 className='text-2xl font-semibold leading-none tracking-tight'>
                Perciclando - 10 Anos
              </h3>
              <Text className='text-sm text-muted-foreground'>:/</Text>
            </CardHeader>
            <CardBody className='flex flex-col gap-1 items-center flex-grow justify-center'>
              <XCircle className='w-44 h-44 text-red-800 dark:text-red-300' />
              <p className='text-2xl font-medium text-red-800 dark:text-red-300'>
                Ingresso inválido!
              </p>
            </CardBody>
            <CardFooter className='flex items-center justify-center'>
              <Logo className='text-3xl' />
            </CardFooter>
          </Card>
        </Flex>
      </TicketsContainer>
    );
  }

  return (
    <TicketsContainer>
      <Flex
        bg={'transparent'}
        w={['100%', '396px']}
        p={[0, '1rem']}
        ref={cardRef}
      >
        <Card
          w={['100%', '380px']}
          aspectRatio={'3/4'}
          bg={'green.500'}
          textColor={'green.900'}
          position={'relative'}
        >
          <CardHeader className='space-y-0'>
            <h3 className='text-2xl font-semibold leading-none tracking-tight'>
              Perciclando - 10 Anos
            </h3>
            <Text className='text-sm text-muted-foreground text-green-700'>
              Ingresso #{String(ticket.number).padStart(3, '0')}
            </Text>
          </CardHeader>
          <CardBody className='flex flex-col gap-1 items-center flex-grow justify-center'>
            <div className='flex flex-col border-2 rounded border-solid border-green-600 w-full items-center justify-center p-2 gap-4 aspect-square'>
              <QRCode
                value={`${ticket.id}`}
                className='rounded w-[256px] aspect-square mx-auto'
              />
              <p className='text-center font-light'>{ticket.name}</p>
            </div>
          </CardBody>
          <CardFooter className='flex items-center justify-center'>
            <Logo className='text-3xl' />
          </CardFooter>
          {!hideButtons && (
            <>
              <Button
                onClick={() => validateTicket()}
                title='Validar Ingresso'
                colorScheme='green'
                variant={'ghost'}
                position={'absolute'}
                bottom={'0.5rem'}
                left={'0.5rem'}
                aspectRatio={1}
                p={1}
              >
                <span className='sr-only'>Validar Ingresso</span>
                <Check className='w-auto h-4' />
              </Button>

              <Button
                onClick={() => shareTicket()}
                title='Compartilhar Ingresso'
                colorScheme='green'
                variant={'ghost'}
                position={'absolute'}
                bottom={'0.5rem'}
                right={'0.5rem'}
                aspectRatio={1}
                p={1}
              >
                <span className='sr-only'>Compartilhar Ingresso</span>
                <Share2 className='w-auto h-4' />
              </Button>
            </>
          )}
        </Card>
      </Flex>
    </TicketsContainer>
  );
}
