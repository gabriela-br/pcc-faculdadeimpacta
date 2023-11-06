-- DATABASE INITIALIZATION

-- MAPPING SALA A
 INSERT INTO salas (nome, capacidade) VALUES ('Sala de Reunião A', 10);

-- INSERT INTO equipamentos (sala_id, equipamentos) VALUES (1, 'Projetor');
-- INSERT INTO equipamentos (sala_id, equipamentos) VALUES (1, 'Mesa');
-- INSERT INTO equipamentos (sala_id, equipamentos) VALUES (1, 'Cadeiras');

-- INSERT INTO dias_funcionamento (sala_id, dias_funcionamento) VALUES (1, 'segunda');
-- INSERT INTO dias_funcionamento (sala_id, dias_funcionamento) VALUES (1, 'quarta');
-- INSERT INTO dias_funcionamento (sala_id, dias_funcionamento) VALUES (1, 'sexta');

-- -- MAPPING SALA B
-- INSERT INTO salas (nome, capacidade) VALUES ('Sala de Reunião B', 12);

-- INSERT INTO equipamentos (sala_id, equipamentos) VALUES (2, 'Projetor');
-- INSERT INTO equipamentos (sala_id, equipamentos) VALUES (2, 'Mesa');
-- INSERT INTO equipamentos (sala_id, equipamentos) VALUES (2, 'Cadeiras');
-- INSERT INTO equipamentos (sala_id, equipamentos) VALUES (2, 'Quadro Branco');

<<<<<<< HEAD
INSERT INTO dias_funcionamento (sala_id, dias_funcionamento) VALUES (2, 'terca');
INSERT INTO dias_funcionamento (sala_id, dias_funcionamento) VALUES (2, 'quinta');


-- MAPPING RESERVAS
INSERT INTO reservas (sala_id, nome_pessoa, telefone_pessoa, data_inicio, data_fim)
VALUES (1, 'Gabriela Ribeiro', '1144610860', '2023-10-09', '2023-10-09')
=======
-- INSERT INTO dias_funcionamento (sala_id, dias_funcionamento) VALUES (2, 'terca');
-- INSERT INTO dias_funcionamento (sala_id, dias_funcionamento) VALUES (2, 'quinta');

-- -- MAPPING RESERVAS
-- INSERT INTO RESERVAS (SALA_ID, NOME_PESSOA, TELEFONE_PESSOA, DATA_INICIO, DATA_FIM)
-- VALUES (1, 'Gabriela Ribeiro', '1144610860', TO_TIMESTAMP('2023-10-09', 'YYYY-MM-DD'), TO_TIMESTAMP('2023-10-09', 'YYYY-MM-DD'));
>>>>>>> 016675c13e7b8274f85e8bece0b5f89f4207c9a3
