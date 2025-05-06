import '../../css/Footer.css';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

function Footer() {
  return (
    <footer className="footer-section py-16 px-4">
      <div className="container">
        <div className="row text-center gy-4 justify-content-center">
          <div className="col-md-4">
            <h5 className="footer-title">RouteCraft</h5>
            <ul className="list-unstyled footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/routes">Routes</Link></li>
              <li><Link href="/favorites">Favorites</Link></li>
              <li><Link href="/my-routes">My Routes</Link></li>
              <li><Link href="/about">About Us</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="footer-title">Get Inspired</h5>
            <p className="footer-text">
              Explore unique routes shared by fellow travelers. <br />
              Start planning your next journey with RouteCraft today!
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="footer-title">Follow Us</h5>
            <div className="d-flex justify-content-center gap-4">
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaFacebookF /></a>
            </div>
          </div>
        </div>
        <hr className="my-4 border-light" />
        <p className="text-center small text-light mb-0">&copy; {new Date().getFullYear()} RouteCraft. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
