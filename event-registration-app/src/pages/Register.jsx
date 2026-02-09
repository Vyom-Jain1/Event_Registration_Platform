import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import Loader from "../components/Loader";
import "./Register.css";

const Register = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfTickets: 1,
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchEventDetails();
    // Pre-fill form with user's information
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [id, user]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/events/${id}`);
      setEvent(response.data);
    } catch (err) {
      setError("Failed to fetch event details.");
      console.error("Error fetching event:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = "Name is required";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Email is invalid";
    }

    if (!form.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone.replace(/[-()\s]/g, ""))) {
      errors.phone = "Phone number should be 10 digits";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const bookingData = {
        eventId: parseInt(id),
        attendeeName: form.name,
        attendeeEmail: form.email,
        phoneNumber: form.phone,
        numberOfTickets: parseInt(form.numberOfTickets) || 1,
      };

      const response = await API.post("/tickets/book", bookingData);

      // Navigate to ticket confirmation page
      const ticketId = response.data.id || response.data.ticketId;
      navigate(`/ticket/${ticketId}`);
    } catch (err) {
      if (err.response) {
        // Backend returned error
        setError(
          err.response.data.message || "Registration failed. Please try again.",
        );
      } else if (err.request) {
        // Network error
        setError("Network error. Please check your connection and try again.");
      } else {
        // Other error
        setError("Registration failed. Please try again.");
      }
      console.error("Error during registration:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
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
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Register for Event</h1>
          <h2>{event.name}</h2>
        </div>

        <div className="register-body">
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={formErrors.name ? "input-error" : ""}
                placeholder="Enter your full name"
              />
              {formErrors.name && (
                <span className="error-text">{formErrors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={formErrors.email ? "input-error" : ""}
                placeholder="your.email@example.com"
              />
              {formErrors.email && (
                <span className="error-text">{formErrors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={formErrors.phone ? "input-error" : ""}
                placeholder="1234567890"
              />
              {formErrors.phone && (
                <span className="error-text">{formErrors.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="numberOfTickets">Number of Tickets *</label>
              <input
                type="number"
                id="numberOfTickets"
                name="numberOfTickets"
                value={form.numberOfTickets}
                onChange={handleChange}
                min="1"
                max={event.availableSeats || 10}
                placeholder="1"
              />
              {event.ticketPrice && (
                <small
                  style={{ color: "#666", marginTop: "5px", display: "block" }}>
                  Total: $
                  {(event.ticketPrice * (form.numberOfTickets || 1)).toFixed(2)}
                </small>
              )}
            </div>

            {event.availableSeats !== null &&
              event.availableSeats !== undefined && (
                <div
                  className="info-box"
                  style={{
                    background: "#e3f2fd",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "15px",
                  }}>
                  <strong>🎫 Available Seats:</strong> {event.availableSeats}{" "}
                  seats left
                </div>
              )}

            <div className="form-actions">
              <button
                type="submit"
                className="submit-btn"
                disabled={submitting}>
                {submitting ? "Registering..." : "Complete Registration"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate(`/event/${id}`)}
                disabled={submitting}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
