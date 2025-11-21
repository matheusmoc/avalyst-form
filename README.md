# Avalyst - Teste

Teste de [back-end (PHP)](back-end) e [front-end (Angular)](front-end).

## Tarefas

- adicionar o campo `phone` ao serviço **Contact**, sendo:
  - este campo não é obrigatório;
  - caso preenchido deve ser formatado no padrão `(00) 00000-0000`.

- criar um método *search* para o serviço **Contact** para realizar uma busca e retornar o resultado, sendo:  
  - o termo a ser buscado deverá vir no parametro `query`;
  - o método deve ser do tipo `POST`;
  - a busca do termo deverá procurar por parte de nome ou e-mail;  
  - o método deve retornar uma `array` com todos os resultados.
  
- criar um novo serviço **User**, com os campos: `name`, `email` e `password`, sendo:  
  - o novo serviço deve ter um método para cadastro e outro para retornar a lista;
  - a senha deve ser armazenada criptografada no banco de dados;
  - a lista não deve retornar as senhas;
  - não é necessário criar a autenticação.

## Observações

- as tarefas devem ser criadas no back-end e no front-end;
- são necessárias as ferramentas `composer`, `Angular CLI` e `npm`;
- não é necessário a criação de ambiente de servidor web local para executar este teste, basta PHP instalado;
- é necessário ter banco de dados MySQL local.

## Dicas

- consulte os arquivos **README** das duas aplicações [back-end (PHP)](back-end) e [front-end (Angular)](front-end) para informações sobre instalação.
- manual do ORM [Eloquent](https://laravel.com/docs/8.x/eloquent);
- manual do [Respect\Validation](https://respect-validation.readthedocs.io/en/1.1/);
- ao finalizar enviar o pacote de arquivos para charles@avalyst.com.br.

## Implementações Realizadas

Abaixo estão listadas as alterações e novas funcionalidades implementadas no projeto:

### 1. Suporte a Múltiplos Telefones (Contact)
- **Backend**:
  - Criação da tabela `contact_phone` para relacionamento 1:N.
  - Atualização do `ContactService` para gerenciar a criação e atualização de múltiplos telefones usando transações.
  - Adaptação do retorno da API para incluir a lista de telefones.
- **Frontend**:
  - Formulário de criação (`ContactCreateComponent`) atualizado com `FormArray` para adicionar/remover campos de telefone dinamicamente.
  - Listagem (`ContactListComponent`) ajustada para exibir múltiplos telefones separados por vírgula.
  - Tratamento de dados no `ContactService` para converter objetos de telefone em lista de strings para exibição.

### 2. Busca de Contatos (Search)
- **Backend**:
  - Implementação do endpoint `POST /contact/search` no `ContactService`.
  - Filtra contatos por correspondência parcial em `name` ou `email`.
- **Frontend**:
  - Implementação de busca reativa no `ContactListComponent`.
  - Utilização de operadores RxJS (`debounceTime`, `distinctUntilChanged`, `switchMap`) para otimizar as requisições enquanto o usuário digita.

### 3. Módulo de Usuários (User)
- **Backend**:
  - Criação da tabela `user` e migração SQL correspondente.
  - Implementação do `UserService` com métodos `register` (cadastro) e `list` (listagem).
  - Senhas armazenadas de forma segura utilizando `password_hash`.
  - O campo `password` é automaticamente ocultado nas respostas JSON da API.
- **Frontend**:
  - Criação das telas de Listagem e Cadastro de Usuários.
  - Validação de formulário (campos obrigatórios, e-mail válido, senha mínima de 6 caracteres).
  - Adição de rotas e item de menu para navegação.

### 4. Infraestrutura e Correções
- **Docker**:
  - Adição de `Dockerfile` e `docker-compose.yml` para facilitar a execução do ambiente (PHP 8.1 + MySQL).
- **Correções**:
  - Resolução de problemas de CORS causados por *Deprecated Warnings* do PHP 8.4 interferindo nos headers HTTP.
  - Ajustes de compatibilidade de dependências no `package.json` do Frontend.

### 5. Testes Automatizados
- **Frontend (Jasmine/Karma)**:
  - **Services**:
    - `ContactService`: Testes de CRUD completo (List, Get, Create, Update) e funcionalidade de Busca (Search).
    - `UserService`: Testes de Listagem e Criação de usuários.
  - **Components**:
    - `ContactListComponent`:
      - Inicialização e carregamento de dados.
      - Busca reativa e tratamento de resultados vazios.
    - `ContactCreateComponent`:
      - Inicialização do formulário com `FormArray` para telefones.
      - Adição e remoção dinâmica de campos de telefone.
      - Validação de campos obrigatórios e formato de e-mail.
      - Envio de formulário com sucesso e navegação.
    - `UserListComponent`:
      - Inicialização e exibição da lista de usuários.
    - `UserCreateComponent`:
      - Validação de formulário (Nome, Email, Senha mínima).
      - Tratamento de erros de submissão.
      - Navegação após sucesso.

## Como Rodar com Docker

1. Certifique-se de ter o Docker e Docker Compose instalados.
2. Na raiz da pasta do backend, execute:
   ```bash
   docker-compose up -d --build
   ```
3. O Backend estará disponível em `http://localhost:8282`.
4. O Frontend containerizado ou rodando localmente via `npm start` estará em `http://localhost:4200`.

## Como Rodar os Testes (Frontend)

Para executar os testes unitários do frontend, certifique-se de ter as dependências instaladas e execute o seguinte comando na pasta `front-end`:

```bash
# Instalar dependências (caso ainda não tenha feito)
npm install

# Rodar os testes (abre o navegador Chrome)
ng test

# Rodar os testes em modo Headless (sem interface gráfica, ideal para CI/CD)
ng test --watch=false --browsers=ChromeHeadless
```

<img width="1913" height="972" alt="image" src="https://github.com/user-attachments/assets/4e269c07-f6dd-43d7-9f84-a8ccc53e56b6" />
<img width="1918" height="943" alt="image" src="https://github.com/user-attachments/assets/58cbd94e-0465-4da1-b9ba-aeebebd5c66f" />
<img width="1917" height="946" alt="image" src="https://github.com/user-attachments/assets/65c2f82a-84fe-4277-a0c6-4e4232fedef0" />
<img width="1919" height="933" alt="image" src="https://github.com/user-attachments/assets/c9fc32cb-4d23-4d5d-a448-b50f3550d563" />
<img width="982" height="474" alt="image" src="https://github.com/user-attachments/assets/b7f837f9-c06c-4733-a130-106552efafb5" />
<img width="1071" height="283" alt="image" src="https://github.com/user-attachments/assets/85be0c53-eb8d-43df-aa9a-82e0bc44e278" />







