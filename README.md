# pcc-faculdadeimpacta
# Sistema de Reserva de Salas e Espaços

Projeto de Conclusão de Curso da Faculdade Impacta, desenvolvido por **Gabriela Bueno Ribeiro**.

Este sistema oferece um conjunto de funcionalidades para facilitar a reserva de salas e espaços, tornando a gestão de locais disponíveis mais eficiente.

## Funcionalidades Principais

O sistema foi dividido em 4 funcionalidades principais:

### 1. Cadastro de Salas e Espaços

Os administradores do sistema podem cadastrar diferentes salas e espaços disponíveis para reserva. Cada local pode ter detalhes como capacidade, equipamentos disponíveis, horários de funcionamento, entre outros.

### 2. Reserva de Salas

Usuários podem buscar salas ou espaços disponíveis, selecionar a data e horário desejados e fazer uma reserva informando seus dados pessoais. O sistema fornece informações em tempo real sobre a disponibilidade.

### 3. Verificação de Disponibilidade

O sistema verifica automaticamente a disponibilidade das salas e espaços para garantir que não haja conflitos de agendamento.

### 4. Gerenciamento de Reservas

Os usuários podem visualizar, modificar ou cancelar suas reservas existentes, informando o código da reserva. Os administradores também têm acesso para gerenciar todas as reservas.

## Tecnologias Utilizadas

O sistema é composto por diferentes módulos:

- Módulo Front-End construído em Angular.
- Módulo Back-End desenvolvido em Java com Spring Boot.
- Banco de dados Oracle para armazenamento de informações.

## Instruções para buildar e Executar o Back-End

Para buildar a aplicação Spring Boot usando o Gradle, siga os passos abaixo:

### Build da Aplicação

No terminal, utilizar o seguinte comando:

```shell
./gradlew build
```

### Executar a Aplicação
Para executar a aplicação Spring Boot localmente, utilizar o seguinte comando:

```shell
./gradlew bootRun
```

Aproveite as funcionalidades deste sistema de reserva de salas e espaços para otimizar a gestão de locais disponíveis. Em caso de dúvidas ou problemas, não hesite em contatar **Gabriela Bueno Ribeiro**.