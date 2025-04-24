# Outsera Challenge - Alisson Carenhatto

Interface Angular para consulta dos indicados e vencedores da categoria "Pior Filme" do Golden Raspberry Awards.

## Descrição

Este projeto é uma aplicação web em Angular que consome a API `https://challenge.outsera.tech/api/movies` para exibir:

- **Dashboard com métricas**:
  - Anos com múltiplos vencedores
  - Top 3 estúdios com mais vitórias
  - Produtores com menor e maior intervalo entre vitórias
  - Busca de vencedores por ano

- **Listagem paginada de todos os filmes**, com filtros por ano e somente vencedores.

## Pré-requisitos

- Node.js >= 14
- npm >= 6
- Angular CLI (instalado globalmente)

## Instalação

```bash
git clone https://github.com/alissoncarenhatto/outsera-challenge-carenhatto
cd outsera-challenge
npm install
```

## Execução

Para iniciar o servidor de desenvolvimento:

```bash
npm start
# ou
ng serve
```

Acesse `http://localhost:4200/` no navegador.

## Testes

Para rodar os testes unitários com Karma/Jasmine:

```bash
npm test
# ou
ng test
```

## Arquitetura e Estrutura

```
src/
├── app/
│   ├── components/     # Componentes
│   ├── core/           # Serviços e modelos
│   ├── dashboard/      # Módulo e componentes do Dashboard
│   ├── movies/         # Módulo e componentes da lista de filmes
│   ├── app-routing.module.ts
│   └── app.component.*
├── assets/
├── environments/      # Configurações de ambiente
├── main.ts
├── styles.scss        # Tema e customizações globais
└── polyfills.ts
```

## Tecnologias

- Angular 16
- RxJS
- TypeScript
- Karma + Jasmine (testes)

## Licença

© Alisson Carenhatto
