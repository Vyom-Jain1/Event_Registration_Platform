package com.eventregistration.service;

import com.eventregistration.dto.TicketBookingRequest;
import com.eventregistration.dto.TicketResponse;
import com.eventregistration.entity.Event;
import com.eventregistration.entity.Ticket;
import com.eventregistration.entity.User;
import com.eventregistration.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private AuthService authService;

    @Transactional
    public Ticket bookTicket(TicketBookingRequest request) {
        User currentUser = authService.getCurrentUser();
        Event event = eventService.getEventById(request.getEventId());

        // Check available seats
        if (event.getAvailableSeats() != null && event.getAvailableSeats() < request.getNumberOfTickets()) {
            throw new RuntimeException("Not enough seats available");
        }

        Ticket ticket = new Ticket();
        ticket.setUser(currentUser);
        ticket.setEvent(event);
        ticket.setAttendeeName(request.getAttendeeName());
        ticket.setAttendeeEmail(request.getAttendeeEmail());
        ticket.setPhoneNumber(request.getPhoneNumber());
        ticket.setNumberOfTickets(request.getNumberOfTickets());

        // Calculate total amount
        if (event.getTicketPrice() != null) {
            ticket.setTotalAmount(event.getTicketPrice() * request.getNumberOfTickets());
        }

        ticket.setBookingStatus(Ticket.BookingStatus.CONFIRMED);

        // Update available seats
        if (event.getAvailableSeats() != null) {
            event.setAvailableSeats(event.getAvailableSeats() - request.getNumberOfTickets());
            eventService.updateEvent(event.getId(), event);
        }

        return ticketRepository.save(ticket);
    }

    public TicketResponse getTicketById(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));

        // Ensure user can only access their own tickets
        User currentUser = authService.getCurrentUser();
        if (!ticket.getUser().getId().equals(currentUser.getId()) &&
                currentUser.getRole() != User.Role.ADMIN) {
            throw new RuntimeException("Access denied");
        }

        return TicketResponse.fromTicket(ticket);
    }

    public List<TicketResponse> getUserTickets() {
        User currentUser = authService.getCurrentUser();
        return ticketRepository.findByUser(currentUser).stream()
                .map(TicketResponse::fromTicket)
                .collect(Collectors.toList());
    }

    public List<TicketResponse> getAllTickets() {
        return ticketRepository.findAll().stream()
                .map(TicketResponse::fromTicket)
                .collect(Collectors.toList());
    }
}
