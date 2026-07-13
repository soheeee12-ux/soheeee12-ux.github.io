import Link from 'next/link';
import { useRouter } from 'next/router';
import TextSizeControl from './TextSizeControl';
import { site } from '../content/site';

const links = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/teaching', label: 'Teaching' },
  { href: '/cv', label: 'CV' },
];

export default function Nav() {
  const router = useRouter();

  return (
    <header className="site-header">
      <div className="nav-bar">
        <Link href="/" className="nav-bar__brand">
          {site.name}
        </Link>

        <div className="nav-bar__right">
          <TextSizeControl />
          <nav className="nav">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={router.pathname === link.href ? 'nav__link nav__link--active' : 'nav__link'}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}