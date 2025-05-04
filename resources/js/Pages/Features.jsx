import '../../css/Features.css';
import img1 from '../../assets/search.jpg';
import img2 from '../../assets/filter.jpg';
import img3 from '../../assets/save.jpg';
import img4 from '../../assets/share.jpg';

function Features() {
  return (
    <section className="features-section text-center py-12 px-8">
      <h2 className="features-title mb-12">What You Can Do on RouteCraft</h2>
      <div className="features-grid d-flex justify-content-center flex-wrap gap-8">
        <div className="feature-card">
          <img src={img1} alt="Search Routes" />
          <div className="feature-text">
            <h3>Search Routes</h3>
            <p>Find travel plans by destination, duration, or budget.</p>
          </div>
        </div>
        <div className="feature-card">
          <img src={img2} alt="Filter Options" />
          <div className="feature-text">
            <h3>Filter Easily</h3>
            <p>Sort routes by number of days, city, and average cost.</p>
          </div>
        </div>
        <div className="feature-card">
          <img src={img3} alt="Save Your Route" />
          <div className="feature-text">
            <h3>Plan Your Journey</h3>
            <p>Create and save routes tailored to your trip.</p>
          </div>
        </div>
        <div className="feature-card">
          <img src={img4} alt="Share Ideas" />
          <div className="feature-text">
            <h3>Share with Others</h3>
            <p>Publish your travel routes and inspire the community.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
