# Requirements Backend - Sistema LAFAC

## 1. Autenticação e Autorização

### 1.1 Sistema de Autenticação
- [ ] Endpoint POST `/auth/login` (email, senha)
- [ ] Geração de JWT token
- [ ] Refresh token mechanism
- [ ] Endpoint POST `/auth/logout`
- [ ] Endpoint POST `/auth/refresh-token`
- [ ] Endpoint POST `/auth/forgot-password`
- [ ] Endpoint POST `/auth/reset-password`
- [ ] Hash de senhas com bcrypt/argon2

### 1.2 Autorização e Permissões
- [ ] Middleware de autenticação (verificar JWT)
- [ ] Middleware de autorização (verificar roles)
- [ ] Sistema de roles/funções:
  - [ ] Superadmin
  - [ ] President
  - [ ] Vice-President
  - [ ] Director
  - [ ] Member
- [ ] Controle de permissões por recurso (CRUD)
- [ ] Validação de ownership (usuário só edita seus próprios dados)

### 1.3 Sessões
- [ ] Gerenciamento de sessões ativas
- [ ] Expiração de tokens (15min access, 7d refresh)
- [ ] Revogação de tokens

## 2. Usuários/Membros

### 2.1 CRUD de Usuários
- [ ] GET `/users` - Listar usuários (paginado, filtros)
- [ ] GET `/users/:id` - Buscar usuário por ID
- [ X ] POST `/users` - Criar novo usuário
- [ ] PUT `/users/:id` - Atualizar usuário
- [ ] PATCH `/users/:id/status` - Ativar/desativar usuário
- [ ] DELETE `/users/:id` - Excluir usuário (soft delete)

### 2.2 Modelo de Dados - User
```
- id (CUID) 
- name (string, required)
- email (string, unique, required)
- password (string, hashed, required)
- birthdate (date)
- enrollment_number (string)
- institution (string)
- period (string)
- role (enum: superadmin, president, vice-president, member)
- avatar_url (string)
- is_active (boolean, default: true)
- created_at (timestamp)
- updated_at (timestamp)
- last_login (timestamp)
- login_count (integer, default: 0)
```

### 2.3 Queries e Filtros
- [ ] Busca por nome ou email (LIKE/ILIKE)
- [ ] Filtro por role
- [ ] Filtro por status (ativo/inativo)
- [ ] Ordenação (nome, data_criacao, último_login)
- [ ] Paginação (limit, offset)
- [ ] Contadores por status (ativos, inativos, diretoria, total)

### 2.4 Validações
- [ X ] Email válido e único
- [ ] Data de nascimento válida (maior de 16 anos)
- [ X ] Senha forte (min 8 chars)

## 3. Atividades

### 3.1 CRUD de Atividades
- [ ] GET `/activities` - Listar atividades (paginado, filtros)
- [ ] GET `/activities/:id` - Buscar atividade por ID
- [ ] POST `/activities` - Criar nova atividade
- [ ] PUT `/activities/:id` - Atualizar atividade
- [ ] PATCH `/activities/:id/status` - Mudar status
- [ ] PATCH `/activities/:id/complete` - Marcar como concluída
- [ ] DELETE `/activities/:id` - Excluir atividade

### 3.2 Modelo de Dados - Activity
```
- id (CUID)
- title (string, required)
- description (text)
- status (enum: pending, completed, overdue)
- priority (enum: low, medium, high, urgent)
- due_date (timestamp, required)
- created_by (FK user_id)
- created_at (timestamp)
- updated_at (timestamp)
- completed_at (timestamp)
```

### 3.3 Relacionamento - Atribuições
```
Tabela: activity_assignments
- id (CUID)
- activity_id (FK)
- user_id (FK)
- assigned_at (timestamp)
- assigned_by (FK user_id)
```

- [ ] POST `/activities/:id/assign` - Atribuir membros
- [ ] DELETE `/activities/:id/assign/:userId` - Remover atribuição

