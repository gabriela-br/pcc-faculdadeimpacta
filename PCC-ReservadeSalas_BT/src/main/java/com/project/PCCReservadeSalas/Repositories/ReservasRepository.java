package com.project.PCCReservadeSalas.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import com.project.PCCReservadeSalas.Models.Reserva;

public interface ReservasRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findAll();
    Reserva save(Reserva reserva); 
    void deleteById(Long id);
    Optional<Reserva> findById(Long id);
}
