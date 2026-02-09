package com.eventregistration.repository;

import com.eventregistration.entity.Ticket;
import com.eventregistration.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByUser(User user);

    List<Ticket> findByUserId(Long userId);

    long countByEventId(Long eventId);
}