### 3.4 Queries e Filtros
- [ ] Filtro por status (pending, overdue, urgent, in_progress, completed)
- [ ] Filtro por prioridade
- [ ] Filtro por responsável (user_id)
- [ ] Filtro por range de datas
- [ ] Busca por título
- [ ] Ordenação (prioridade, data, status)
- [ ] Contadores por status

### 3.5 Lógica de Negócio
- [ ] Calcular se atividade está atrasada (due_date < now)
- [ ] Calcular urgência (due_date próxima)
- [ ] Atualizar status automaticamente
- [ ] Job/cron para verificar prazos diariamente
- [ ] Notificar membros de atividades próximas/atrasadas

## 4. Calendário/Eventos

### 4.1 CRUD de Eventos
- [ ] GET `/events` - Listar eventos (paginado, filtros)
- [ ] GET `/events/:id` - Buscar evento por ID
- [ ] GET `/events/calendar/:year/:month` - Eventos do mês
- [ ] POST `/events` - Criar novo evento
- [ ] PUT `/events/:id` - Atualizar evento
- [ ] DELETE `/events/:id` - Excluir evento

### 4.2 Modelo de Dados - Event
```
- id (CUID)
- title (string, required)
- description (text)
- type (enum: symposium, lecture, workshop, action, course, other)
- start_datetime (timestamp, required)
- end_datetime (timestamp)
- location (string)
- is_completed (boolean, default: false)
- created_by (FK user_id)
- created_at (timestamp)
- updated_at (timestamp)
```

### 4.3 Relacionamento - Participantes
```
Tabela: event_participants
- id (CUID)
- event_id (FK)
- user_id (FK)
- joined_at (timestamp)
```

- [ ] POST `/events/:id/participants` - Adicionar participantes
- [ ] DELETE `/events/:id/participants/:userId` - Remover participante

### 4.4 Queries e Filtros
- [ ] Filtro por tipo de evento
- [ ] Filtro por status (futuro, passado, concluído)
- [ ] Filtro por range de datas
- [ ] Busca por título
- [ ] Ordenação (data, tipo)
- [ ] Eventos do dia/semana/mês

## 5. Postagens (Social Media)

### 5.1 CRUD de Postagens
- [ ] GET `/posts` - Listar postagens (paginado, filtros)
- [ ] GET `/posts/:id` - Buscar postagem por ID
- [ ] POST `/posts` - Criar nova postagem
- [ ] PUT `/posts/:id` - Atualizar postagem
- [ ] PATCH `/posts/:id/status` - Mudar status
- [ ] DELETE `/posts/:id` - Excluir postagem

### 5.2 Modelo de Dados - Post
```
- id (CUID)
- title (string, required)
- description (text)
- type (enum: feed_post, story, reels)
- status (enum: in_production, posted, expired, done)
- deadline (timestamp)
- platforms (array: instagram, facebook, twitter)
- related_links (array of strings)
- created_by (FK user_id)
- created_at (timestamp)
- updated_at (timestamp)
- published_at (timestamp)
```

### 5.3 Relacionamento - Atribuições de Funções
```
Tabela: post_assignments
- id (CUID)
- post_id (FK)
- user_id (FK)
- role (enum: designer, researcher, video_editor, copywriter)
- status (enum: pending, in_progress, completed)
- assigned_at (timestamp)
```

- [ ] POST `/posts/:id/assignments` - Atribuir funções
- [ ] PATCH `/posts/:id/assignments/:id/status` - Atualizar status da atribuição

### 5.4 Queries e Filtros
- [ ] Filtro por status
- [ ] Filtro por tipo
- [ ] Filtro por responsável
- [ ] Filtro por prazo (próximos, atrasados)
- [ ] Busca por título
- [ ] Contador por status

## 6. Grupos de Estudo

