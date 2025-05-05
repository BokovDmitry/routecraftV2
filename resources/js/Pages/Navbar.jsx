import '../../css/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center px-4 px-md-5">
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
    </nav>
  );
}

export default Navbar;
