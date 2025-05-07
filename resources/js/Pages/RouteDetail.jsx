import { usePage } from '@inertiajs/react';
import { Container } from 'react-bootstrap';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../../css/RouteDetail.css';
import background from '../../assets/bg25.jpg';

export default function RouteDetail({ route }) {
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div className="route-detail-hero" style={{ backgroundImage: `url(${background})` }}>
                <div className="route-detail-hero-overlay" />

                <div className="hero-content px-3">
                    <p className="hero-subtitle py-3">ROUTE DETAIL</p>
                    <h1 className="hero-title py-2">{route.title}</h1>
                    <p className="hero-description py-1">
                        This is the individual route page where you can see full details, like the route, and check out user reviews.
                    </p>
                </div>
            </div>

            {/* Main Content Section */}
            <main>
                <Container className="py-5">

                </Container>
            </main>

            <Footer />
        </>
    );
}
