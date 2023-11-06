package com.project.PCCReservadeSalas.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.project.PCCReservadeSalas.Services.ReservasService;
import com.project.PCCReservadeSalas.Models.Reserva;

import java.util.List;
import java.time.LocalDateTime;

// @CrossOrigin(origins = "*")
@RestController
@RequestMapping("/reservas")
public class ReservasController {
    @Autowired
    private ReservasService ReservasService; 

    // Endpoint para listar todas as reservas
    @GetMapping
    public ResponseEntity<List<Reserva>> listarReservas() {
        List<Reserva> reservas = ReservasService.listarReservas();
        return new ResponseEntity<>(reservas, HttpStatus.OK);
    }

    @GetMapping("/concorrentes")
    public ResponseEntity<List<Reserva>> listarReservasConcorrentes(
        @RequestParam(value = "dataInicio", required = true) LocalDateTime dataInicio,
        @RequestParam(value = "dataFim", required = true) LocalDateTime dataFim) {
            List<Reserva> reservas = ReservasService.listarReservasConcorrentes(dataInicio, dataFim);
            return new ResponseEntity<>(reservas, HttpStatus.OK);            
    }

    // Endpoint para criar uma nova reserva
    @PostMapping
    public ResponseEntity<Reserva> cadastrarReserva(@RequestBody Reserva reserva) {
        Reserva novaReserva = ReservasService.cadastrarReserva(reserva);
        return new ResponseEntity<>(novaReserva, HttpStatus.CREATED);
    }

    // Endpoint para atualizar uma reserva existente por ID
    @PutMapping("/{reserva_id}")
    public ResponseEntity<Reserva> atualizarReserva(@PathVariable("reserva_id") Long reserva_id, @RequestBody Reserva reserva) {
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
