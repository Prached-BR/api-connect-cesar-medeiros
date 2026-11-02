# API Connect — Gerenciamento de Usuários (MVP)

> 🚀 Back-end RESTful para a plataforma de gerenciamento de usuários da startup.
> Construído com **Node.js + Express**, persistência em memória e validações de entrada.

---

## 1. Objetivo

Fornecer, de forma ágil e previsível, os serviços HTTP essenciais para o ciclo de
vida de perfis de usuário: **criação, leitura, atualização e remoção (CRUD)**.

Este é um **MVP (Produto Mínimo Viável)** projetado para validar a ideia de negócio
e alimentar a equipe de front-end durante a construção da interface. A API segue
padrões RESTful estritos: verbos HTTP semânticos, códigos de status coerentes e
corpos de requisição/resposta exclusivamente em **JSON**.

---

## 2. Tecnologias Utilizadas

| Camada | Tecnologia | Versão |
|---|---|---|
| Runtime | **Node.js** | LTS (>= 18.x) |
| Linguagem | **JavaScript (CommonJS)** | ES2020+ |
| Microframework HTTP | **Express** | `^5.2.1` |
| CORS | **cors** | `^2.8.6` |
| Geração de IDs | **uuid** (UUID v4) | `^14.0.2` |
| Hot-reload (dev) | **nodemon** | `^3.1.14` |
| Gerenciador de pacotes | **npm** | (nativo do Node) |
| Versionamento | **Git** | — |

> A persistência é realizada **em memória RAM** via array nativo do JavaScript,
> sem dependência de banco de dados nesta primeira versão.

---

## 3. Estrutura de Diretórios

```
api-connect/
├── .gitignore
├── package.json
├── package-lock.json
├── server.js                      ← Ponto de entrada (bootstrap Express)
└── src/
    ├── data/
    │   └── users.js               ← Persistência em memória + operações CRUD
    ├── middleware/
    │   └── validation.js          ← Validações de entrada e regras de integridade
    ├── controllers/
    │   └── userController.js      ← Handlers HTTP e formatação de respostas
    └── routes/
        └── userRoutes.js          ← Definição declarativa dos endpoints REST
```

---

## 4. Pré-requisitos

- **Node.js** versão 18 ou superior instalado
  (verifique com `node -v` no terminal)
- **npm** versão 9 ou superior
  (verifique com `npm -v`)
- **Git** instalado para versionamento

---

## 5. Passo a Passo para Execução Local

### 5.1 Instale as dependências
```bash
npm install
```

### 5.2 Inicie o servidor

**Modo desenvolvimento (com hot-reload automático — recomendado):**
```bash
npm run dev
```

**Modo produção (sem reinícios automáticos):**
```bash
npm start
```

### 5.3 Verifique se está rodando

Ao iniciar, o terminal exibirá:
```
========================================
  API de Gerenciamento de Usuários (MVP)
========================================
  Servidor rodando em: http://localhost:3000
  Health check:      http://localhost:3000/api/health
  Endpoint usuários: http://localhost:3000/api/users
========================================
```

### 5.4 Valide o health check

No navegador, Postman, Insomnia ou Thunder Client do VS Code, faça uma requisição:

```
GET http://localhost:3000/api/health
```

Resposta esperada (**200 OK**):
```json
{
  "status": "ok",
  "message": "API de Usuários operacional",
  "timestamp": "2026-08-23T00:00:00.000Z"
}
```

> A porta padrão é **3000**. Para alterá-la, defina a variável de ambiente antes
> de iniciar: `PORT=8080 npm start`.

---

## 6. Referência de Endpoints

Todos os endpoints de usuário vivem sob o prefixo:
```
http://localhost:3000/api/users
```

### 6.1 Resumo dos Verbos + Rotas

| Ação | Verbo HTTP | Rota | Corpo JSON? |
|---|---|---|---|
| 📋 Listar todos os usuários | `GET` | `/api/users` | ❌ |
| 🔍 Buscar 1 usuário por ID | `GET` | `/api/users/:id` | ❌ |
| ➕ Criar novo usuário | `POST` | `/api/users` | ✅ |
| ✏️ Substituir usuário completo | `PUT` | `/api/users/:id` | ✅ |
| 🩹 Atualizar campo(s) parcial | `PATCH` | `/api/users/:id` | ✅ |
| 🗑️ Remover usuário | `DELETE` | `/api/users/:id` | ❌ |

