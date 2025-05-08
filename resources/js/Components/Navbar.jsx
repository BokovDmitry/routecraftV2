import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import '../../css/Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { url, props } = usePage(); // Access Inertia props
  const { auth } = props; // Extract the auth prop

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => (url === path ? 'active' : '');

  const logoColor = () => {
    if (windowWidth < 900 && url === '/routes') {
      return 'white';
    } else if (isMobile) {
      return '#1c1c1c';
    }
    return 'white';
  };

  return (
    <nav className="navbar custom-navbar">
      <div className="container-fluid px-4 px-md-5">
        {!isMobile && (
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center navbar-left">
              <Link
                href="/"
                className="navbar-logo me-5"
                style={{
                  textDecoration: 'none',
                  color: logoColor(),
                }}
              >
                RouteCraft
              </Link>
              <ul className="navbar-links d-flex list-unstyled mb-0">
                <li className="me-4"><Link href="/" className={isActive('/')}>Home</Link></li>
                <li className="me-4"><Link href={route('routes.index')} className={isActive('/routes')}>Routes</Link></li>
                <li className="me-4">
                <Link href={route('favorites')} className={isActive('/favorites')}>Favorites</Link>
              </li>

                <li className="me-4"><Link href="/my-routes">My Routes</Link></li>
                <li><Link href="/about">About Us</Link></li>
              </ul>
            </div>
            <div className="navbar-buttons d-flex gap-4 align-items-center">
              {auth.user ? (
                <>
                  <span className="username">{auth.user.name}</span>
                  <Link href={route('logout')} method="post" className="btn-outline">Log Out</Link>
                </>
              ) : (
                <>
                  <Link href={route('login', {}, window.Ziggy)} className="btn-outline">Log In</Link>
                  <Link href={route('register', {}, window.Ziggy)} className="btn-outline">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}

        {isMobile && (
          <div className="text-center w-100">
            <Link
              href="/"
              className="navbar-logo me-5"
              style={{
                textDecoration: 'none',
                color: logoColor(),
              }}
            >
              RouteCraft
            </Link>
            <button
              className="btn btn-sm btn-light toggle-menu mb-2"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? 'Close Menu' : 'Menu'}
            </button>

            {isMobileMenuOpen && (
              <div className="mobile-menu">
                <ul className="list-unstyled mb-3">
                  <li><Link href="/" className="d-block py-2">Home</Link></li>
                  <li><Link href={route('routes.index')} className="d-block py-2">Routes</Link></li>
                  <li>
                    <Link href={route('favorites')} className="d-block py-2">Favorites</Link>
                  </li>

                  <li><Link href="/my-routes" className="d-block py-2">My Routes</Link></li>
                  <li><Link href="/about" className="d-block py-2">About Us</Link></li>
                </ul>
                <div className="d-flex flex-column gap-2">
                  {auth.user ? (
                    <>
                      <span className="username mobile">{auth.user.name}</span>
                      <Link href={route('logout')} method="post" className="btn-outline">Log Out</Link>
                    </>
                  ) : (
                    <>
                    <Link href={route('login', {}, window.Ziggy)} className="btn-outline text-center">Log In</Link>
                    <Link href={route('register', {}, window.Ziggy)} className="btn-filled text-center">Sign Up</Link>
                  </>

                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;