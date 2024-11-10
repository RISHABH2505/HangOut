import { useLocation } from "react-router-dom";
import Navbar from '../Components/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = () => {

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const locationParam = queryParams.get('location');
  const budgetParam = queryParams.get('budget');
  const durationParam = queryParams.get('duration');
  const ageGroupParam = queryParams.get('age_group');
  const categoriesParam = queryParams.get('categories');

  useEffect(() => {
    if (locationParam && budgetParam && durationParam && ageGroupParam) {
      fetchRecommendations();
    }
  }, [locationParam, budgetParam, durationParam, ageGroupParam]);


  const fetchRecommendations = async () => {
    setLoading(true);
    const url = 'http://127.0.0.1:5000/plan_activity'; // Backend API URL

    const params = {
      location: locationParam,
      budget: budgetParam,
      duration: durationParam,
      age_group: ageGroupParam,
      categories: categoriesParam || '',
    };

    try {
      const response = await axios.get(url, { params });
      console.log(response.data.recommendations.itineraries)
      setRecommendations(response.data.recommendations.itineraries)
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again later.');
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="">
      <Navbar />
      <h1 className="">
        Your Recommended Plan
      </h1>
      <div className="">
        {/* <>{JSON.stringify(recommendations)}</> */}
        <div>{recommendations.length !== 0 ? recommendations.map((itinerary, index) => (
          <>
            <h3>Itinerary {index + 1}</h3>
            {/* <>{JSON.stringify(itinerary)}</> */}
            {itinerary.places.length !== 0 ? itinerary.places.map((place, placeIndex) => (
              <>
                <h4>Place {placeIndex}</h4>
                <div>Name : {place.Name}</div>
                <div>Duration : {place.Duration}</div>
                <div>Price : {place.Price}</div>
                <div>Category : {place.Category}</div>
                <div>----------------------------------------</div>
              </>
            )) : <div>No Places</div>}
            <div>Total Duration : {itinerary.totalDuration}</div>
            <div>Total Price : {itinerary.totalPrice}</div>
            <h1>----------------------------------------------------------------</h1>
          </>
        )) : <div>No recommendations found</div>}</div>
        {/* {recommendations ? (
          recommendations.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={place.image}
                alt={place.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-[#4A4947] mb-2">{place.title}</h3>
              <p className="text-gray-600 mb-2">{place.description}</p>
              <p className="text-sm text-gray-500">
                Price: <span className="font-bold">₹{place.price}</span> | Duration: {place.duration} hrs
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No recommendations available.
          </p>
        )} */}
      </div>
    </div>
  );
};

export default Recommendations;