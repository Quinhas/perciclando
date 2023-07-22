import Link from 'next/link';
import { useRouter } from 'next/router';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { Navbar } from './ui/navbar';

const navigation = [
  // { name: 'Integrantes', href: 'users', current: false },
  { name: 'Ingressos', href: 'tickets' },
];

export function AdminNavbar() {
  const { pathname } = useRouter();

  return (
    <Navbar.Root>
      <Navbar.Start>
        <Navbar.Brand>
          <Link href='/admin'>
            <Logo className='h-8 w-auto transition-colors hover:text-green-600 dark:hover:text-green-200' />
          </Link>
        </Navbar.Brand>
        <Navbar.Menu>
          {navigation.map((item) => (
            <Link
              href={`/admin/${item.href}`}
              key={item.href}
            >
              <Navbar.Item
                current={item.href === `${pathname.split('/', 3)[2]}`}
              >
                {item.name}
              </Navbar.Item>
            </Link>
          ))}
        </Navbar.Menu>
      </Navbar.Start>
      <Navbar.End>
        <ThemeToggle />
      </Navbar.End>
    </Navbar.Root>
  );
}
