import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [eventsResponse, ticketsResponse] = await Promise.all([
        API.get("/events"),
        API.get("/tickets"),
      ]);
      setEvents(eventsResponse.data);
      setTickets(ticketsResponse.data);
    } catch (err) {
      setError("Failed to fetch dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await API.delete(`/events/${id}`);
      setEvents(events.filter((event) => event.id !== id));
      alert("Event deleted successfully!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to delete event";
      alert(errorMessage);
      console.error(err);
    }
  };

  // Calculate statistics
  const totalTickets = tickets.reduce(
    (sum, ticket) => sum + (ticket.numberOfTickets || 0),
    0,
  );
  const totalRevenue = tickets.reduce(
    (sum, ticket) => sum + (ticket.totalAmount || 0),
    0,
  );
  const ticketsByEvent = events.map((event) => {
    const eventTickets = tickets.filter(
      (ticket) => ticket.eventId === event.id,
    );
    const ticketCount = eventTickets.reduce(
      (sum, ticket) => sum + (ticket.numberOfTickets || 0),
      0,
    );
    return { ...event, ticketsSold: ticketCount };
  });

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.name}</p>
        <button
          className="add-event-btn"
          onClick={() => navigate("/admin/add-event")}>
          + Add New Event
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Statistics Cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Events</h3>
          <p className="stat-number">{events.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Tickets Sold</h3>
          <p className="stat-number">{totalTickets}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-number">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p className="stat-number">{tickets.length}</p>
        </div>
      </div>

      <div className="admin-events-table">
        <h2>Events Management</h2>
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Tickets Sold</th>
              <th>Available Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ticketsByEvent.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-events">
                  No events found
                </td>
              </tr>
            ) : (
              ticketsByEvent.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.location}</td>
                  <td>
                    <strong>{event.ticketsSold}</strong>
                  </td>
                  <td>
                    <span
                      style={{
                        color:
                          event.availableSeats > 50
                            ? "green"
                            : event.availableSeats > 10
                              ? "orange"
                              : "red",
                        fontWeight: "bold",
                      }}>
                      {event.availableSeats}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/admin/edit-event/${event.id}`)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(event.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
