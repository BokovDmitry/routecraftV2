import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Container, Button, Row, Form } from 'react-bootstrap'; // Add Form here
import RouteCard from '../Components/RouteCard';
import { Link } from '@inertiajs/inertia-react';
import bgImage from '../../assets/bg18.jpg'; 

import '../../css/MyRoutes.css'; 

export default function MyRoutes({ routes }) {
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div
                className="my-routes-hero"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="my-routes-hero-overlay" />

                <div className="hero-content px-3">
                    <p className="hero-subtitle py-3">MY TRAVEL ROUTES</p>
                    <h1 className="hero-title py-2">MANAGE YOUR ROUTES</h1>
                    <p className="hero-description py-1">
                    View and manage the routes you've created — add new or edit existing ones.<br />
                    Keep your travel plans organized and up to date.
                    </p>


                    <Link href="/routes/create" className="hero-button">
                        Create New Route
                    </Link>
                </div>
            </div>


            <main>
  <section className="my-routes-section py-5 px-4">
    <Container>
      <h2 className="section-title text-center">My Created Routes</h2>

      {routes.length > 0 ? (
        <>
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mb-5 routes-controls">
            <Form.Control
              type="text"
              className="search-bar"
              placeholder="Search my routes..."
              // Optional search logic
            />
            <div className="d-flex align-items-center">
              <span className="sort-text">Sort by:</span>
              <Form.Select
                className="sort-dropdown"
                // Optional sort logic
              >
                <option value="">Default</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="date-desc">Date (Newest First)</option>
              </Form.Select>
            </div>
          </div>

          <Row className="justify-content-center g-4">
            {routes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </Row>
        </>
      ) : (
        <p className="no-routes-text text-center mt-5">
          You have no routes yet. Start by creating one!
        </p>
      )}
    </Container>
  </section>
</main>


            <Footer />
        </>
    );
}
