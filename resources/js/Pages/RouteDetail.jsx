import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../../css/RouteDetail.css';
import background from '../../assets/bg25.jpg';
import defaultImage from '../../assets/dubai.jpg'; 

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
    console.log(route);

    return (
        <>
            <Navbar />
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
                        <Col md={7}>
                            <h2 className="route-title">{title}</h2>
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
                        </Col>


                    </Row>

                    <Row className="mt-4">
                        <Row className="mt-4">
                            <Col>
                                <p className="route-description-full">{description}</p>
                            </Col>
                        </Row>

                    </Row>

                    <hr className="my-5" />

                    {parsedPlaces.length > 0 && (
                        <>
                            <h3 className="daily-stops-heading">Daily Stops</h3>
                            <Row className="daily-stops-row">

                                {parsedPlaces.map((day, dayIndex) => (
                                    <Col key={dayIndex} md={4} className="mb-4">
                                        <div className="day-card p-3 h-100">
                                            <h5 className="mb-3">Day {dayIndex + 1}</h5>
                                            <ul>
                                                {Array.isArray(day.places) &&
                                                    day.places.map((place, index) => (
                                                        <li key={index}>{place}</li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    )}
                </Container>
            </main>


            <Footer />
        </>
    );
}
