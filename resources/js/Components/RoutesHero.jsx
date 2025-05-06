import background from '../../assets/bg4.jpg';
import '../../css/RoutesHero.css';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import iconDefault from '../../assets/add.png';
import iconHover from '../../assets/plus.png';

function RoutesHero() {
  const [places, setPlaces] = useState(['']);
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    destination_country: '',
    destination_city: '',
    days: '',
    budget_min: '',
    budget_max: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceChange = (index, value) => {
    const updated = [...places];
    updated[index] = value;
    setPlaces(updated);

    if (value.trim() !== '') {
      setError('');
    }
  };

  const addPlace = () => {
    const lastPlace = places[places.length - 1].trim();
    if (lastPlace !== '') {
      setPlaces([...places, '']);
      setError('');
    } else {
      setError('Please enter a place before adding another.');
    }
  };

  const handleSearch = () => {
    const query = {
      ...formData,
      must_see_places: places.slice(0, -1), // Exclude the last empty input
    };

    Inertia.get(route('routes.search'), query, {
      onError: (errors) => {
        console.error(errors);
      },
    });
  };

  return (
    <div className="routes-hero" style={{ backgroundImage: `url(${background})` }}>
      <div className="routes-hero-overlay" />

      <div className="routes-hero-text">
        <h1>FIND THE PERFECT ROUTE FOR YOUR TRIP</h1>
        <p>
          Search by destination, number of days, budget, and the must-see places you don’t want to miss.
        </p>
      </div>

      <div className="routes-form-wrapper">
        <h3 className="form-subheading">Plan your route below</h3>

        <div className="input-row">
          <div className="input-block">
            <label>Country</label>
            <input
              type="text"
              name="destination_country"
              placeholder="Enter country"
              value={formData.destination_country}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-block">
            <label>City</label>
            <input
              type="text"
              name="destination_city"
              placeholder="Enter city"
              value={formData.destination_city}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-block">
            <label>Days</label>
            <input
              type="number"
              name="days"
              placeholder="e.g. 5"
              value={formData.days}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-block">
            <label>Budget (€)</label>
            <input
              type="number"
              name="budget_min"
              placeholder="Min budget"
              value={formData.budget_min}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="budget_max"
              placeholder="Max budget"
              value={formData.budget_max}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-block">
            <label>Must-See Places</label>
            <div className="places-input-group">
              <input
                type="text"
                placeholder="e.g. Eiffel Tower"
                value={places[places.length - 1]}
                onChange={(e) => handlePlaceChange(places.length - 1, e.target.value)}
              />
              <button
                className="add-btn-img"
                onClick={addPlace}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={isHovered ? iconHover : iconDefault}
                  alt="Add"
                  className="add-icon"
                />
              </button>
            </div>
            {<div className={`error-text ${error ? '' : 'hidden'}`}>{error || ' '}</div>}
          </div>
        </div>

        <div className="added-places">
          {places.slice(0, -1).map((place, index) => (
            <div key={index} className="place-tag">
              {place}
            </div>
          ))}
        </div>

        <div className="search-btn-container">
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoutesHero;