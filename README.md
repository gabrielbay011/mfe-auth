# mfe-auth

## Descrição

Este microfrontend é reponsável pela autenticação de usuário. Ele faz parte da arquitetura de microfrontend da aplicação principal via `root-config` utilizando o `single-spa`.

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

Após iniciar a aplicação, acesse no navegador:

```
http://localhost:9000/auth
```

## Integração com o root-config

- Nome do microfrontend registrado: `@mfe/auth`
- Caminho da rota configurada: `/auth`
