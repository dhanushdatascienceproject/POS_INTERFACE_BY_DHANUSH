import React, { useState } from 'react';
import '../styles/ServicesList.css'; // Import the CSS file for styling

const services = [
  { id: 1, name: 'Fitness Class', price: 25 },
  { id: 2, name: 'Therapy Session', price: 50 },
  { id: 3, name: 'Workshop', price: 30 },
  { id: 4, name: 'Nutrition Consultation', price: 20 },
  { id: 5, name: 'Yoga Class', price: 15 },
];

const ServicesList = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  // Filter and search services
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'below30' && service.price < 30) ||
      (priceFilter === '30andabove' && service.price >= 30);

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="services-list-container">
      <h2 className="services-title">Select Services</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Price Filter */}
      <div className="price-filter">
        <label htmlFor="price-filter">Filter by Price:</label>
        <select
          id="price-filter"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="all">All</option>
          <option value="below30">Below $30</option>
          <option value="30andabove">30 and Above</option>
        </select>
      </div>

      {/* Services List */}
      <div className="services">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div key={service.id} className="service-card">
              <h3 className="service-name">{service.name}</h3>
              <p className="service-price">Price: ${service.price}</p>
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(service)}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">No services match your search or filter.</p>
        )}
      </div>
    </div>
  );
};

export default ServicesList;
