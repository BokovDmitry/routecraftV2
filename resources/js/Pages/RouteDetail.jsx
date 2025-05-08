import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../../css/RouteDetail.css';
import background from '../../assets/bg25.jpg';
import defaultImage from '../../assets/dubai.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import defaultBookmark from '../../assets/icons/bookmark-default.png';
import filledBookmark from '../../assets/icons/bookmark-filled.png';
import heartDefault from '../../assets/icons/heart-default.png';
import heartFilled from '../../assets/icons/heart-filled.png';

export default function RouteDetail({ route }) {
    const {
        image,
        title,
        destination_country: country,
        destination_city: city,
        description,
        budget,
        days,
        stops
    } = route;

    const parsedPlaces = Array.isArray(stops)
        ? stops.map((places) => ({ places }))
        : [];

    const [favorites, setFavorites] = useState([]);
    const [liked, setLiked] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const fetchFavorites = async () => {
            try {
                const response = await axios.get('/saved-routes');
                const savedIds = response.data.map((r) => r.route_id);
                setFavorites(savedIds);
            } catch (error) {
                console.error('Error fetching saved routes:', error);
            }
        };

        fetchFavorites();
    }, []);

    const toggleLike = () => setLiked(!liked);

    const handleToggleFavorite = async (routeId) => {
        const isFavorite = favorites.includes(routeId);
        try {
            if (isFavorite) {
                setFavorites((prev) => prev.filter((id) => id !== routeId));
                await axios.delete(`/saved-routes/${routeId}`);
            } else {
                setFavorites((prev) => [...prev, routeId]);
                await axios.post('/saved-routes', { route_id: routeId });
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    return (
        <>
            <Navbar />

            {isMounted && (
                <div className="route-detail-hero" style={{ backgroundImage: `url(${background})` }}>
                    <div className="route-detail-hero-overlay" />
                    <div className="hero-content px-3">
                        <p className="hero-subtitle py-3">ROUTE DETAIL</p>
                        <h1 className="hero-title py-2">{title}</h1>
                        <p className="hero-description py-1">
                            This is the individual route page where you can see full details, like the route, and check out user reviews.
                        </p>
                    </div>
                </div>
            )}

            <main>
                <Container className="py-5">
                    <Row className="route-info-section">
                        <Col md={5}>
                            <img
                                src={image ? `/storage/${image}` : defaultImage}
                                alt="Route"
                                className="route-detail-image w-100"
                            />
                        </Col>
                        <Col md={7} className="d-flex flex-column justify-content-between">
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2 className="route-title mb-0">{title}</h2>
                                    <span
                                        className="bookmark-circle"
                                        title="Add to favorites"
                                        onClick={() => handleToggleFavorite(route.id)}
                                    >
                                        <img
                                            src={favorites.includes(route.id) ? filledBookmark : defaultBookmark}
                                            alt="bookmark"
                                        />
                                    </span>
                                </div>

                                <p className="route-meta">
                                    Created by <strong>{route.user?.name ?? 'Unknown'}</strong> on{' '}
                                    {route.user?.created_at
                                        ? new Date(route.user.created_at).toLocaleDateString()
                                        : 'Unknown date'}
                                </p>

                                {route.updated_at && route.created_at && route.updated_at !== route.created_at && (
                                    <p className="route-meta">
                                        Last updated: {new Date(route.updated_at).toLocaleDateString()}
                                    </p>
                                )}

                                <div className="route-details-list">
                                    <p><strong>Country:</strong> {country}</p>
                                    <p><strong>City:</strong> {city}</p>
                                    <p><strong>Budget:</strong> €{budget}</p>
                                    <p><strong>Days:</strong> {days}</p>
                                </div>
                            </div>

                            <div className="like-section mt-auto align-self-end d-flex align-items-center">
                                <span className="like-text me-3">Liked: </span>
                                <img
                                    src={liked ? heartFilled : heartDefault}
                                    alt="like icon"
                                    className="like-icon"
                                    onClick={toggleLike}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col>
                            <p className="route-description-full">{description}</p>
                        </Col>
                    </Row>

                    <hr className="my-5" />

                    {parsedPlaces.length > 0 && (
                        <>
                            <h3 className="daily-stops-heading">Daily Stops</h3>
                            <Row className="daily-stops-row">
                                {parsedPlaces.map((day, dayIndex) => {
                                    const validPlaces = day.places.filter(place => place.trim() !== '');
                                    if (validPlaces.length === 0) return null;

                                    return (
                                        <Col key={dayIndex} md={4} className="mb-4">
                                            <div className="day-card p-3 h-100">
                                                <h5 className="mb-3">Day {dayIndex + 1}</h5>
                                                <ul>
                                                    {validPlaces.map((place, index) => (
                                                        <li key={index}>{place}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </>
                    )}
                </Container>
            </main>

            <Footer />
        </>
    );
}
