# Regras da aplicação

* [X]  Deve ser possível cadastrar um pet
* [X]  Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
* [X]  Deve ser possível filtrar pets por suas características
* [X]  Deve ser possível visualizar detalhes de um pet para adoção
* [X]  Deve ser possível se cadastrar como uma ORG
* [ ]  Deve ser possível realizar login como uma ORG

# Regras de negócio

* [X]  Para listar os pets, obrigatoriamente precisamos informar a cidade
* [X]  Uma ORG precisa ter um endereço e um número de WhatsApp
* [X]  Um pet deve estar ligado a uma ORG
* [ ]  O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
* [X]  Todos os filtros, além da cidade, são opcionais
* [ ]  Para uma ORG acessar a aplicação como admin, ela precisa estar logada
* [X]  Duas ORGs não podem ter o mesmo endereço

# RNFs (Requisitos não-funcionais)

* [X]  A senha do usuário deve ser criptografada;
* [X]  Os dados da aplicação precisam estar persistodos em um banco PostgresSQL;
* [X]  Todas as listas de dados precisam estar paginadas com 20 itens por página;
* [ ]  O usuário deve ser identificado por um JWT (JSON Web Token)
