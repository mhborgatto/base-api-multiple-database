# base-api-multiple-database
Api Base em Node.js conectando em multiplos bancos de dados

Backend API nuvem para o projeto pandora

## Desenvolvimento Guideline

### Padrões de Código

Implementação do ESlint para manter os padrões de código seguindo:

#### Regras

* Identação: Espaço duplo
* Quebra de linha: \n
* Aspas: Simples
* Ponto e Virgula: Nunca

### MIGRATIONS

#### Gerar
```npx sequelize-cli migration:generate --name nome-da-migration```

#### Executar
```npx sequelize-cli db:migrate --from nomedamigration```
O from só é utilizado caso queira executar a partir de uma migration específica

### Criando MODELS/MIGRATIONS via CLI

Utilize o sequelize cli para gerars os `models` e `migrations` automaticamente conforme o comando abaixo:

```shell script
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string
```

Importante: Constraints como `not null` e `unique` devem ser adicionadas manualmente na migration gerada.
O model:generate do sequelize não suporta constraints.

#### Regras
* Model começa com letra maíuscula, exemplo User;
* cammelCase para nome dos atributos.

### Criando e executando Seeders via CLI
Para popular a base de dados, estão sendo utilizados os seeders do sequelize, que nada mais são do que arquivos que contém dados a serem inseridos na base de dados.

##### Link utilizado para geração de DADOS REAIS para os `seeders` de customers:

https://www.invertexto.com/gerador-de-pessoas

#### Gerar um novo `seeder`:

```shell script
npx sequelize seed:generate --name users
```

#### Executar todos os `seeders`:

```shell script
npx sequelize db:seed:all
```

#### Desfazer os `seeders` mais recentes:

```shell script
npx sequelize db:seed:undo
```

#### Reverter um `seed` específico.

```shell script
npx sequelize db:seed:undo --seed name-of-seed-as-in-data

```
#### Se desfazendo de todos os `seeders` gerados até o presente momento.

```shell script
npx sequelize db:seed:undo:all
```

## Executando localmente

Defina as váriaveis de ambiente no arquivo `.env`, Exemplo:

```
APP_PORT=50900
APP_USERNAME=
APP_PASSWORD=
DATABASE1_USERNAME=
DATABASE1_PASSWORD=
DATABASE1_HOST=
DATABASE1_PORT=
DATABASE2_USERNAME=
DATABASE2_PASSWORD=
DATABASE2_HOST=
DATABASE2_PORT=
DATABASE3_USERNAME=
DATABASE3_PASSWORD=
DATABASE3_HOST=
DATABASE3_PORT=
DATABASE4_USERNAME=
DATABASE4_PASSWORD=
DATABASE4_HOST=
DATABASE4_PORT=
DATABASE5_USERNAME=
DATABASE5_PASSWORD=
DATABASE5_HOST=
DATABASE5_PORT=
STATIC_TOKEN=
```

Note que é necessário informar qual o banco de dados a aplicação se conectará. Você pode
rodar o MySQL localmente utilizando docker.

## Executando o servidor local

Para subir a aplicação, execute:

```shell script
npm run dev
```

### Docker

A aplicação dockerized pode ser rodada localmente, para isso execute o build da aplicação:

```shell script
make build
```

Existe um docker compose file que faz link do container da aplicação (porta 50130) com o banco de
dados MySql (porta 3306). Execute:

```shell script
docker-compose up -d
```

Para fazer shutdown, execute:

```shell script
docker-compose down
```

### Sequelize migrations

O container MySql criado está vazio, é preciso criar o banco de dados e executar as migrations.
Execute:

```shell script
npx sequelize db:create
npx sequelize-cli db:migrate
npx sequelize db:seed:all (opcional)
```
