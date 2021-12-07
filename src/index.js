const { response } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

// MIDDLEWARE verifyIfExistsAccountsCPF

function verifyIfExistsAccountsCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Customer not found!" });
  }

  request.customer = customer;

  return next();
}

//FUNCTION REALIZA BALANÇO DE SALDO NA CONTA

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(404).json({ error: "Customer already exists!" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  console.log(customers);

  return response
    .status(201)
    .json({ success: "Customer successfully created!" });
});

app.get("/statement", verifyIfExistsAccountsCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

app.post("/deposit", verifyIfExistsAccountsCPF, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOperation);

  return response
    .status(200)
    .json({ success: "Deposit carried out successfully!" });
});

app.post("/withdraw", verifyIfExistsAccountsCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({ error: "Insufficient funds!" });
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit",
  };

  customer.statement.push(statementOperation);

  return response
    .status(201)
    .json({ success: "Withdraw carried out successfully!" });
});

app.get("/statement/date", verifyIfExistsAccountsCPF, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  );

  return response.json(statement);
});

app.put("/account", verifyIfExistsAccountsCPF, (request, response) => {
  const { customer } = request;
  const { name } = request.body;

  customer.name = name;

  return response
    .status(200)
    .json({ success: "Account successfully changed!" });
});

app.get("/account", verifyIfExistsAccountsCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer);
});

app.delete("/account", verifyIfExistsAccountsCPF, (request, response) => {
  const { customer } = request;

  customers.splice(customer, 1);

  return response.status(200).json(customers);
});

app.get("/balance", verifyIfExistsAccountsCPF, (request, response) => {
  const { customer } = request;

  const balance = getBalance(customer.statement);

  return response.json(`Saldo em conta é R$ ${balance}`);
});

app.listen(3000, console.log("Server is running on port 3000"));