### 6.1 CRUD de Grupos de Estudo
- [ ] GET `/study-groups` - Listar grupos (paginado, filtros)
- [ ] GET `/study-groups/:id` - Buscar grupo por ID
- [ ] POST `/study-groups` - Criar novo grupo
- [ ] PUT `/study-groups/:id` - Atualizar grupo
- [ ] PATCH `/study-groups/:id/favorite` - Marcar como favorito
- [ ] DELETE `/study-groups/:id` - Excluir grupo

### 6.2 Modelo de Dados - StudyGroup
```
- id (CUID)
- title (string, required)
- instructor_id (FK user_id, required)
- mode (enum: online, in_person)
- datetime (timestamp, required)
- location (string)
- meeting_link (string)
- status (enum: pending, done)
- is_finished (boolean)
- created_by (FK user_id)
- created_at (timestamp)
- updated_at (timestamp)
```

### 6.3 Relacionamento - Atribuições
```
Tabela: study_group_assignments
- id (CUID)
- study_group_id (FK)
- user_id (FK)
- role (enum: research_powerpoint, quizzes_material)
- assigned_at (timestamp)
```

- [ ] POST `/study-groups/:id/assignments` - Atribuir responsáveis

### 6.4 Relacionamento - Materiais
```
Tabela: study_group_materials
- id (CUID)
- study_group_id (FK)
- file_name (string)
- file_url (string)
- file_type (string)
- uploaded_by (FK user_id)
- uploaded_at (timestamp)
```

- [ ] POST `/study-groups/:id/materials` - Upload de material
- [ ] GET `/study-groups/:id/materials` - Listar materiais
- [ ] DELETE `/study-groups/:id/materials/:materialId` - Excluir material

### 6.5 Queries e Filtros
- [ ] Filtro por status
- [ ] Filtro por modo (online/presencial)
- [ ] Filtro por ministrante
- [ ] Filtro por data
- [ ] Busca por título
- [ ] Grupos favoritos do usuário

## 7. Processo Seletivo

### 7.1 Configuração do Processo
- [ ] GET `/selection-process/config` - Buscar configuração atual
- [ ] PUT `/selection-process/config` - Atualizar configuração
- [ ] PATCH `/selection-process/activate` - Ativar processo
- [ ] PATCH `/selection-process/deactivate` - Desativar processo

### 7.2 Modelo de Dados - SelectionProcessConfig
```
- id (CUID)
- is_active (boolean, default: false)
- test_weight (integer, 0-100)
- interview_weight (integer, 0-100)
- updated_at (timestamp)
```

- [ ] Validação: test_weight + interview_weight = 100

### 7.3 CRUD de Candidatos
- [ ] GET `/candidates` - Listar candidatos (paginado, filtros)
- [ ] GET `/candidates/:id` - Buscar candidato por ID
- [ ] POST `/candidates` - Criar novo candidato
- [ ] PUT `/candidates/:id` - Atualizar candidato
- [ ] PATCH `/candidates/:id/status` - Mudar status (approved/rejected)
- [ ] DELETE `/candidates/:id` - Excluir candidato

### 7.4 Modelo de Dados - Candidate
```
- id (CUID)
- name (string, required)
- email (string, required)
- phone (string)
- institution (string)
- period (string)
- enrollment (string)
- birthdate (date)
- motivation_letter (text, required)
- status (enum: pending, approved, rejected)
- test_score (decimal)
- interview_score (decimal)
- final_score (decimal, calculated)
- documents_url (string)
- applied_at (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
```

### 7.5 Entrevistas
```
Tabela: interviews
- id (CUID)
- candidate_id (FK)
- scheduled_datetime (timestamp)
- interviewer_id (FK user_id)
- score (decimal, 0-10)
- notes (text)
- completed (boolean, default: false)
- created_at (timestamp)
- updated_at (timestamp)
```

