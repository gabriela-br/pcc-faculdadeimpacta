package com.project.PCCReservadeSalas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @CrossOrigin(origins = "*")
@RestController
@RequestMapping("/salas")
public class SalasController {
    @Autowired
    private SalasService SalasService; 

    // Endpoint para listar todas as salas
    @GetMapping
    public ResponseEntity<List<Sala>> listarSalas() {
        List<Sala> salas = SalasService.listarSalas();
        return new ResponseEntity<>(salas, HttpStatus.OK);
    }

    // Endpoint para criar uma nova sala
    @PostMapping
    public ResponseEntity<Sala> cadastrarSala(@RequestBody Sala sala) {
        Sala novaSala = SalasService.cadastrarSala(sala);
        return new ResponseEntity<>(novaSala, HttpStatus.CREATED);
    }

    // Endpoint para atualizar uma sala existente por ID
    @PutMapping("/{id}")
    public ResponseEntity<Sala> atualizarSala(@PathVariable("id") Long id, @RequestBody Sala sala) {
        Sala salaAtualizada = SalasService.atualizarSala(id, sala);
        if (salaAtualizada != null) {
            return new ResponseEntity<>(salaAtualizada, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint para deletar uma sala por ID
    @PostMapping("/delete/{id}")
    public ResponseEntity<Void> deletarSala(@PathVariable("id") Long id) {
        boolean salaDeletada = SalasService.deletarSala(id);
        if (salaDeletada) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
