import Navbar from '../Components/Navbar';
import RoutesHero from '../Components/RoutesHero';
import React, { useState } from 'react';
import { Container, Row, Form, InputGroup } from 'react-bootstrap';
import RouteCard from '../Components/RouteCard';
import '../../css/Routes.css';
import '../../css/PopularRoutes.css'; 
import searchIcon from '../../assets/icons/search.png'; 

function Routes({ routes }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleSort = (e) => setSortOption(e.target.value);

  const filteredRoutes = routes
    .filter(route => route.title.toLowerCase().includes(searchTerm))
    .sort((a, b) => {
      switch (sortOption) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'date-asc':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'date-desc':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'days-asc':
          return a.days - b.days;
        case 'days-desc':
          return b.days - a.days;
        case 'likes-asc':
          return a.likes - b.likes;
        case 'likes-desc':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  return (
    <>
      <Navbar />
      <RoutesHero />

      <section className="popular-section py-5 px-4"> 
        <h2 className="text-center mb-16 section-title">Available Routes</h2>

        <Container>
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mb-5 routes-controls">

        <Form.Control
        type="text"
        className="search-bar"
        placeholder="Search routes..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ backgroundImage: `url(${searchIcon})` }}
      />



  <div className="d-flex align-items-center">
    <span className="sort-text">Sort by:</span>
    <Form.Select
      className="sort-dropdown"
      value={sortOption}
      onChange={handleSort}
      aria-label="Sort routes"
    >
      <option value="">Default</option>
      <option value="title-asc">Title (A-Z)</option>
      <option value="title-desc">Title (Z-A)</option>
      <option value="date-asc">Date (Oldest First)</option>
      <option value="date-desc">Date (Newest First)</option>
      <option value="days-asc">Days (Ascending)</option>
      <option value="days-desc">Days (Descending)</option>
      <option value="likes-asc">Likes (Ascending)</option>
      <option value="likes-desc">Likes (Descending)</option>
    </Form.Select>
  </div>
</div>

          <Row className="justify-content-center g-3 mb-4">
            {filteredRoutes.slice(0, 3).map(route => (
              <RouteCard key={route.id} route={route} />
            ))}
          </Row>
          <Row className="justify-content-center g-3">
            {filteredRoutes.slice(3).map(route => (
              <RouteCard key={route.id} route={route} />
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Routes;