- [ ] POST `/candidates/:id/interviews` - Agendar entrevista
- [ ] PUT `/interviews/:id` - Atualizar entrevista
- [ ] PATCH `/interviews/:id/complete` - Marcar como concluída

### 7.6 Entrevistadores
- [ ] GET `/interviewers` - Listar entrevistadores
- [ ] POST `/interviewers` - Adicionar entrevistador
- [ ] DELETE `/interviewers/:userId` - Remover entrevistador

### 7.7 Queries e Filtros
- [ ] Filtro por status (pending, approved, rejected)
- [ ] Filtro por instituição
- [ ] Busca por nome ou email
- [ ] Ordenação (data, nome, nota)
- [ ] Estatísticas (total, aprovados, reprovados, pendentes)

### 7.8 Lógica de Negócio
- [ ] Calcular nota final: (test_score × test_weight) + (interview_score × interview_weight)
- [ ] Atualizar nota final quando scores mudam
- [ ] Validar pesos ao salvar configuração
- [ ] Bloquear inscrições quando processo inativo

## 8. Notificações

### 8.1 Sistema de Notificações
- [ ] GET `/notifications` - Listar notificações do usuário
- [ ] GET `/notifications/unread-count` - Contar não lidas
- [ ] PATCH `/notifications/:id/read` - Marcar como lida
- [ ] PATCH `/notifications/read-all` - Marcar todas como lidas
- [ ] DELETE `/notifications/:id` - Excluir notificação

### 8.2 Modelo de Dados - Notification
```
- id (CUID)
- user_id (FK, required)
- type (enum: activity_assigned, activity_due_soon, activity_overdue, 
        event_created, event_reminder, study_group_created, 
        post_assigned, candidate_applied, interview_scheduled)
- title (string, required)
- message (text)
- related_id (CUID) // ID do recurso relacionado
- related_type (string) // activity, event, post, etc.
- is_read (boolean, default: false)
- created_at (timestamp)
```

### 8.3 Criação de Notificações
- [ ] Service para criar notificações em batch
- [ ] Trigger ao criar/atribuir atividade
- [ ] Trigger ao criar evento
- [ ] Trigger ao aproximar prazo de atividade
- [ ] Trigger ao nova inscrição de candidato
- [ ] Trigger ao agendar entrevista

### 8.4 Entrega de Notificações
- [ ] WebSockets/SSE para notificações em tempo real (opcional)
- [ ] Email notifications (opcional)
- [ ] Push notifications (opcional)

## 9. Upload de Arquivos

### 9.1 Upload Service
- [ ] POST `/upload` - Upload de arquivo único
- [ ] DELETE `/upload/:filename` - Excluir arquivo

### 9.2 Configuração
- [ ] Integração com S3/Cloud Storage ou armazenamento local
- [ ] Validação de tipo de arquivo (images, PDFs, docs)
- [ ] Validação de tamanho máximo (ex: 10MB)
- [ ] Geração de thumbnails para imagens
- [ ] Nomes de arquivo únicos (CUID)
- [ ] URLs públicas ou assinadas

### 9.3 Relacionamento com Recursos
- [ ] Avatares de usuários
- [ ] Materiais de grupos de estudo
- [ ] Banners de eventos
- [ ] Documentos de candidatos
- [ ] Arquivos de postagens

## 10. Busca e Filtros Globais

### 10.1 Busca Global
- [ ] GET `/search?q=query` - Busca em múltiplos recursos
- [ ] Buscar em: usuários, atividades, eventos, postagens, grupos
- [ ] Retornar resultados agrupados por tipo
- [ ] Paginação de resultados
- [ ] Highlight de termos encontrados

### 10.2 Índices de Busca
- [ ] Criar índices full-text em campos de texto
- [ ] Suporte a busca fuzzy/aproximada (opcional)

## 11. Dashboard e Estatísticas

