import { useState } from 'react';
import { Col, Card } from 'react-bootstrap';
import defaultBookmark from '../../assets/icons/bookmark-default.png';
import filledBookmark from '../../assets/icons/bookmark-filled.png';
import defaultImage from '../../assets/dubai.jpg';
import heartIcon from '../../assets/icons/heart.png';
import '../../css/RouteCard.css'

export default function RouteCard( {route} ) {
const [favorites, setFavorites] = useState([]);

  const handleToggleFavorite = (routeId) => {
    setFavorites((prev) =>
      prev.includes(routeId)
        ? prev.filter((id) => id !== routeId)
        : [...prev, routeId]
    );
  };
    return(
        <Col key={route.id} xs="auto">
          <Card className="route-card shadow-sm position-relative mx-auto">
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

            <Card.Img variant="top" src={route.image === null ? defaultImage : `/storage/${route.image}`} alt={route.image === null ? "No Image" : route.title} className="route-image" />

            <Card.Body className="route-info">
            <div className="d-flex justify-content-between align-items-center mb-1">
            <Card.Title as="h6" className="mb-0 route-title-truncated">{route.title}</Card.Title>
            <span className="text-muted small flex-shrink-0">{route.days} Days</span>
            </div>


              <Card.Subtitle className="mb-1 text-muted small">
                {route.user ? `by ${route.user.name}` : 'Unknown Author'}
              </Card.Subtitle>

              <div className="d-flex justify-content-between align-items-start mt-2">
                {route.description ? (
                <Card.Text className="route-description mb-0 flex-grow-1 me-2 text-truncate">
                  {route.description}
                </Card.Text>
                ) : (
                  <span className="route-description text-muted small">&nbsp;</span>
                )}
                <div className="d-flex align-items-center likes-section ms-2">
                  <img src={heartIcon} alt="likes" className="heart-icon me-1" />
                  <span className="small likes-count">{route.likes}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
    )
}