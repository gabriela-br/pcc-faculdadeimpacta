package com.project.PCCReservadeSalas.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.project.PCCReservadeSalas.Services.ReservasService;
import com.project.PCCReservadeSalas.Services.UserService;
import com.project.PCCReservadeSalas.Models.Reserva;
import com.project.PCCReservadeSalas.Models.User;

import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

// @CrossOrigin(origins = "*")
@RestController
@RequestMapping("/reservas")
public class ReservasController {
    @Autowired
    private ReservasService ReservasService; 

    @Autowired
    private UserService userService;

    // Endpoint para listar todas as reservas
    @GetMapping
    public ResponseEntity<List<Reserva>> listarReservas() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities()
                                        .stream()
                                        .anyMatch(
                                            role -> role.getAuthority().equals("ROLE_ADMIN")
                                        );

        List<Reserva> reservas;
        if(isAdmin)
            reservas = ReservasService.listarReservas();
        else
            reservas = ReservasService.listarReservasByUser(authentication.getName());
            
        return new ResponseEntity<>(reservas, HttpStatus.OK);
    }

    @GetMapping("/concorrentes")
    public ResponseEntity<List<Reserva>> listarReservasConcorrentes(
        @RequestParam(value = "dataInicio", required = true) String dataInicio,
        @RequestParam(value = "dataFim", required = true) String dataFim) {
            LocalDateTime localDataInicio = LocalDateTime.parse(dataInicio, DateTimeFormatter.ISO_DATE_TIME);
            LocalDateTime localDataFim = LocalDateTime.parse(dataFim, DateTimeFormatter.ISO_DATE_TIME);
            List<Reserva> reservas = ReservasService.listarReservasConcorrentes(localDataInicio, localDataFim);
            return new ResponseEntity<>(reservas, HttpStatus.OK);            
    }

    // Endpoint para criar uma nova reserva
    @PostMapping
    public ResponseEntity<Reserva> cadastrarReserva(@RequestBody Reserva reserva) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User userDetails = userService.loadUserByUsername(authentication.getName());
        reserva.setUser(userDetails);
        
        Reserva novaReserva = ReservasService.cadastrarReserva(reserva);
        return new ResponseEntity<>(novaReserva, HttpStatus.CREATED);
    }

    // Endpoint para atualizar uma reserva existente por ID
    @PutMapping("/{reserva_id}")
    public ResponseEntity<Reserva> atualizarReserva(@PathVariable("reserva_id") Long reserva_id, @RequestBody Reserva reserva) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User userDetails = userService.loadUserByUsername(authentication.getName());
        reserva.setUser(userDetails);

        Reserva reservaAtualizada = ReservasService.atualizarReserva(reserva_id, reserva);
        if (reservaAtualizada != null) {
            return new ResponseEntity<>(reservaAtualizada, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint para deletar uma reserva existente por ID
    @PostMapping("/delete/{reserva_id}")
    public ResponseEntity<Void> deletarReserva(@PathVariable("reserva_id") Long reserva_id) {
        boolean reservaDeletada = ReservasService.deletarReserva(reserva_id);
        if (reservaDeletada) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
