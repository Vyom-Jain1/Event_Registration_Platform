package com.eventregistration.service;

import com.eventregistration.entity.Event;
import com.eventregistration.repository.EventRepository;
import com.eventregistration.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private TicketRepository ticketRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event eventDetails) {
        Event event = getEventById(id);

        event.setName(eventDetails.getName());
        event.setDescription(eventDetails.getDescription());
        event.setDate(eventDetails.getDate());
        event.setLocation(eventDetails.getLocation());
        event.setAvailableSeats(eventDetails.getAvailableSeats());
        event.setTicketPrice(eventDetails.getTicketPrice());
        event.setImageUrl(eventDetails.getImageUrl());

        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        Event event = getEventById(id);

        // Check if event has any tickets booked
        long ticketCount = ticketRepository.countByEventId(id);
        if (ticketCount > 0) {
            throw new RuntimeException(
                    "Cannot delete event with existing bookings. This event has " + ticketCount + " ticket(s) booked.");
        }

        eventRepository.delete(event);
    }
}