### 11.1 Endpoints de Estatísticas
- [ ] GET `/dashboard/activities-summary` - Resumo de atividades
- [ ] GET `/dashboard/members-summary` - Resumo de membros
- [ ] GET `/dashboard/upcoming-events` - Próximos eventos
- [ ] GET `/dashboard/recent-activity` - Atividade recente

### 11.2 Métricas
- [ ] Total de atividades por status
- [ ] Total de membros por status
- [ ] Taxa de conclusão de atividades
- [ ] Eventos do mês
- [ ] Postagens publicadas vs pendentes

## 12. Segurança

### 12.1 Proteções
- [ ] Sanitização de inputs
- [ ] Proteção contra SQL Injection (use ORM/prepared statements)
- [ ] Proteção contra XSS (escape outputs)
- [ ] Proteção contra CSRF (tokens)
- [ ] Rate limiting global (ex: 100 req/min por IP)
- [ ] Rate limiting em endpoints sensíveis (login, upload)
- [ ] CORS configurado corretamente
- [ ] Headers de segurança (Helmet.js)
- [ ] HTTPS obrigatório em produção

### 12.2 Validação e Sanitização
- [ X ] Biblioteca de validação (Joi, Yup, Zod)
- [ X ] Validação de todos os inputs
- [ X ] Validação de tipos de dados

### 12.3 Logs e Auditoria
- [ ] Logging de todas as requisições
- [ ] Logging de erros com stack traces
- [ ] Logging de ações sensíveis (login, alteração de permissões)
- [ ] Rotação de logs
- [ ] Monitoramento de logs (opcional: ELK, Datadog)

## 13. Infraestrutura e DevOps

### 13.1 Banco de Dados
- [ X ] PostgreSQL ou MySQL (relacional)
- [ X ] Migrations de schema
- [ ] Seeds para dados iniciais

### 13.2 Cache (Opcional)
- [ ] Redis para cache de sessões
- [ ] Cache de queries frequentes
- [ ] Cache de contadores/estatísticas
- [ ] TTL configurável

### 13.3 Jobs/Workers (Opcional)
- [ ] Queue system (Bull, BullMQ, Sidekiq)
- [ ] Job para verificar prazos de atividades
- [ ] Job para enviar notificações em batch
- [ ] Job para limpar sessões expiradas
- [ ] Job para gerar relatórios

### 13.5 Deploy
- [ ] Docker containerization
- [ X ] Docker Compose para desenvolvimento
- [ X ] CI/CD pipeline (GitHub Actions, GitLab CI)
- [ ] Testes automatizados
- [ ] Staging environment
- [ ] Production environment
- [ X ] Environment variables configuration

## 14. Testes

### 14.1 Testes Unitários
- [ ] Testes de services/business logic
- [ ] Testes de validações
- [ ] Testes de helpers/utilities
- [ ] Coverage mínimo de 70%

### 14.2 Testes de Integração
- [ ] Testes de endpoints da API
- [ ] Testes de autenticação/autorização
- [ ] Testes de queries complexas
- [ ] Testes de relacionamentos

### 14.3 Testes E2E (Opcional)
- [ ] Fluxos principais de usuário
- [ ] Criação de recursos
- [ ] Atualização de recursos
- [ ] Exclusão de recursos

## 15. Documentação

### 15.1 API Documentation
- [ ] Swagger/OpenAPI specification
- [ ] Documentação de todos os endpoints
- [ ] Exemplos de requests/responses
- [ ] Códigos de erro documentados
- [ ] Autenticação documentada

### 15.2 Código
- [ ] README.md com instruções de setup
- [ ] Documentação de arquitetura
- [ ] Fluxos de autenticação/autorização

## 16. Funcionalidades Futuras (Opcionais)

- [ ] WebSockets para real-time updates
- [ ] Integração com Google Calendar API
- [ ] Export de relatórios (PDF, Excel)
- [ ] Versionamento de API (v1, v2)