import background from '../../assets/bg14.jpg';
import '../../css/RoutesHero.css';
import { useState } from 'react';
import iconDefault from '../../assets/add.png';
import iconHover from '../../assets/plus.png';
import iconRemove from '../../assets/remove.png';


function RoutesHero() {
  const [places, setPlaces] = useState(['']);
  const [error, setError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [cityError, setCityError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [countryError, setCountryError] = useState('');
  const [cityError, setCityError] = useState('');


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

  const validateText = (value, setter, field) => {
    if (value.trim() === '') {
      setter(`Please enter ${field}.`);
    } else {
      setter('');
    }
  };

  const validateNumber = (value, setter, field) => {
    if (value.trim() === '') {
      setter(`Please enter ${field}.`);
    } else if (isNaN(Number(value)) || Number(value) <= 0) {
      setter(`${field} must be a positive number.`);
    } else {
      setter('');
    }
  };

  const removePlace = (index) => {
    const updated = places.filter((_, i) => i !== index);
    if (updated.length === 0 || updated[updated.length - 1].trim() !== '') {
      setPlaces([...updated, '']);
    } else {
      setPlaces([...updated]);
    }
  };

  const handleSearch = () => {
    const query = {
      ...formData,
      must_see_places: places.slice(0, -1), 
    };

    if(formData.destination_city.trim() === '')
    {
      setCityError('Please enter City.')
      return 
    }
    else
      setCityError('')
    

    if(formData.destination_country.trim() === '') 
    {
      setCountryError('Please enter Country')
      return
    }
    else
      setCountryError('')

    Inertia.get(route('routes.search'), query, {
      onError: (errors) => {
        console.error(errors);
      },
    });
  };

  return (
    <div className="routes-hero" style={{ backgroundImage: `url(${background})` }}>
      <div className="routes-hero-overlay" />

      <div className="routes-hero-text" style={{ flexGrow: 1 }}>
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
              placeholder="Enter country"
              onChange={(e) => setCountry(e.target.value)}
            />
            <div className="error-text">{countryError || ' '}</div>
          </div>
          <div className="input-block">
            <label>City</label>
            <input
              type="text"
              placeholder="Enter city"
              onChange={(e) => setCity(e.target.value)}
            />
            <div className="error-text">{cityError || ' '}</div>
          </div>

          <div className="input-block">
            <label>Days</label>
            <input type="number" placeholder="e.g. 5" />
          </div>
          <div className="input-block">
            <label>Budget (€)</label>
            <div className='input-block-budget'>
              <input
                type="number"
                name="budget_min"
                placeholder="Min budget"
                value={formData.budget_min}
                onChange={handleInputChange}
                className='input-budget'
              />
              <input
                type="number"
                name="budget_max"
                placeholder="Max budget"
                value={formData.budget_max}
                onChange={handleInputChange}
                className='input-budget'
              />
            </div>
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

        <div className="places-and-search">
          <div className="added-places">
            {places.slice(0, -1).map((place, index) => (
              <div key={index} className="place-tag">
                {place}
                <button
                  className="remove-btn-img"
                  onClick={() => removePlace(index)}
                  title="Remove"
                >
                  <img src={iconRemove} alt="Remove" className="remove-icon" />
                </button>
              </div>
            ))}
          </div>


          <div className="search-btn-container">
            <button className="search-btn" onClick={handleSearch}>SEARCH</button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default RoutesHero;
