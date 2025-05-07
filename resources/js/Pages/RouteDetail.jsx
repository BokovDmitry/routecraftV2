import { usePage } from '@inertiajs/react';
import { Container } from 'react-bootstrap';
import Navbar from '../Components/Navbar';
import '../../css/RouteDetail.css';

export default function RouteDetail({ route }) {
  const { title, days, description, likes, user, image } = route;

  return (
    <>
      <Navbar />
      <section className="route-detail-section">
        <Container className="route-detail-container">
          <h1 className="route-title">{title}</h1>
          <p className="route-meta">
            {days} days | by {user?.name ?? 'Unknown Author'}
          </p>

          <img
            src={image ? `/storage/${image}` : '/images/default.jpg'}
            alt={title}
            className="route-detail-image"
          />

          <p className="route-description">{description}</p>

          <p className="route-likes"> {likes} likes</p>
        </Container>
      </section>
    </>
  );
}
