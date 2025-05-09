import { useState, useEffect } from "react";
import { Col, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "@inertiajs/react";
import defaultBookmark from "../../assets/icons/bookmark-default.png";
import filledBookmark from "../../assets/icons/bookmark-filled.png";
import defaultImage from "../../assets/dubai.jpg";
import heartIcon from "../../assets/icons/heart.png";
import "../../css/RouteCard.css";
import editIcon from "../../assets/icons/edit.png";
import deleteIcon from "../../assets/icons/delete.png";

export default function RouteCard({ route, currentUser, showControls = false, isMyRoutesPage = false }) {



  const [favorites, setFavorites] = useState([]);

    // Fetch saved routes when the component mounts
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get("/saved-routes");
                const savedRouteIds = response.data.map(
                    (savedRoute) => savedRoute.route_id
                );
                setFavorites(savedRouteIds);
            } catch (error) {
                console.error("Error fetching saved routes:", error);
            }
        };

        fetchFavorites();
    }, []);

    const handleToggleFavorite = async (routeId) => {
        const isFavorite = favorites.includes(routeId);

        try {
            if (isFavorite) {
                // Remove the route from favorites
                setFavorites((prev) => prev.filter((id) => id !== routeId));
                await axios.delete(`/saved-routes/${routeId}`);
                console.log("Route removed successfully");
            } else {
                // Add the route to favorites
                setFavorites((prev) => [...prev, routeId]);
                await axios.post("/saved-routes", { route_id: routeId });
                console.log("Route saved successfully");
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    return (
        <Col key={route.id} xs="auto">
            <Link
                href={`/routes/${route.id}`}
                className="text-decoration-none text-dark"
            >
                <Card
                    className={`route-card shadow-sm position-relative mx-auto ${
                        currentUser &&
                        route.user &&
                        currentUser.id === route.user.id
                            ? "has-controls"
                            : ""
                    }   ${isMyRoutesPage ? 'my-routes-card' : ''}`}
                >
                    <div
                        className="bookmark-icon"
                        onClick={(e) => {
                            e.preventDefault();
                            handleToggleFavorite(route.id);
                        }}
                        title="Add to favorites"
                    >
                        <img
                            src={
                                favorites.includes(route.id)
                                    ? filledBookmark
                                    : defaultBookmark
                            }
                            alt="bookmark"
                        />
                    </div>

                    <Card.Img
                        variant="top"
                        src={
                            route.image === null
                                ? defaultImage
                                : `/storage/${route.image}`
                        }
                        alt={route.image === null ? "No Image" : route.title}
                        className="route-image"
                    />

                    <Card.Body className="route-info">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <Card.Title
                                as="h6"
                                className="mb-0 route-title-truncated"
                            >
                                {route.title}
                            </Card.Title>
                            <span className="text-muted small flex-shrink-0">
                                {route.days} Days
                            </span>
                        </div>

                        <Card.Subtitle className="mb-1 text-muted small">
                            {route.user
                                ? `by ${route.user.name}`
                                : "Unknown Author"}
                        </Card.Subtitle>

                        <div className="d-flex justify-content-between align-items-start mt-2">
                            {route.description ? (
                                <Card.Text className="route-description mb-0 flex-grow-1 me-2 text-truncate">
                                    {route.description}
                                </Card.Text>
                            ) : (
                                <span className="route-description text-muted small">
                                    &nbsp;
                                </span>
                            )}
                            <div className="d-flex align-items-center likes-section ms-2">
                                <img
                                    src={heartIcon}
                                    alt="likes"
                                    className="heart-icon me-1"
                                />
                                <span className="small likes-count">
                                    {route.likes}
                                </span>
                            </div>
                        </div>

                        {showControls && currentUser &&
                            route.user &&
                            currentUser.id === route.user.id && (
                                <div className="d-flex justify-content-between align-items-center mt-3 route-actions">
                                    {/* Edit button right */}
                                    <Link
                                        href={`/routes/${route.id}/edit`}
                                        title="Edit Route"
                                        className="edit-button"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (
                                                confirm(
                                                    "Are you sure you want to delete this route?"
                                                )
                                            ) {
                                                try {
                                                    await axios.delete(
                                                        `/routes/${route.id}`
                                                    );
                                                    console.log(
                                                        "Route deleted successfully"
                                                    );
                                                    // Optionally, you can refresh the page or remove the route from the UI
                                                    window.location.reload(); // Refresh the page
                                                } catch (error) {
                                                    console.error(
                                                        "Error deleting route:",
                                                        error
                                                    );
                                                    alert(
                                                        "Failed to delete the route. Please try again."
                                                    );
                                                }
                                            }
                                        }}
                                        title="Delete Route"
                                        className="icon-button"
                                    >
                                        <img
                                            src={deleteIcon}
                                            alt="Delete"
                                            className="action-icon"
                                        />
                                    </button>
                                </div>
                            )}
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
}
