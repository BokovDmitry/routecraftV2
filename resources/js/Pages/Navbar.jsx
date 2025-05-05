import { useEffect, useState } from 'react';
import '../../css/Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar custom-navbar">
      <div className="container-fluid px-4 px-md-5">
        {/* Desktop view (>900px) */}
        {!isMobile && (
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center navbar-left">
              <div className="navbar-logo me-5">RouteCraft</div>
              <ul className="navbar-links d-flex list-unstyled mb-0">
                <li className="me-4"><a href="#" className="active">Home</a></li>
                <li className="me-4"><a href="/routes">Routes</a></li>
                <li className="me-4"><a href="#">Favorites</a></li>
                <li className="me-4"><a href="#">My Routes</a></li>
                <li><a href="#">About Us</a></li>
              </ul>
            </div>
            <div className="navbar-buttons d-flex gap-2 align-items-center">
              <button className="btn-outline">Log In</button>
              <button className="btn-filled">Sign Up</button>
            </div>
          </div>
        )}

        {/* Mobile view (≤900px) */}
        {isMobile && (
          <div className="text-center w-100">
            <div className="navbar-logo mb-3">RouteCraft</div>
            <button
              className="btn btn-sm btn-light toggle-menu mb-3"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? 'Close Menu' : 'Menu'}
            </button>

            {isMobileMenuOpen && (
              <div className="mobile-menu">
                <ul className="list-unstyled mb-3">
                  <li><a href="#" className="d-block py-2">Home</a></li>
                  <li><a href="/routes" className="d-block py-2">Routes</a></li>
                  <li><a href="#" className="d-block py-2">Favorites</a></li>
                  <li><a href="#" className="d-block py-2">My Routes</a></li>
                  <li><a href="#" className="d-block py-2">About Us</a></li>
                </ul>
                <div className="d-flex flex-column gap-2">
                  <button className="btn-outline">Log In</button>
                  <button className="btn-filled">Sign Up</button>
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
