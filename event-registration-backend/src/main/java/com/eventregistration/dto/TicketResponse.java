package com.eventregistration.dto;

import com.eventregistration.entity.Ticket;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketResponse {
    private Long id;
    private String attendeeName;
    private String attendeeEmail;
    private String phoneNumber;
    private Integer numberOfTickets;
    private Double totalAmount;
    private String bookingStatus;
    private LocalDateTime bookingDate;

    // Event details
    private Long eventId;
    private String eventName;
    private String eventDescription;
    private LocalDateTime eventDate;
    private String eventLocation;
    private Double ticketPrice;

    // User details
    private Long userId;
    private String userName;
    private String userEmail;

    public static TicketResponse fromTicket(Ticket ticket) {
        TicketResponse response = new TicketResponse();
        response.setId(ticket.getId());
        response.setAttendeeName(ticket.getAttendeeName());
        response.setAttendeeEmail(ticket.getAttendeeEmail());
        response.setPhoneNumber(ticket.getPhoneNumber());
        response.setNumberOfTickets(ticket.getNumberOfTickets());
        response.setTotalAmount(ticket.getTotalAmount());
        response.setBookingStatus(ticket.getBookingStatus() != null ? ticket.getBookingStatus().name() : "CONFIRMED");
        response.setBookingDate(ticket.getBookingDate());

        // Set event details
        if (ticket.getEvent() != null) {
            response.setEventId(ticket.getEvent().getId());
            response.setEventName(ticket.getEvent().getName());
            response.setEventDescription(ticket.getEvent().getDescription());
            response.setEventDate(ticket.getEvent().getDate());
            response.setEventLocation(ticket.getEvent().getLocation());
            response.setTicketPrice(ticket.getEvent().getTicketPrice());
        }

        // Set user details
        if (ticket.getUser() != null) {
            response.setUserId(ticket.getUser().getId());
            response.setUserName(ticket.getUser().getName());
            response.setUserEmail(ticket.getUser().getEmail());
        }

        return response;
    }
}
