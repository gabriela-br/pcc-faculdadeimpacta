package com.project.PCCReservadeSalas;

import jakarta.persistence.*;
import java.util.List;
import java.time.LocalDateTime;


@Entity
@Table(name = "reservas")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "sala_id")
    private Sala sala;
    private String nomePessoa;
    private String telefonePessoa;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;

    // Construtores
    public Reserva() {
    }

    public Reserva(Sala sala, String nomePessoa, String telefonePessoa, LocalDateTime dataInicio, LocalDateTime dataFim) {
        this.sala = sala;
        this.nomePessoa = nomePessoa;
        this.telefonePessoa = telefonePessoa;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    public String getNomePessoa() {
        return nomePessoa;
    }

    public void setNomePessoa(String nomePessoa) {
        this.nomePessoa = nomePessoa;
    }

    public String getTelefonePessoa() {
        return telefonePessoa;
    }

    public void setTelefonePessoa(String telefonePessoa) {
        this.telefonePessoa = telefonePessoa;
    }

    public LocalDateTime getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDateTime dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDateTime getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDateTime dataFim) {
        this.dataFim = dataFim;
    }
}