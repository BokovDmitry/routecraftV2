import Navbar from '../Components/Navbar';
import RoutesHero from '../Components/RoutesHero';
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import RouteCard from '../Components/RouteCard';
import '../../css/Routes.css';
import '../../css/PopularRoutes.css'; 

function Routes({ routes }) {
  return (
    <>
      <Navbar />
      <RoutesHero />

      <section className="popular-section py-5 px-4"> 
        <h2 className="text-center mb-16 section-title">Available Routes</h2>

        <Container>
          <Row className="justify-content-center g-3 mb-4">
            {routes.slice(0, 3).map(route => (
              <RouteCard key={route.id} route={route} />
            ))}
          </Row>
          <Row className="justify-content-center g-3">
            {routes.slice(3).map(route => (
              <RouteCard key={route.id} route={route} />
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Routes;
