import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get(`/events/${id}`);
      setEvent(response.data);
    } catch (err) {
      setError("Failed to fetch event details. Please try again.");
      console.error("Error fetching event details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate(`/register/${id}`);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>⚠️ Error</h2>
        <p>{error}</p>
        <button className="retry-btn" onClick={fetchEventDetails}>
          Retry
        </button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="error-container">
        <h2>Event Not Found</h2>
        <button className="retry-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="event-details-container">
      <div className="event-details-card">
        <div className="event-details-header">
          <h1>{event.name}</h1>
        </div>

        <div className="event-details-body">
          <div className="event-detail-row">
            <span className="detail-label">📅 Date:</span>
            <span className="detail-value">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="event-detail-row">
            <span className="detail-label">📍 Location:</span>
            <span className="detail-value">{event.location}</span>
          </div>

          {event.description && (
            <div className="event-detail-row">
              <span className="detail-label">📝 Description:</span>
              <p className="detail-description">{event.description}</p>
            </div>
          )}

          {event.availableSeats !== null &&
            event.availableSeats !== undefined && (
              <div className="event-detail-row">
                <span className="detail-label">🎫 Available Seats:</span>
                <span
                  className="detail-value"
                  style={{
                    color:
                      event.availableSeats > 50
                        ? "green"
                        : event.availableSeats > 10
                          ? "orange"
                          : "red",
                  }}>
                  {event.availableSeats} seats left
                </span>
              </div>
            )}

          {event.ticketPrice !== null && event.ticketPrice !== undefined && (
            <div className="event-detail-row">
              <span className="detail-label">💰 Ticket Price:</span>
              <span className="detail-value">${event.ticketPrice}</span>
            </div>
          )}
        </div>

        <div className="event-details-footer">
          <button className="register-btn-large" onClick={handleRegisterClick}>
            Register for this Event
          </button>
          <button className="back-btn" onClick={() => navigate("/")}>
            Back to Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
