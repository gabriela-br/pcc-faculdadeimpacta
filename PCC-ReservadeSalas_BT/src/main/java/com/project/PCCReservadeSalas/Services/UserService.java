package com.project.PCCReservadeSalas.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.project.PCCReservadeSalas.Repositories.UserRepository;
import com.project.PCCReservadeSalas.Models.User;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        user.updateAuthorities();
        return user;
    }

    public User save(User user) throws Exception {
        if (userRepository.findByUsernameIgnoreCase(user.getUsername()).isPresent()) {
            throw new Exception("Username is already taken!");
        }

        User encodedUser = new User();
        encodedUser.setUsername(user.getUsername());
        encodedUser.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(encodedUser);
    }
}
