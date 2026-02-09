import React, { useState, useEffect } from "react";
import API from "../services/api";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import "./Home.css";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get("/events");
      setEvents(response.data);
    } catch (err) {
      setError(
        "Unable to load events. Please ensure the backend server is running.",
      );
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>⚠️ Error</h2>
        <p>{error}</p>
        <button className="retry-btn" onClick={fetchEvents}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Upcoming Events</h1>
        <p>Discover and register for amazing events</p>
      </div>

      {events.length === 0 ? (
        <div className="no-events">
          <p>No events available at the moment.</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
