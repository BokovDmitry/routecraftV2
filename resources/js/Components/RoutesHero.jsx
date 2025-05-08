  import background from '../../assets/bg14.jpg';
  import '../../css/RoutesHero.css';
  import { useState, useEffect, useRef } from 'react';
  import iconDefault from '../../assets/add.png';
  import iconHover from '../../assets/plus.png';
  import iconRemove from '../../assets/remove.png';
  import { Inertia } from '@inertiajs/inertia';
  import { Autocomplete } from '@react-google-maps/api';

  function RoutesHero() {
    const [places, setPlaces] = useState(['']);
    const [error, setError] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [countryError, setCountryError] = useState('');
    const [cityError, setCityError] = useState('');

    const [formData, setFormData] = useState({
      destination_country: '',
      destination_city: '',
      days: '',
      budget_min: '',
      budget_max: '',
    });

    const countryAutocompleteRef = useRef(null);
    const cityAutocompleteRef = useRef(null);

    const handleCountrySelect = () => {
      const place = countryAutocompleteRef.current.getPlace();
      setFormData({ ...formData, destination_country: place.formatted_address });
    };
  
    const handleCitySelect = () => {
      const place = cityAutocompleteRef.current.getPlace();
      if (place && place.address_components) {
          // Extract the city name from the address components
          const cityComponent = place.address_components.find(component =>
              component.types.includes("locality")
          );
          const cityName = cityComponent ? cityComponent.long_name : place.name;
  
          setFormData({ ...formData, destination_city: cityName });
      }
  };

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
      let isValid = true;
    
      if (formData.destination_city.trim() === '') {
        setCityError('Please enter City.');
        isValid = false;
      } else {
        setCityError('');
      }
    
      if (formData.destination_country.trim() === '') {
        setCountryError('Please enter Country.');
        isValid = false;
      } else {
        setCountryError('');
      }
    
      if (!isValid) return;
    
      const query = {
        ...formData,
        must_see_places: places.slice(0, -1),
      };
    
      Inertia.get(route('routes.search'), query, {
        onError: (errors) => {
          console.error(errors);
        },
      });
    };

    const resetFilters = () => {
      Inertia.visit(route('routes.search'), { method: 'get' });
    }
    

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
              <Autocomplete
                onLoad={(ref) => (countryAutocompleteRef.current = ref)}
                onPlaceChanged={handleCountrySelect}
              >
                <input
                  type="text"
                  name="destination_country"
                  placeholder="Enter country"
                  value={formData.destination_country}
                  onChange={handleInputChange}
                />
            </Autocomplete>
            <div className="error-text">{countryError || ' '}</div>
            </div>
            <div className="input-block">
              <label>City</label>
              <Autocomplete
                onLoad={(ref) => (cityAutocompleteRef.current = ref)}
                onPlaceChanged={handleCitySelect}
              >
                <input
                  type="text"
                  name="destination_city"
                  placeholder="Enter city"
                  value={formData.destination_city}
                  onChange={handleInputChange}
                />
              </Autocomplete>
            <div className="error-text">{cityError || ' '}</div>
            </div>

            <div className="input-block">
              <label>Days</label>
              <input 
              type="number" 
              placeholder="e.g. 5" 
              name="days"
              value={formData.days}
              onChange={handleInputChange}
              />
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
              <button className="reset-btn" onClick={resetFilters}>RESET</button>
              <button className="search-btn" onClick={handleSearch}>SEARCH</button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  export default RoutesHero;
