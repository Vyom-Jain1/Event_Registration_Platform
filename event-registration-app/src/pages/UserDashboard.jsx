import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import "./UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyTickets();
  }, []);

  const fetchMyTickets = async () => {
    try {
      setLoading(true);
      const response = await API.get("/tickets/my-tickets");
      setTickets(response.data);
    } catch (err) {
      setError("Failed to fetch your tickets");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalTickets = tickets.reduce(
    (sum, ticket) => sum + (ticket.numberOfTickets || 0),
    0,
  );
  const totalSpent = tickets.reduce(
    (sum, ticket) => sum + (ticket.totalAmount || 0),
    0,
  );

  if (loading) {
    return (
      <div className="user-dashboard-loading">Loading your tickets...</div>
    );
  }

  return (
    <div className="user-dashboard">
      <div className="user-dashboard-header">
        <h1>My Dashboard</h1>
        <p>Welcome back, {user?.name}!</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Statistics Cards */}
      <div className="user-stats">
        <div className="user-stat-card">
          <h3>Total Bookings</h3>
          <p className="stat-number">{tickets.length}</p>
        </div>
        <div className="user-stat-card">
          <h3>Total Tickets</h3>
          <p className="stat-number">{totalTickets}</p>
        </div>
        <div className="user-stat-card">
          <h3>Total Spent</h3>
          <p className="stat-number">${totalSpent.toFixed(2)}</p>
        </div>
      </div>

      {/* Tickets List */}
      <div className="user-tickets-section">
        <h2>My Tickets</h2>

        {tickets.length === 0 ? (
          <div className="no-tickets">
            <p>You haven't booked any events yet.</p>
            <button className="browse-events-btn" onClick={() => navigate("/")}>
              Browse Events
            </button>
          </div>
        ) : (
          <div className="tickets-grid">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-card-header">
                  <h3>{ticket.eventName}</h3>
                  <span
                    className={`status-badge status-${ticket.bookingStatus.toLowerCase()}`}>
                    {ticket.bookingStatus}
                  </span>
                </div>

                <div className="ticket-card-body">
                  <div className="ticket-info">
                    <span className="label">📅 Date:</span>
                    <span className="value">
                      {new Date(ticket.eventDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="ticket-info">
                    <span className="label">📍 Location:</span>
                    <span className="value">{ticket.eventLocation}</span>
                  </div>

                  <div className="ticket-info">
                    <span className="label">👤 Attendee:</span>
                    <span className="value">{ticket.attendeeName}</span>
                  </div>

                  <div className="ticket-info">
                    <span className="label">📧 Email:</span>
                    <span className="value">{ticket.attendeeEmail}</span>
                  </div>

                  {ticket.phoneNumber && (
                    <div className="ticket-info">
                      <span className="label">📞 Phone:</span>
                      <span className="value">{ticket.phoneNumber}</span>
                    </div>
                  )}

                  <div className="ticket-info">
                    <span className="label">🎫 Tickets:</span>
                    <span className="value">{ticket.numberOfTickets}</span>
                  </div>

                  {ticket.ticketPrice && (
                    <div className="ticket-info">
                      <span className="label">💵 Price per Ticket:</span>
                      <span className="value">
                        ${ticket.ticketPrice?.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="ticket-info">
                    <span className="label">💰 Total Amount:</span>
                    <span className="value amount">
                      ${ticket.totalAmount?.toFixed(2)}
                    </span>
                  </div>

                  <div className="ticket-info">
                    <span className="label">🕒 Booked:</span>
                    <span className="value">
                      {new Date(ticket.bookingDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="ticket-card-footer">
                  <button
                    className="view-ticket-btn"
                    onClick={() => navigate(`/ticket/${ticket.id}`)}>
                    View Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
