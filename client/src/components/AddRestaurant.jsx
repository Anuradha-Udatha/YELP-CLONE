import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

const AddRestaurant = () => {
  const { AddRestaurants } = useContext(RestaurantsContext);  // AddRestaurants from context
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      
      // Logging response to check structure
      console.log(response.data.data);

      // Ensure the correct data structure is used here
      AddRestaurants(response.data.data.Restaurant);

      // Clear input fields after adding
      setName("");
      setLocation("");
      setPriceRange("Price Range");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='mb-4'>
      <div className="row align-items-center">
        <div className="col">
          <input 
            value={name} 
            onChange={e => setName(e.target.value)} 
            type='text' 
            className='form-control' 
            placeholder='name' />
        </div>
        <div className="col">
          <input 
            value={location} 
            onChange={e => setLocation(e.target.value)} 
            type='text' 
            className='form-control' 
            placeholder='location' />
        </div>
        <div className="col">
          <select
            value={priceRange} 
            onChange={e => setPriceRange(e.target.value)}
            className='form-select'>
            <option disabled> Price Range</option>
            <option value="1"> 0-100 </option>
            <option value="2"> 100-500 </option>
            <option value="3"> 500-1000 </option>
            <option value="4"> 1000-5000</option>
            <option value="5"> 5000 and above </option>
          </select>
        </div>
        <div className="col-auto">
          <button 
            onClick={handleSubmit} 
            type="submit" 
            className="btn btn-primary"> 
            Add 
          </button>
        </div>
      </div>      
    </div>
  );
};

export default AddRestaurant;
