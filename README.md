# Welcome to the Phoenican repository!

Inspired by the Phoenicians' high ability to price and market, this tool was developed!<br />

<summary><strong>🤷 How it works ?</strong></summary><br />
This tool has the function of capturing data from a CSV file to update the database.<br />

<summary><strong>👨‍💻 What was used?</strong></summary><br />

<strong>Technologies and Skills</strong><br />
<strong>_Frontend_</strong> <br />
~ Javascript<br />
~ Vite + React<br />
~ Axios<br />
~ csv-parser<br />
<strong>_Backend_</strong> <br />
~ Typescript<br />
~ Express<br />
~ ORM(Prisma)<br />
~ SQL Database(MySQL)<br />
~ Postman<br />
~ MySQL Workbench<br /><br />

## UML Data Model

In this project, we provide a UML data model to represent the `Product` and `Pack` entities. Below is the textual representation of the classes and their relationships:

### Class `Product`
- `code: BigInt`
- `name: String`
- `costprice: Decimal`
- `salesprice: Decimal`

Relationships:
- `packs`: A product can have multiple packs (one-to-many).
- `components`: A product can have multiple components (one-to-many).

### Class `Pack`
- `id: BigInt`
- `pack_id: BigInt`
- `product_id: BigInt`
- `qty: BigInt`

Relationships:
- `pack`: A pack
<br /><br />

# Flow application <br />
-> Click on the link https://youtu.be/cd-5jhuSElE to see the application flow

# Guidelines<br />

## 1º Step
clone the repository:
  ```bash
  git clone git@github.com:oligregz/phoenician-manager.git
  ```
<br /><br />

## 2º Step
access the project directory:
  ```bash
  cd phoenician-manager
  ```
<br /><br />

## 3º Step
Install the project's dependencies in the application's parent directory with the command:
  ```bash
  yarn dev-i
  ```
<br /><br />

## 4º Step
Navigate to the 'backend' directory, configure your environment variable according to the examples passed in the .env.example file and then rename it to .env<br /><br />

## 5º Step
Perform the necessary table migrations for your database with the command:
  ```bash
  yarn prisma migrate dev
  ```
<strong>Attention:</strong> Make sure you have the database created on your machine or on a docker container.
If your models were not created in the database, copy the migration files created in the "migrations" directory that is inside the prism directory and run them in your database.
<br /><br />

## 6º Step
Fill your database with the data passed in the "database.sql" file present in the application's parent directory.
<br /><br />

## 7º Step
Make sure you are in the application's parent directory and launch it in the terminal with:
  ```bash
  yarn dev
  ```
<strong>Tip:</strong> The application can have the backend and frontend layers started separately, pay attention to the json!
<br /><br />

### OBS:<br />
If you want to view the application's request routes, navigate in your terminal to https://editor.swagger.io/
Go to 'file' and attach the application documentation json file which is in the '/doc-api' directory