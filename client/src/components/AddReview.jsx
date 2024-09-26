import React, { useState, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddReview = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!name || !reviewText || !rating) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });

      // Update the state with the newly added review
      setSelectedRestaurant((prevState) => ({
        ...prevState,
        reviews: [...prevState.reviews, response.data.data.review],
      }));

      // Reset form fields
      setName("");
      setReviewText("");
      setRating("");
    } catch (err) {
      console.error(err);
      alert("There was an error submitting your review. Please try again.");
    }
  };

  return (
    <div className="mb-2">
      <form onSubmit={handleSubmitReview}>
        <div className="form-row mb-3">
          <div className="form-group col-8 mb-3">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4 mb-3">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
            >
              <option value="" disabled>
                Rating
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="Review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id="Review"
            className="form-control"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
