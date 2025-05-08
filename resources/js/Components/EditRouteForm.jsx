import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import iconAddBlack from "../../assets/add.png";
import iconAddWhite from "../../assets/plus.png";
import iconRemove from "../../assets/remove.png";
import "../../css/CreateRoute.css";

export default function EditRouteForm({ existingRoute }) {
    const [formData, setFormData] = useState({
        title: existingRoute.title || "",
        destination_country: existingRoute.destination_country || "",
        destination_city: existingRoute.destination_city || "",
        description: existingRoute.description || "",
        budget: existingRoute.budget || "",
        days: existingRoute.days || "",
    });

    // const [stops, setStops] = useState([]);
    const [hovered, setHovered] = useState(null);
    const [imagePreview, setImagePreview] = useState(
        existingRoute.image ? `/storage/${existingRoute.image}` : null
    );
    const [imageFile, setImageFile] = useState(null);

    const [stops, setStops] = useState([]);

    useEffect(() => {
        if (Array.isArray(existingRoute.stops)) {
            console.log("Existing stops:", existingRoute.stops);
            const stopsWithInputs = existingRoute.stops.map((places) => ({
                places: Array.isArray(places)
                    ? [...places.filter((p) => p.trim() !== ""), ""]
                    : [""], // Default to an empty array if places is not valid
                error: "",
            }));
            console.log("Stops with inputs:", stopsWithInputs);
            setStops(stopsWithInputs);
        }
    }, [existingRoute.stops]);

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            days: stops.length, // Update the days field based on the number of stops
        }));
    }, [stops]);


    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        // Flatten the stops array and append each day as an array
        stops.forEach((day, index) => {
            const filteredPlaces = day.places.filter(
                (place) => place.trim() !== ""
            );
            filteredPlaces.forEach((place) => {
                formDataToSend.append(`stops[${index}][]`, place);
            });
        });

        if (imageFile) {
            formDataToSend.append("image", imageFile);
        }

        try {
            const response = await axios.post(
                `/routes/${existingRoute.id}/update`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert("Route updated successfully!");
            // Redirect to /routes
            window.location.href = "/my-routes";
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.error("Validation errors:", error.response.data.errors);
                alert("Validation failed. Please check your input.");
            } else {
                alert("Failed to update route.");
                console.error(error);
            }
        }
    };

    const handleDayPlaceChange = (dayIndex, index, value) => {
        const updated = [...stops];
        updated[dayIndex].places[index] = value;
        if (value.trim() !== "") updated[dayIndex].error = "";
        setStops(updated);
    };

    const addPlaceToDay = (dayIndex) => {
        const updated = [...stops];
        const last =
            updated[dayIndex].places[updated[dayIndex].places.length - 1];
        if (last.trim() !== "") {
            updated[dayIndex].places.push("");
        } else {
            updated[dayIndex].error =
                "Please enter a place before adding another.";
        }
        setStops(updated);
    };

    const removePlaceFromDay = (dayIndex, index) => {
        const updated = [...stops];
        updated[dayIndex].places.splice(index, 1);
        setStops(updated);
    };

    const removeDayCard = (dayIndex) => {
        const updated = [...stops];
        updated.splice(dayIndex, 1);
        setStops(updated);
    };

    const addNewDayCard = () => {
        setStops([...stops, { places: [""], error: "" }]);
    };

    return (
        <section className="create-route-section py-5">
            <Container>
                <h2 className="text-center mb-4 section-title">Edit Route</h2>

                <Form.Group className="mb-4">
                    <Form.Label>Route Image</Form.Label>
                    <div className="custom-file-upload-wrapper">
                        <input
                            type="file"
                            accept="image/*"
                            id="routeImage"
                            onChange={handleImageChange}
                            className="d-none"
                        />
                        <label
                            htmlFor="routeImage"
                            className="btn btn-upload-custom"
                        >
                            Upload Image
                        </label>
                    </div>
                    {imagePreview && (
                        <div className="upload-preview mt-3">
                            <img src={imagePreview} alt="Route Preview" />
                        </div>
                    )}
                </Form.Group>

                <Form onSubmit={handleSubmit} className="route-form">
                    <Form.Group className="mb-4">
                        <Form.Label>Route Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Group className="mb-4">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="destination_country"
                                    value={formData.destination_country}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-4">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="destination_city"
                                    value={formData.destination_city}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-4">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Group className="mb-4">
                                <Form.Label>Budget (€)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Days</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="days"
                                    value={formData.days}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="day-cards-wrapper">
                        {stops.length === 0 && (
                            <div className="text-center mb-4">
                            <Button variant="dark" size="sm" onClick={addNewDayCard}>
                                Add Day
                            </Button>
                            </div>
                        )}

                        {stops.length > 0 && (
                            <>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="mb-0">Daily Plan</h4>
                                <Button variant="dark" size="sm" onClick={addNewDayCard}>
                                Add Day
                                </Button>
                            </div>
                                <Row>
                                    {stops.map((day, dayIndex) => (
                                        <Col
                                            key={dayIndex}
                                            md={4}
                                            className="mb-4"
                                        >
                                            <div className="day-card p-3">
                                                <h5 className="text-center mb-3">
                                                    Day {dayIndex + 1}
                                                </h5>

                                                <div className="places-input-group mb-2">
                                                    <Form.Control
                                                        type="text"
                                                        value={
                                                            day.places[
                                                                day.places
                                                                    .length - 1
                                                            ] || ""
                                                        }
                                                        onChange={(e) =>
                                                            handleDayPlaceChange(
                                                                dayIndex,
                                                                day.places
                                                                    .length - 1,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <button
                                                        className="add-btn-img"
                                                        type="button"
                                                        onClick={() =>
                                                            addPlaceToDay(
                                                                dayIndex
                                                            )
                                                        }
                                                        onMouseEnter={() =>
                                                            setHovered(dayIndex)
                                                        }
                                                        onMouseLeave={() =>
                                                            setHovered(null)
                                                        }
                                                    >
                                                        <img
                                                            src={
                                                                hovered ===
                                                                dayIndex
                                                                    ? iconAddWhite
                                                                    : iconAddBlack
                                                            }
                                                            alt="Add"
                                                            className="add-icon"
                                                        />
                                                    </button>
                                                </div>

                                                <div className="error-text">
                                                    {day.error || " "}
                                                </div>

                                                <div className="added-places mt-3">
                                                    {day.places
                                                        .filter(
                                                            (p, i) =>
                                                                i !==
                                                                    day.places
                                                                        .length -
                                                                        1 &&
                                                                p.trim() !== ""
                                                        )
                                                        .map((place, index) => (
                                                            <div
                                                                key={index}
                                                                className="place-tag"
                                                            >
                                                                {place}
                                                                <button
                                                                    className="remove-btn-img"
                                                                    onClick={() =>
                                                                        removePlaceFromDay(
                                                                            dayIndex,
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <img
                                                                        src={
                                                                            iconRemove
                                                                        }
                                                                        alt="Remove"
                                                                        className="remove-icon"
                                                                    />
                                                                </button>
                                                            </div>
                                                        ))}
                                                </div>

                                                <div className="text-end mt-3">
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() =>
                                                            removeDayCard(
                                                                dayIndex
                                                            )
                                                        }
                                                    >
                                                        Delete Day
                                                    </Button>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </>
                        )}
                    </div>

                    <div className="text-center mt-4">
                        <Button
                            variant="success"
                            type="submit"
                            className="px-5"
                        >
                            Update Route
                        </Button>
                    </div>
                </Form>
            </Container>
        </section>
    );
}
