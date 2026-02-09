import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./AddEditEvent.css";

const AddEditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    capacity: "",
    availableSeats: "",
    ticketPrice: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await API.get(`/events/${id}`);
      const event = response.data;
      setForm({
        name: event.name || "",
        date: event.date ? event.date.split("T")[0] : "",
        location: event.location || "",
        description: event.description || "",
        capacity: event.capacity || "",
        availableSeats: event.availableSeats || "",
        ticketPrice: event.ticketPrice || "",
      });
    } catch (err) {
      setError("Failed to fetch event details");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      errors.name = "Event name is required";
    }

    if (!form.date) {
      errors.date = "Event date is required";
    }

    if (!form.location.trim()) {
      errors.location = "Location is required";
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
      setLoading(true);
      setError("");

      if (isEdit) {
        await API.put(`/events/${id}`, form);
        alert("Event updated successfully!");
      } else {
        await API.post("/events", form);
        alert("Event created successfully!");
      }

      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `Failed to ${isEdit ? "update" : "create"} event`,
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-edit-event-container">
      <div className="add-edit-event-card">
        <div className="add-edit-event-header">
          <h1>{isEdit ? "Edit Event" : "Add New Event"}</h1>
        </div>

        <div className="add-edit-event-body">
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="name">Event Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={formErrors.name ? "input-error" : ""}
                placeholder="Enter event name"
              />
              {formErrors.name && (
                <span className="error-text">{formErrors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="date">Event Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={formErrors.date ? "input-error" : ""}
              />
              {formErrors.date && (
                <span className="error-text">{formErrors.date}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                className={formErrors.location ? "input-error" : ""}
                placeholder="Enter location"
              />
              {formErrors.location && (
                <span className="error-text">{formErrors.location}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                placeholder="Enter capacity (optional)"
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="availableSeats">Available Seats</label>
              <input
                type="number"
                id="availableSeats"
                name="availableSeats"
                value={form.availableSeats}
                onChange={handleChange}
                placeholder="Enter available seats (optional)"
                min="0"
              />
              <small className="form-hint">
                Number of seats currently available for booking
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="ticketPrice">Ticket Price ($)</label>
              <input
                type="number"
                id="ticketPrice"
                name="ticketPrice"
                value={form.ticketPrice}
                onChange={handleChange}
                placeholder="Enter ticket price (optional)"
                min="0"
                step="0.01"
              />
              <small className="form-hint">Price per ticket in dollars</small>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter event description (optional)"
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading
                  ? "Saving..."
                  : isEdit
                    ? "Update Event"
                    : "Create Event"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/admin/dashboard")}
                disabled={loading}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditEvent;
