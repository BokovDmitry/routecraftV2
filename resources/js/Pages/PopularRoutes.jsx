import { useState } from 'react';
import '../../css/PopularRoutes.css';
import defaultBookmark from '../../assets/icons/bookmark-default.png';
import filledBookmark from '../../assets/icons/bookmark-filled.png';
import heartIcon from '../../assets/icons/heart.png';
import london from '../../assets/london.jpg';
import rome from '../../assets/rome.jpg';
import dubai from '../../assets/dubai.jpg';

const routes = [
  {
    id: 1,
    image: london,
    title: 'London, UK',
    days: 8,
    author: 'by Alice',
    description: 'Perfect autumn trip around historical sites and parks.',
    likes: 120
  },
  {
    id: 2,
    image: rome,
    title: 'Rome, Italy',
    days: 10,
    author: 'by Marco',
    description: 'Explore ancient ruins and enjoy delicious Italian food.',
    likes: 150
  },
  {
    id: 3,
    image: dubai,
    title: 'Dubai, UAE',
    days: 5,
    author: 'by Fatima',
    description: 'City of luxury, shopping, and modern architecture.',
    likes: 200
  },
  {
    id: 4,
    image: london,
    title: 'London Museums',
    days: 3,
    author: 'by Ben',
    description: '',
    likes: 80
  },
  {
    id: 5,
    image: rome,
    title: 'Rome Food Tour',
    days: 2,
    author: 'by Laura',
    description: '',
    likes: 90
  },
  {
    id: 6,
    image: dubai,
    title: 'Dubai Desert',
    days: 4,
    author: 'by Ahmed',
    description: 'Unforgettable safari and cultural experiences.',
    likes: 110
  }
];

function PopularRoutes() {
  const [favorites, setFavorites] = useState([]);

  const handleToggleFavorite = (routeId) => {
    setFavorites((prev) =>
      prev.includes(routeId)
        ? prev.filter((id) => id !== routeId)
        : [...prev, routeId]
    );
  };

  return (
    <section className="popular-section py-5 px-4">
      <h2 className="text-center mb-5 section-title">Popular Routes This Month</h2>
      <div className="container">
        <div className="row justify-content-center g-3 mb-4">
          {routes.slice(0, 3).map(route => (
            <div className="col-auto" key={route.id}>
              <div className="route-card shadow-sm mx-auto position-relative">
                {/* Bookmark icon */}
                <div
                  className="bookmark-icon"
                  onClick={() => handleToggleFavorite(route.id)}
                  title="Add to favorites"
                >
                  <img
                    src={favorites.includes(route.id) ? filledBookmark : defaultBookmark}
                    alt="bookmark"
                  />
                </div>

                <img src={route.image} alt={route.title} className="route-image" />
                <div className="route-info">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 className="mb-0">{route.title}</h6>
                    <span className="text-muted small">{route.days} Days</span>
                  </div>
                  <div className="text-muted small mb-1">{route.author}</div>
                  <div className="d-flex justify-content-between align-items-start mt-2">
                {route.description ? (
                    <p className="route-description mb-0 flex-grow-1 me-2">{route.description}</p>
                ) : (
                    <span className="route-description text-muted small">&nbsp;</span>
                )}
                <div className="d-flex align-items-center likes-section">
                    <img src={heartIcon} alt="likes" className="heart-icon me-1" />
                    <span className="small">{route.likes}</span>
                </div>
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row justify-content-center g-3">
          {routes.slice(3).map(route => (
            <div className="col-auto" key={route.id}>
              <div className="route-card shadow-sm mx-auto position-relative">
                <div
                  className="bookmark-icon"
                  onClick={() => handleToggleFavorite(route.id)}
                  title="Add to favorites"
                >
                  <img
                    src={favorites.includes(route.id) ? filledBookmark : defaultBookmark}
                    alt="bookmark"
                  />
                </div>

                <img src={route.image} alt={route.title} className="route-image" />
                <div className="route-info">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 className="mb-0">{route.title}</h6>
                    <span className="text-muted small">{route.days} Days</span>
                  </div>
                  <div className="text-muted small mb-1">{route.author}</div>
                  <div className="d-flex justify-content-between align-items-start mt-2">
                    {route.description ? (
                        <p className="route-description mb-0 flex-grow-1 me-2">{route.description}</p>
                    ) : (
                        <span className="route-description text-muted small">&nbsp;</span> 
                    )}
                    <div className="d-flex align-items-center likes-section">
                        <img src={heartIcon} alt="likes" className="heart-icon me-1" />
                        <span className="small">{route.likes}</span>
                    </div>
                </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularRoutes;
