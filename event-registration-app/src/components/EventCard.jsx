import React from "react";
import { useNavigate } from "react-router-dom";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="event-card">
      <div className="event-card-header">
        <h3 className="event-title">{event.name}</h3>
      </div>
      <div className="event-card-body">
        <p className="event-info">
          <span className="event-label">📅 Date:</span>
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </p>
        <p className="event-info">
          <span className="event-label">📍 Location:</span>
          <span>{event.location}</span>
        </p>
        {event.description && (
          <p className="event-description">{event.description}</p>
        )}
      </div>
      <div className="event-card-footer">
        <button className="register-btn" onClick={handleRegister}>
          View Details & Register
        </button>
      </div>
    </div>
  );
};

export default EventCard;