### 6.2 Tabela Completa com Exemplos

---

#### ✅ 1. Criar usuário — `POST /api/users`

**Status de sucesso:** `201 Created`

**Body (envio):**
```json
{
  "nome": "Ana Costa",
  "email": "ana.costa@exemplo.com",
  "idade": 31,
  "cargo": "UX Designer"
}
```

| Campo | Tipo | Obrigatório | Regras |
|---|---|---|---|
| `nome` | string | ✅ Sim | ≥ 2 caracteres, não-vazio |
| `email` | string | ✅ Sim | Formato `usuario@dominio.tld`, único |
| `idade` | integer | ❌ Não | Se enviado: entre 0 e 150 |
| `cargo` | string | ❌ Não | Livre, pode ser `null` |

**Resposta sucesso (201):**
```json
{
  "status": "success",
  "code": 201,
  "message": "Usuário criado com sucesso",
  "dados": {
    "id": "a1b2c3d4-aaaa-bbbb-cccc-dddd11112222",
    "nome": "Ana Costa",
    "email": "ana.costa@exemplo.com",
    "idade": 31,
    "cargo": "UX Designer",
    "criadoEm": "2026-08-23T17:42:31.404Z",
    "atualizadoEm": "2026-08-23T17:42:31.404Z"
  }
}
```

**Resposta erro (400 — dados inválidos ou faltantes):**
```json
{
  "status": "error",
  "code": 400,
  "message": "Dados de entrada inválidos",
  "erros": [
    "Campo \"email\" é obrigatório e deve ser um texto não vazio",
    "Campo \"nome\" deve ter pelo menos 2 caracteres"
  ]
}
```

**Resposta erro (409 — email duplicado):**
```json
{
  "status": "error",
  "code": 409,
  "message": "Conflito de dados",
  "detalhe": "Já existe um usuário cadastrado com este e-mail"
}
```

---

#### ✅ 2. Listar todos os usuários — `GET /api/users`

**Status de sucesso:** `200 OK`

**Resposta (200):**
```json
{
  "status": "success",
  "code": 200,
  "total": 3,
  "dados": [
    {
      "id": "32f36b78-55bf-4c30-a810-2f15ae67fe93",
      "nome": "João Silva",
      "email": "joao.silva@exemplo.com",
      "idade": 28,
      "cargo": "Desenvolvedor Front-end",
      "criadoEm": "2026-01-15T10:30:00.000Z",
      "atualizadoEm": "2026-01-15T10:30:00.000Z"
    },
    { "...": "..." }
  ]
}
```

---

#### ✅ 3. Buscar usuário por ID — `GET /api/users/:id`

**Exemplo de URL:**
```
GET http://localhost:3000/api/users/32f36b78-55bf-4c30-a810-2f15ae67fe93
```

**Sucesso (200):** idêntico ao objeto `dados` do POST acima.

**Erro (404 — ID não cadastrado):**
```json
{
  "status": "error",
  "code": 404,
  "message": "Usuário não encontrado",
  "detalhe": "Nenhum usuário encontrado com o ID: 00000000-0000-0000-0000-000000000000"
}
```

---

#### ✅ 4. Atualização TOTAL (PUT) — `PUT /api/users/:id`

Semântica REST: **substitui todo o recurso** (todos os campos obrigatórios devem ser reenviados).
**Status sucesso:** `200 OK`

**Body:** idêntico ao do POST.

---

#### ✅ 5. Atualização PARCIAL (PATCH) — `PATCH /api/users/:id`

Semântica REST: **atualiza apenas os campos enviados** (1 ou mais, sem precisar reenviar todos).
**Status sucesso:** `200 OK`

**Body exemplo (atualiza só cargo e idade):**
```json
{
  "cargo": "Senior UX Designer",
  "idade": 32
}
```

