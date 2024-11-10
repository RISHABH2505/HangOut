import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { places } from "../Components/data"; // Ensure this data includes both cafes and activities
import axios from 'axios';



const AIRecommendations = () => {
  const [location, setLocation] = useState("Mumbai");
  const [budget, setBudget] = useState("1000");
  const [duration, setDuration] = useState("5");
  const [loading, setLoading] = useState(false); // State to manage loading
  const navigate = useNavigate(); // Initialize the navigate function

  const generateRecommendations = async (e) => {
    e.preventDefault();
    setLoading(true)


    // const url = 'http://127.0.0.1:5000/plan_activity';
    // const params = {
    //   location: location,
    //   budget: budget,
    //   duration: duration,
    //   age_group: '16-40',
    //   categories: ''
    // };

    const queryParams = new URLSearchParams({
      location: location,
      budget: budget,
      duration: duration,
      age_group: '16-40',
      categories: ''
    }).toString();


    try {
      // const response = await axios.get(url, { params });

      // Navigate to recommendations page with the bestCombination
      navigate(`/recommendations?${queryParams}`);

    }
    catch (err) {
      console.log(err.message); // Handle errors
    } finally {
      setLoading(false); // Stop loading
    }



  };

  return (
    <form onSubmit={generateRecommendations} className="space-y-6 p-8">
      {!loading && (
        <h2 className="text-2xl font-bold text-center text-[#4A4947] mb-4">
          Plan Your Perfect Day
        </h2>
      )}
      {loading ? (
        <div className="loading-container">
          <div className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <p className="mt-4 text-lg text-[#4A4947]">Loading your plan...</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <div className="input-container">
            <label htmlFor="location" className="block text-lg font-semibold text-[#4A4947]">Location</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="border-b-2 border-[#B17457] w-full h-12 focus:outline-none focus:border-[#4A4947]"
              placeholder="Enter your location"
            />
          </div>
          <div className="input-container">
            <label htmlFor="budget" className="block text-lg font-semibold text-[#4A4947]">Budget (₹)</label>
            <input
              id="budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
              className="border-b-2 border-[#B17457] w-full h-12 focus:outline-none focus:border-[#4A4947]"
              placeholder="Enter your budget"
            />
          </div>
          <div className="input-container">
            <label htmlFor="duration" className="block text-lg font-semibold text-[#4A4947]">Duration (hrs)</label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="border-b-2 border-[#B17457] w-full h-12 focus:outline-none focus:border-[#4A4947]"
              placeholder="Enter duration"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#B17457] to-[#4A4947] text-white text-lg font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity duration-200"
          >
            Generate Plan
          </button>
        </div>
      )}
    </form>
  );
};

export default AIRecommendations;