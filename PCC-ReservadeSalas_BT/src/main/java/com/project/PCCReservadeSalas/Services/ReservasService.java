package com.project.PCCReservadeSalas.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.PCCReservadeSalas.Models.Reserva;
import com.project.PCCReservadeSalas.Repositories.ReservasRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservasService {

    private final ReservasRepository ReservasRepository;

    @Autowired
    public ReservasService(ReservasRepository ReservasRepository) {
        this.ReservasRepository = ReservasRepository;
    }

    // Método para listar todas as Reservas
    public List<Reserva> listarReservas() {
        return ReservasRepository.findAll();
    }

    public List<Reserva> listarReservasConcorrentes(LocalDateTime dataInicio, LocalDateTime dataFim){
        List<Reserva> reservas = ReservasRepository.findAll();
        reservas.removeIf(r -> !isBetween(r, dataInicio, dataFim));
        return reservas;
    }
    
    private boolean isBetween(Reserva reserva, LocalDateTime dataInicio, LocalDateTime dataFim)
    {
        return dataInicio.compareTo(reserva.getDataFim()) <= 0 && reserva.getDataInicio().compareTo(dataFim) <= 0;
    }

    // Método para cadastrar uma nova Reserva
    public Reserva cadastrarReserva(Reserva Reserva) {
        return ReservasRepository.save(Reserva);
    }

    // Método para atualizar uma Reserva existente por ID
    public Reserva atualizarReserva(Long reserva_id, Reserva reservaAtualizada) {
        Optional<Reserva> reservaExistente = ReservasRepository.findById(reserva_id);

        if (reservaExistente.isPresent()) {
            // Atualiza os campos da Reserva existente com os valores da Reserva atualizada
            Reserva reserva = reservaExistente.get();
            reserva.setSala(reservaAtualizada.getSala());
            reserva.setNomePessoa(reservaAtualizada.getNomePessoa());
            reserva.setTelefonePessoa(reservaAtualizada.getTelefonePessoa());
            reserva.setDataInicio(reservaAtualizada.getDataInicio());
            reserva.setDataFim(reservaAtualizada.getDataFim());
            return ReservasRepository.save(reserva);
        } else {
            return null;
        }
    }

    // Método para deletar uma Reserva por ID
    public boolean deletarReserva(Long reserva_id) {
        Optional<Reserva> reservaExistente = ReservasRepository.findById(reserva_id);

        if (reservaExistente.isPresent()) {
            ReservasRepository.deleteById(reserva_id);
            return true;
        } else {
            return false;
        }
    }

}
