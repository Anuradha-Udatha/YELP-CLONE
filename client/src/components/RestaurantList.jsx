import React, { useEffect, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating"; // Import StarRating component

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        console.log(response.data.data.Restaurants);
        setRestaurants(response.data.data.Restaurants);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [setRestaurants]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => {
        return restaurant.id !== id;
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`restaurants/${id}`);
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col" className="bg-primary">Restaurant</th>
            <th scope="col" className="bg-primary">Location</th>
            <th scope="col" className="bg-primary">Price Range</th>
            <th scope="col" className="bg-primary">Ratings</th>
            <th scope="col" className="bg-primary">Edit</th>
            <th scope="col" className="bg-primary">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>
                    <StarRating rating={restaurant.average_rating} /> {/* Pass average_rating */}
                  </td>
                  <td>
                    <button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">
                      Update
                    </button>
                  </td>
                  <td>
                    <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
