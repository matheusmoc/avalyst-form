# Avalyst - Teste de Back-end

## Requirements

- [composer](https://getcomposer.org/)
- [PHP 7.4](https://www.php.net/downloads#v7.4.19)
- [MySQL](https://www.mysql.com/downloads/)

## Install

`composer install`

## Run

`cd public && php -S localhost:8282 index.php`

## Folder Structure

- public *(arquivo de iniciação)*

- src  
  - Services *(controllers)*
  - Models *(models)*
  - Validators *(validadores)*
  - dependencies.php *(configuração de DI)*
  - routes.php *(configuração das rotas da API)*
  - settings.php *(configuração do banco de dados)*

- migration *(scripts de criação de tabelas)*

## Telefones do Contato (Atualização)

Agora um contato pode possuir múltiplos telefones.

### Estrutura

- Nova tabela: `contact_phone` (`contactPhoneId`, `contactId`, `phone`)
- Relacionamento: `Contact` hasMany `ContactPhone` via `contactId`

### Criar Contato

POST `/contact`

Payload (múltiplos telefones):

```json
{
  "name": "contato teste",
  "email": "test@gmail.com",
  "phones": ["+55 11 99999-0000", "+55 11 98888-1111"]
}
```


### Resposta

```json
{
  "ok": true,
  "data": {
    "contactId": 1,
    "name": "contato teste",
    "email": "test@gmail.com",
    "phones": ["+55 11 99999-0000", "+55 11 98888-1111"],
    "dateCreated": "2025-11-20 12:00:00",
    "dateUpdated": "2025-11-20 12:00:00"
  }
}
```

### Atualizar Contato

PUT `/contact/{id}` com mesma estrutura de payload. Telefones são substituídos pelo novo array enviado.

### Listar Contatos / Detalhe

GET `/contact` ou `/contact/{id}` retorna `phones` como array de strings.

### Buscar Contatos

POST `/contact/search`

Payload:
```json
{
  "query": "termo a buscar"
}
```

Busca parcial por nome ou e-mail (case-insensitive). Retorna array de contatos encontrados.

Resposta:
```json
[
  {
    "contactId": 1,
    "name": "contato teste",
    "email": "test@gmail.com",
    "phones": ["+55 11 99999-0000"],
    "dateCreated": "2025-11-20 12:00:00",
    "dateUpdated": "2025-11-20 12:00:00"
  },
]
```

### Migração

Executar script em `migration/20210514-contact.sql` após ter a tabela `contact` criada.

