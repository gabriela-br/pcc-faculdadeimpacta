package com.project.PCCReservadeSalas.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Value("${initializer.adminUsername}")
    private String adminUsername;

    @Value("${initializer.adminPassword}")
    private String adminPassword;

    private final JdbcTemplate jdbcTemplate;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DatabaseInitializer(JdbcTemplate jdbcTemplate, PasswordEncoder passwordEncoder) {
        this.jdbcTemplate = jdbcTemplate;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        initializeDatabase();
    }

    private void initializeDatabase() {
        // Initialize Admin User
        initializeAdminUser();

        // Initialize Sala A
        initializeSala("Sala de Reunião A", 10, "Projetor,Mesa,Cadeiras", "segunda,quarta,sexta");

        // Initialize Sala B
        initializeSala("Sala de Reunião B", 12, "Projetor,Mesa,Cadeiras,Quadro Branco", "terca,quinta");

        // Initialize Reservas
        initializeReserva(1, adminUsername, "Gabriela Ribeiro", "1144610860", "2023-10-09", "2023-10-09");
    }

    private void initializeAdminUser() {
        String encodedPassword = passwordEncoder.encode(adminPassword);
        jdbcTemplate.update(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            adminUsername, encodedPassword
        );
    }

    private void initializeSala(String salaNome, int capacidade, String equipamentos, String diasFuncionamento) {
        jdbcTemplate.update(
            "INSERT INTO salas (nome, capacidade) VALUES (?, ?)",
            salaNome, capacidade
        );

        int salaId = jdbcTemplate.queryForObject(
            "SELECT id FROM salas WHERE nome = ?",
            Integer.class,
            salaNome
        );

        String[] equipamentosArray = equipamentos.split(",");
        for (String equipamento : equipamentosArray) {
            jdbcTemplate.update(
                "INSERT INTO equipamentos (sala_id, equipamentos) VALUES (?, ?)",
                salaId, equipamento
            );
        }

        String[] diasFuncionamentoArray = diasFuncionamento.split(",");
        for (String dia : diasFuncionamentoArray) {
            jdbcTemplate.update(
                "INSERT INTO dias_funcionamento (sala_id, dias_funcionamento) VALUES (?, ?)",
                salaId, dia
            );
        }
    }

    private void initializeReserva(int salaId, String username, String nomePessoa, String telefonePessoa, String dataInicio, String dataFim) {
        jdbcTemplate.update(
            "INSERT INTO reservas (sala_id, user_username, nome_pessoa, telefone_pessoa, data_inicio, data_fim) " +
            "VALUES (?, ?, ?, ?, ?, ?)",
            salaId, username, nomePessoa, telefonePessoa, dataInicio, dataFim
        );
    }
}
