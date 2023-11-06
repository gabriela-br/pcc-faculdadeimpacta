package com.project.PCCReservadeSalas.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.PCCReservadeSalas.Repositories.SalasRepository;
import com.project.PCCReservadeSalas.Models.Sala;

import java.util.List;
import java.util.Optional;

@Service
public class SalasService {

    private final SalasRepository SalasRepository;

    @Autowired
    public SalasService(SalasRepository SalasRepository) {
        this.SalasRepository = SalasRepository;
    }

    // Método para listar todas as salas
    public List<Sala> listarSalas() {
        return SalasRepository.findAll();
    }

    // Método para cadastrar uma nova sala
    public Sala cadastrarSala(Sala sala) {
        return SalasRepository.save(sala);
    }

    // Método para atualizar uma sala existente por ID
    public Sala atualizarSala(Long id, Sala salaAtualizada) {
        Optional<Sala> salaExistente = SalasRepository.findById(id);

        if (salaExistente.isPresent()) {
            // Atualiza os campos da sala existente com os valores da sala atualizada
            Sala sala = salaExistente.get();
            sala.setNome(salaAtualizada.getNome());
            sala.setCapacidade(salaAtualizada.getCapacidade());
            sala.setEquipamentos(salaAtualizada.getEquipamentos());
            sala.setDiasFuncionamento(salaAtualizada.getDiasFuncionamento());

            return SalasRepository.save(sala);
        } else {
            return null;
        }
    }

    // Método para deletar uma sala por ID
    public boolean deletarSala(Long id) {
        Optional<Sala> salaExistente = SalasRepository.findById(id);

        if (salaExistente.isPresent()) {
            SalasRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
