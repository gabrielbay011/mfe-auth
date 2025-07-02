# mfe-auth

## Descrição

Este micro front-end é reponsável pela autenticação de usuário. Ele faz parte da arquitetura de micro-front-ends da aplicação principal via `root-config` utilizando o `single-spa`.

## Como rodar localmente

### Pré-requisitos

- Node.js
- Gerenciador de pacotes
- root-config rodando em paralelo

### Passos

```
# Instale as dependências
npm install

# Inicie a aplicação
npm start
```

## Integração com o root-config

- Nome do micro front-end registrado: `@mfe/auth`
- Caminho da rota configurada: `/auth`