**Regra de validação do PATCH:**
- Pelo menos **1 campo** deve ser informado (se o body for `{}` retorna 400).
- Mesmas regras de nome/email/idade/cargo do POST, mas só aplicadas aos campos presentes.

**Resposta sucesso (200):**
```json
{
  "status": "success",
  "code": 200,
  "message": "Usuário atualizado com sucesso",
  "dados": {
    "...": "...",
    "atualizadoEm": "2026-08-23T18:10:00.000Z"
  }
}
```

---

#### ✅ 6. Remover usuário — `DELETE /api/users/:id`

**Status sucesso:** `200 OK` (retorna mensagem e ID removido para clareza).

**Resposta (200):**
```json
{
  "status": "success",
  "code": 200,
  "message": "Usuário removido com sucesso",
  "idRemovido": "a1b2c3d4-aaaa-bbbb-cccc-dddd11112222"
}
```

**Erro (404 — ID não encontrado):** idêntico ao cenário do GET por ID.

---

## 7. Formato Padrão dos Envelopes JSON

Todas as respostas seguem um envelope **determinístico**:

| Tipo | Campos raiz |
|---|---|
| ✅ **Sucesso** | `{ status: "success", code: <numero HTTP>, message?: "...", total?: N, dados: <objeto ou array> }` |
| ❌ **Erro** | `{ status: "error", code: <numero HTTP>, message: "...", erros?: [...], detalhe?: "..." }` |

- `status`: `"success"` ou `"error"` — convenção textual para fácil inspeção.
- `code`: número do status HTTP (redundante, útil para logs de clientes).
- `dados`: presente em leituras/gravações que retornam entidades.
- `erros`: array com lista textual de violações de validação (apenas 400).
- `detalhe`: string explicativa contextual (erros 404/409).

---

## 8. Dados Seed Iniciais

A aplicação já cria 3 usuários de exemplo automaticamente ao subir, para facilitar o
teste do front-end sem cadastros prévios:

1. **João Silva** — Dev Front-end, 28 anos
2. **Maria Souza** — Product Manager, 34 anos
3. **Pedro Santos** — Dev Back-end, 25 anos

> ⚠️ **Atenção:** por se tratar de persistência em memória, todo novo cadastro/edição/remoção
> some ao reiniciar o servidor. Isso é comportamento esperado do MVP. Versões futuras
> substituirão `src/data/users.js` por integração com banco de dados relacional (ex.: PostgreSQL).

---

## 9. Versionamento Git — Primeiros Passos

O projeto já está configurado com **.gitignore** (ignora `node_modules/`, logs e arquivos de IDE).
Para versionar localmente e enviar ao GitHub:

```bash
# 1. Inicialize o repositório (caso ainda não exista .git/)
git init
git add .
git commit -m "feat: primeira versao da API Connect (CRUD usuarios)"

# 2. Renomeie a branch principal para o padrao atual
git branch -M main
```

Em seguida, **no site do GitHub**, crie um novo repositório **público** com o nome:
```
api-connect-nome-sobrenome
```
(ex.: `api-connect-lucas-fernandes`)

Depois, de volta ao terminal, ligue o repositório local ao remoto e envie:

```bash
git remote add origin https://github.com/<SEU_USUARIO_GITHUB>/api-connect-nome-sobrenome.git
git push -u origin main
```

Atualize o campo `repository` do `package.json` com a URL do seu repositório e commite a alteração.

---

## 10. Próximos Passos (Roadmap)

- [ ] Persistência real com **PostgreSQL** + camada de Repository
- [ ] Autenticação JWT com middleware `auth.js` em `src/middleware/`
- [ ] Paginação, filtros e ordenação no GET /api/users
- [ ] Testes unitários (Jest) para `data/users.js` e `middleware/validation.js`
- [ ] Testes de integração (Supertest) para cada rota
- [ ] Dockerfile + docker-compose para PostgreSQL
- [ ] Pipeline CI/CD (GitHub Actions) com lint + testes em cada PR
- [ ] Documentação Swagger/OpenAPI automatizada

---

**Autor:** Prached_Br e Equipe Back-end Júnior da startup  
**Versão atual:** `1.0.0`  
**Licença:** MIT
