import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import "./Ticket.css";

const Ticket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTicketDetails();
  }, [ticketId]);

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get(`/tickets/${ticketId}`);
      setTicket(response.data);
    } catch (err) {
      setError("Failed to fetch ticket details.");
      console.error("Error fetching ticket:", err);
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
        <button className="retry-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="error-container">
        <h2>Ticket Not Found</h2>
        <button className="retry-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="ticket-container">
      <div className="ticket-card">
        <div className="ticket-success">
          <div className="success-icon">✓</div>
          <h1>Registration Successful!</h1>
          <p>Your ticket has been confirmed</p>
        </div>

        <div className="ticket-details">
          <h2>Ticket Information</h2>

          <div className="ticket-info-row">
            <span className="ticket-label">Ticket ID:</span>
            <span className="ticket-value">{ticket.id || ticketId}</span>
          </div>

          <div className="ticket-info-row">
            <span className="ticket-label">Event Name:</span>
            <span className="ticket-value">{ticket.eventName || "N/A"}</span>
          </div>

          <div className="ticket-info-row">
            <span className="ticket-label">Attendee Name:</span>
            <span className="ticket-value">{ticket.attendeeName || "N/A"}</span>
          </div>

          <div className="ticket-info-row">
            <span className="ticket-label">Email:</span>
            <span className="ticket-value">
              {ticket.attendeeEmail || "N/A"}
            </span>
          </div>

          <div className="ticket-info-row">
            <span className="ticket-label">Phone:</span>
            <span className="ticket-value">{ticket.phoneNumber || "N/A"}</span>
          </div>

          <div className="ticket-info-row">
            <span className="ticket-label">Number of Tickets:</span>
            <span className="ticket-value">{ticket.numberOfTickets || 1}</span>
          </div>

          <div className="ticket-info-row">
            <span className="ticket-label">Total Amount:</span>
            <span className="ticket-value">
              ${ticket.totalAmount?.toFixed(2) || "0.00"}
            </span>
          </div>

          {ticket.eventDate && (
            <div className="ticket-info-row">
              <span className="ticket-label">Event Date:</span>
              <span className="ticket-value">
                {new Date(ticket.eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          )}

          {ticket.eventLocation && (
            <div className="ticket-info-row">
              <span className="ticket-label">Location:</span>
              <span className="ticket-value">{ticket.eventLocation}</span>
            </div>
          )}

          <div className="ticket-status">
            <span className="status-badge status-confirmed">✓ CONFIRMED</span>
          </div>
        </div>

        <div className="ticket-footer">
          <p className="ticket-note">
            📧 A confirmation email has been sent to your registered email
            address.
          </p>
          <button className="home-btn" onClick={() => navigate("/")}>
            Back to Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
