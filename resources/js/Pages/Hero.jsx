import background from '../../assets/hero-bg.jpg';
import '../../css/Hero.css';

function Hero() {
  return (
    <div
      className="hero d-flex align-items-center justify-content-center text-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content px-3">
        <p className="hero-subtitle py-3">FIND, FILTER & SHARE ROUTES</p>
        <h1 className="hero-title py-2">PLAN YOUR NEXT TRIP</h1>
        <p className="hero-description py-1">
          Explore ready-made travel routes or create your own.<br />
          Filter by city, days, and budget – and share your journey with the world.
        </p>
        <button className="hero-button">Start Exploring</button>
      </div>
    </div>
  );
}

export default Hero;
