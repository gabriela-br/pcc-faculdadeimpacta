package com.project.PCCReservadeSalas;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "salas")
public class Sala {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private int capacidade;

    @ElementCollection
    @CollectionTable(name = "equipamentos")
    private List<String> equipamentos;

    @ElementCollection
    @CollectionTable(name = "dias_funcionamento")
    private List<String> diasFuncionamento;

    // Construtores
    public Sala() {
    }

    public Sala(String nome, int capacidade, List<String> equipamentos, List<String> diasFuncionamento) {
        this.nome = nome;
        this.capacidade = capacidade;
        this.equipamentos = equipamentos;
        this.diasFuncionamento = diasFuncionamento;
    }

    // Getters e setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getCapacidade() {
        return capacidade;
    }
    public void setCapacidade(int capacidade) {
        this.capacidade = capacidade;
    }

    public List<String> getEquipamentos() {
        return equipamentos;
    }
    public void setEquipamentos(List<String> equipamentos) {
        this.equipamentos = equipamentos;
    }

    public List<String> getDiasFuncionamento() {
        return diasFuncionamento;
    }
    public void setDiasFuncionamento(List<String> diasFuncionamento) {
        this.diasFuncionamento = diasFuncionamento;
    }
}