import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Container, Row, Form } from 'react-bootstrap';
import RouteCard from '../Components/RouteCard';
import { Link } from '@inertiajs/inertia-react';
import bgImage from '../../assets/bg18.jpg';
import searchIcon from '../../assets/icons/search.png';

import '../../css/MyRoutes.css';

export default function MyRoutes({ routes, user }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');

    const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
    const handleSort = (e) => setSortOption(e.target.value);

    const filteredRoutes = routes
        .filter((route) => route.title.toLowerCase().includes(searchTerm))
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

            {/* Hero Section */}
            <div className="my-routes-hero" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="my-routes-hero-overlay" />

                <div className="hero-content px-3">
                    <p className="hero-subtitle py-3">MY TRAVEL ROUTES</p>
                    <h1 className="hero-title py-2">MANAGE YOUR ROUTES</h1>
                    <p className="hero-description py-1">
                        View and manage the routes you've created — add new or edit existing ones.
                        <br />
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

                        {filteredRoutes.length > 0 ? (
                            <>
                                <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mb-5 routes-controls">
                                    <Form.Control
                                        type="text"
                                        className="search-bar"
                                        placeholder="Search my routes..."
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

                                <Row className="justify-content-center g-4">
                                    {filteredRoutes.map((route) => (
                                        <RouteCard key={route.id} route={route} currentUser={user} showControls={true} isMyRoutesPage={true}/>
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
