package com.project.PCCReservadeSalas;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SalasRepository extends JpaRepository<Sala, Long> {
    List<Sala> findAll();
    Sala save(Sala sala); // Isso atualiza uma sala existente se o ID já existir no banco de dados
    void deleteById(Long id);
    Optional<Sala> findById(Long id);
}
