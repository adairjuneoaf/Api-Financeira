## Api Financeira

Api financeira criada para estudos de rotas e funções do Node.js.

---

### Requisitos

- [x] Deve ser possível criar uma conta.
- [x] Deve ser possível buscar o extrato bancário do cliente.
- [x] Deve ser possível realizar um depósito.
- [x] Deve ser possível realizar um saque.
- [x] Deve ser possível buscar o extrato bancário do cliente por data.
- [x] Deve ser possível atualizar dados da conta do cliente.
- [x] Deve ser possível obter dados da conta do cliente.
- [x] Deve ser possível deletar uma conta.

---

### Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com CPF já existente.
- [x] Não deve ser possível buscar extrato em uma conta não existente.
- [x] Não deve ser possível fazer depósito em uma conta não existente.
- [x] Não deve ser possível fazer saque em uma conta não existente.
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente.
- [x] Não deve ser possível excluir uma conta não existente.

---

### Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/adairjuneoaf/api-financeira
$ cd api-financeira
```

Para iniciá-lo, siga os passos abaixo:

```bash
# Instalar as dependências
$ yarn
# Iniciar o projeto
$ yarn dev
```

O app estará disponível no seu browser pelo endereço http://localhost:3000.
