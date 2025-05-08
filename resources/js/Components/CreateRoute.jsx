import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';
import '../../css/CreateRoute.css';
import iconAddBlack from '../../assets/add.png';
import iconAddWhite from '../../assets/plus.png';
import iconRemove from '../../assets/remove.png';


export default function CreateRoute() {
    const [formData, setFormData] = useState({
        title: '',
        destination_country: '',
        destination_city: '',
        description: '',
        budget: '',
        days: ''
    });

    const [stops, setPlacesPerDay] = useState([]);
    const [hovered, setHovered] = useState(null);
    const [isDaysLocked, setIsDaysLocked] = useState(false);
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'days') {
            const daysCount = parseInt(value, 10);
            if (!isNaN(daysCount) && daysCount > 0) {
                setPlacesPerDay(Array.from({ length: daysCount }, () => ({ places: [''], error: '' })));
                setIsDaysLocked(true); 
            } else {
                setPlacesPerDay([]);
                setIsDaysLocked(false); 
            }
        }


    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('destination_country', formData.destination_country);
        formDataToSend.append('destination_city', formData.destination_city);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('budget', formData.budget);
        formDataToSend.append('days', formData.days);
        formDataToSend.append('stops', JSON.stringify(stops));
        if (image) {
            formDataToSend.append('image', document.getElementById('routeImage').files[0]);
        }
    
        try {
            const response = await axios.post('/routes', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Route created successfully:', response.data);
            alert('Route created successfully!');
            // Redirect to /my-routes
            window.location.href = '/my-routes';
        } catch (error) {
            console.error('Error creating route:', error.response?.data || error.message);
            alert('Failed to create route. Please try again.');
        }
    };

    const handleDayPlaceChange = (dayIndex, index, value) => {
        const updated = [...stops];
        updated[dayIndex].places[index] = value;
        if (value.trim() !== '') {
            updated[dayIndex].error = '';
        }
        setPlacesPerDay(updated);
    };

    const addPlaceToDay = (dayIndex) => {
        const updated = [...stops];
        const last = updated[dayIndex].places[updated[dayIndex].places.length - 1];
        if (last.trim() !== '') {
            updated[dayIndex].places.push('');
            updated[dayIndex].error = '';
        } else {
            updated[dayIndex].error = 'Please enter a place before adding another.';
        }
        setPlacesPerDay(updated);
    };

    const removePlaceFromDay = (dayIndex, index) => {
        const updated = [...stops];
        updated[dayIndex].places.splice(index, 1);
        setPlacesPerDay(updated);
    };

    const removeDayCard = (dayIndex) => {
        const updated = [...stops];
        updated.splice(dayIndex, 1);
        setPlacesPerDay(updated);
    };

    const addNewDayCard = () => {
        setPlacesPerDay([...stops, { places: [''], error: '' }]);
    };


    return (
        <>
            <Navbar />
            <section className="create-route-section py-5">
                <Container>
                    <h2 className="text-center mb-4 section-title">Create New Route</h2>

                    <Form.Group className="mb-4">
                        <Form.Label className="upload-label">Route Image</Form.Label>
                        <div className="custom-file-upload-wrapper">
                            <input
                                type="file"
                                accept="image/*"
                                id="routeImage"
                                onChange={handleImageChange}
                                className="d-none"
                            />
                            <label htmlFor="routeImage" className="btn btn-upload-custom">
                                Upload Image
                            </label>
                        </div>
                        {image && (
                            <div className="upload-preview mt-3">
                                <img src={image} alt="Route Preview" />
                            </div>
                        )}
                    </Form.Group>



                    <Form onSubmit={handleSubmit} className="route-form">
                        <Form.Group className="mb-4">
                            <Form.Label>Route Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Enter route title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Row className="mb-4">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="destination_country"
                                        placeholder="Enter country"
                                        value={formData.destination_country}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="destination_city"
                                        placeholder="Enter city"
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
                                placeholder="Describe your route"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Row className="mb-4">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Budget (€)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="budget"
                                        placeholder="e.g. 500"
                                        value={formData.budget}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Number of Days</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="days"
                                        placeholder="e.g. 7"
                                        value={formData.days}
                                        onChange={handleChange}
                                        readOnly={isDaysLocked}
                                    />

                                </Form.Group>
                            </Col>
                        </Row>

                        <div
                            className={`day-cards-wrapper ${stops.length > 0 ? 'expand' : 'collapse'}`}
                        >
                            {stops.length > 0 && (
                                <div className="day-cards-container fade-in-smooth">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="mb-0">Daily Plan</h4>
                                        <Button variant="dark" size="sm" onClick={addNewDayCard}>
                                            Add Day
                                        </Button>
                                    </div>

                                    <Row>
                                        {stops.map((day, dayIndex) => (
                                            <Col key={dayIndex} md={4} className="mb-4 fade-in">
                                                <div className="day-card p-3 d-flex flex-column">
  <div className="day-card-content">
    <h5 className="text-center mb-3">Day {dayIndex + 1}</h5>

    <div className="places-input-group mb-2">
      <Form.Control
        type="text"
        placeholder="e.g. Big Ben"
        value={day.places[day.places.length - 1]}
        onChange={(e) =>
          handleDayPlaceChange(dayIndex, day.places.length - 1, e.target.value)
        }
      />
      <button
        className="add-btn-img"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          addPlaceToDay(dayIndex);
        }}
        onMouseEnter={() => setHovered(dayIndex)}
        onMouseLeave={() => setHovered(null)}
      >
        <img
          src={hovered === dayIndex ? iconAddWhite : iconAddBlack}
          alt="Add"
          className="add-icon"
        />
      </button>
    </div>
    <div className="error-text">{day.error || ' '}</div>

    <div className="added-places mt-3">
      {day.places.slice(0, -1).map((place, index) => (
        <div key={index} className="place-tag">
          {place}
          <button
            className="remove-btn-img"
            onClick={() => removePlaceFromDay(dayIndex, index)}
          >
            <img src={iconRemove} alt="Remove" className="remove-icon" />
          </button>
        </div>
      ))}
    </div>
  </div>

  {/* Прижатая кнопка */}
  <div className="text-end mt-3">
    <Button
      variant="outline-danger"
      size="sm"
      onClick={() => removeDayCard(dayIndex)}
    >
      Delete Day
    </Button>
  </div>
</div>

                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            )}

                        </div>

                        <div className="text-center mt-4">
                            <Button variant="success" type="submit" className="px-5">
                                Save Route
                            </Button>
                        </div>
                    </Form>

                </Container>
            </section>
        </>
    );
}
