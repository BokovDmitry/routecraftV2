import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../../css/PopularRoutes.css';
import london from '../../assets/london.jpg';
import rome from '../../assets/rome.jpg';
import dubai from '../../assets/dubai.jpg';
import RouteCard from './RouteCard'

const routes = [
  {
    id: 1,
    image: london,
    title: 'London, UK',
    days: 8,
    author: 'by Alice',
    description: 'Perfect autumn trip around historical sites and parks.',
    likes: 120,
  },
  {
    id: 2,
    image: rome,
    title: 'Rome, Italy',
    days: 10,
    author: 'by Marco',
    description: 'Explore ancient ruins and enjoy delicious Italian food.',
    likes: 150,
  },
  {
    id: 3,
    image: dubai,
    title: 'Dubai, UAE',
    days: 5,
    author: 'by Fatima',
    description: 'City of luxury, shopping, and modern architecture.',
    likes: 200,
  },
  {
    id: 4,
    image: london,
    title: 'London Museums',
    days: 3,
    author: 'by Ben',
    description: '',
    likes: 80,
  },
  {
    id: 5,
    image: rome,
    title: 'Rome Food Tour',
    days: 2,
    author: 'by Laura',
    description: '',
    likes: 90,
  },
  {
    id: 6,
    image: dubai,
    title: 'Dubai Desert',
    days: 4,
    author: 'by Ahmed',
    description: 'Unforgettable safari and cultural experiences.',
    likes: 110,
  },
];

function PopularRoutes({routes}) {
  return (
    <section className="popular-section py-5 px-4">
      <h2 className="text-center mb-16 section-title">Popular Routes This Month</h2>
      <Container>
        <Row className="justify-content-center g-3 mb-4">
          {routes.slice(0, 3).map(route => <RouteCard key={route.id} route={route} />)}
        </Row>
        <Row className="justify-content-center g-3">
          {routes.slice(3).map(route => <RouteCard key={route.id} route={route} />)}
        </Row>
      </Container>
    </section>
  );
}

export default PopularRoutes;
