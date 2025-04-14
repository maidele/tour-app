import React, { useEffect, useState } from "react"; //

import TourCard from "./TourCard";

//
const Gallery = ({ tours, setTours, onRemove }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTours = async () => {
    try {
      const response = await fetch("https://api.example.com/tours");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTours(data);
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTours();
    }, [setTours]);
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
      }
    useEffect(() => {
        fetchTours();
  }, [setTours]);
    //Loading message while fetching tours
  if (loading) {
    return <div>Loading...</div>;
  }
    // Error message in case their is a failure when fetching tours 
    if (error) {
        return <div>{error}</div>;
      }    

  if(tours.length === 0) {
    return <div>No tours available</div>;
  }

  return (
    <div className="gallery">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} onRemove={onRemove} />
      ))}
    </div>
  );
}
export default Gallery;