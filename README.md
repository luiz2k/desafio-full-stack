# Como rodar o projeto

### BACK-END

1 - Acesse a pasta do back-end

2 - Crie uma variável de ambiente na raiz o projeto chamada de `.env`, e preencha ela usando como referência o arquivo `.env.example`

3 - Inicie o banco de dados com o Docker
```
docker-compose up
```

4 - Instale as dependências
```
npm install
```

5 - Rode as migrations do Prisma
```
npx prisma migrate deploy
```

6 - Faça a build da aplicação
```
npm run build
```

7 - Inicie a aplicação
```
npm start
```



---



### FRONT-END

1 - Acesse a pasta do front-end

2 - Crie uma variável de ambiente na raiz o projeto chamada de `.env.local`, e preencha ela usando como referência o arquivo `.env.local.example`

3 - Instale as dependências
```
npm install
```

4 - Faça a build da aplicação
```
npm run build
```

5 - Inicie a aplicação
```
npm start
```
