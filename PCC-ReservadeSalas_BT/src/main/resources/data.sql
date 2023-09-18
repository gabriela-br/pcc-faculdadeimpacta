-- H2 INITIALIZATION

-- MAPPING SALA A
INSERT INTO salas (nome, capacidade) VALUES ('Sala de Reunião A', 10);

INSERT INTO equipamentos (sala_id, equipamentos) VALUES (1, 'Projetor');
INSERT INTO equipamentos (sala_id, equipamentos) VALUES (1, 'Mesa');
INSERT INTO equipamentos (sala_id, equipamentos) VALUES (1, 'Cadeiras');

INSERT INTO dias_funcionamento (sala_id, dias_funcionamento) VALUES (1, 'segunda');
INSERT INTO dias_funcionamento (sala_id, dias_funcionamento) VALUES (1, 'quarta');
INSERT INTO dias_funcionamento (sala_id, dias_funcionamento) VALUES (1, 'sexta');

-- MAPPING SALA B
INSERT INTO salas (nome, capacidade) VALUES ('Sala de Reunião B', 12);

INSERT INTO equipamentos (sala_id, equipamentos) VALUES (2, 'Projetor');
INSERT INTO equipamentos (sala_id, equipamentos) VALUES (2, 'Mesa');
INSERT INTO equipamentos (sala_id, equipamentos) VALUES (2, 'Cadeiras');
INSERT INTO equipamentos (sala_id, equipamentos) VALUES (2, 'Quadro Branco');

INSERT INTO dias_funcionamento (sala_id, dias_funcionamento) VALUES (2, 'terca');
INSERT INTO dias_funcionamento (sala_id, dias_funcionamento) VALUES (2, 'quinta');
