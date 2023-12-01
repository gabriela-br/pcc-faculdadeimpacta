package com.project.PCCReservadeSalas.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.project.PCCReservadeSalas.Models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User save(User user);
    Optional<User> findByUsernameIgnoreCase(String username);
}
