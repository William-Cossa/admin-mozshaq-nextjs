# CLAUDE.md — admin-mozshaq-nextjs

Ficheiro de contexto para assistentes AI. Lê este ficheiro primeiro antes de qualquer tarefa neste projecto.

---

## O que é esta app?

Plataforma de **administração de escola de cursos online** baseada em Moçambique. Permite gerir cursos, instrutores, alunos, inscrições e pagamentos com comprovativo.

---

## Stack Tecnológica

### Frontend (Next.js — raiz `/`)
| Tech | Detalhe |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS + shadcn/ui |
| Ícones | Lucide React |
| Animações | Framer Motion |
| Moeda | MZN (Metical Moçambicano) |
| Locale | pt-MZ / pt-BR |

### Backend (`/backend/`)
| Tech | Detalhe |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| ORM | Prisma 7 (cliente em `backend/generated/prisma`) |
| Base de dados | PostgreSQL (via Prisma Postgres local) |
| Linguagem | TypeScript |
| Dev server | `tsx watch` |
| IDs | UUIDv7 — gerado com `import { v7 as uuidv7 } from "uuid"` |

**Porta da API:** `3000`  
**URL da BD:** definida em `backend/.env` → `DATABASE_URL`

---

## Estrutura de Pastas

```
/                        # Frontend Next.js
├── app/
│   ├── (dashboard)/     # Rotas protegidas do painel
│   │   ├── dashboard/
│   │   ├── courses/
│   │   ├── students/
│   │   ├── enrollments/
│   │   ├── payments/
│   │   ├── instructors/
│   │   ├── users/
│   │   ├── reports/
│   │   ├── settings/
│   │   └── help/
│   └── api/             # API Routes do Next.js (se usadas)
├── components/
│   ├── courses/         # Formulários de curso, cards, curriculum
│   ├── students/        # Listagem e gestão de alunos
│   ├── payments/        # Tabela, modal de detalhe, modal de rejeição
│   ├── enrollments/     # Pesquisa e seleção de status
│   ├── layout/          # Sidebar, header
│   ├── charts/          # Gráficos do dashboard
│   └── ui/              # Componentes shadcn/ui
├── types/types.ts       # Todos os tipos TypeScript do frontend
├── data.ts              # Dados mock (users, courses, payments)
├── db.json              # DB mock JSON (enrollments, courses, payments)
└── backend/
    ├── prisma/
    │   └── schema.prisma  # Schema da BD (fonte da verdade)
    ├── src/
    │   └── index.ts       # Entry point Express
    └── .env               # DATABASE_URL
```

---

## Entidades de Base de Dados

### Diagrama de Relações

```
User (admins/managers)
Student ──── Enrollment ──── Course ──── Module ──── Lesson
     │            │              │
     └─ Payment ──┘         CourseClass
                            CourseInstructor ──── Instructor
```

### Models Prisma

| Model | Tabela | Descrição |
|---|---|---|
| `User` | `users` | Admins e managers da plataforma |
| `Student` | `students` | Alunos inscritos |
| `Instructor` | `instructors` | Formadores dos cursos |
| `Course` | `courses` | Cursos disponíveis |
| `CourseInstructor` | `course_instructors` | Relação N:N Curso↔Instructor |
| `Module` | `modules` | Módulos/capítulos de um curso |
| `Lesson` | `lessons` | Aulas dentro de um módulo |
| `CourseClass` | `course_classes` | Turmas (para PRESENCIAL/HIBRIDO) |
| `Enrollment` | `enrollments` | Inscrições Student↔Course (unique) |
| `Payment` | `payments` | Pagamentos com comprovativo |

### Enums

| Enum | Valores |
|---|---|
| `Role` | `ADMIN`, `MANAGER` |
| `UserStatus` | `ACTIVE`, `INACTIVE`, `PENDING` |
| `StudentStatus` | `ACTIVE`, `INACTIVE`, `PENDING`, `DROPPED` |
| `InstructorStatus` | `ACTIVO`, `INACTIVO` |
| `CourseType` | `ONLINE`, `PRESENCIAL`, `HIBRIDO` |
| `CourseStatus` | `RASCUNHO`, `PUBLICADO`, `ENCERRADO` |
| `CourseLevel` | `INICIANTE`, `INTERMEDIARIO`, `AVANCADO` |
| `ModuleStatus` | `DRAFT`, `PUBLISHED`, `ARCHIVED` |
| `LessonType` | `VIDEO`, `TEXTO`, `QUIZ`, `LIVE` |
| `CourseClassStatus` | `ABERTA`, `LOTADA`, `FINALIZADA` |
| `EnrollmentStatus` | `ACTIVE`, `PENDING`, `COMPLETED`, `DROPPED` |
| `PaymentStatus` | `PENDING`, `APPROVED`, `REJECTED` |

---

## Convenções de Código

### IDs — UUIDv7
```typescript
import { v7 as uuidv7 } from "uuid";

// Sempre gerar o ID na aplicação antes de criar no Prisma
const newCourse = await prisma.course.create({
  data: {
    id: uuidv7(),
    title: "...",
    // ...
  },
});
```

### Prisma Client
```typescript
// Importar o cliente gerado
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();
```

### Comandos Úteis Backend
```bash
cd backend

# Validar schema
npx prisma validate

# Gerar cliente Prisma
npx prisma generate

# Criar e aplicar migração
npx prisma migrate dev --name <nome>

# Abrir Prisma Studio
npx prisma studio

# Dev server
npm run dev
```

---

## Páginas do Dashboard

| Rota | Função |
|---|---|
| `/dashboard` | Estatísticas gerais, gráficos de tendências |
| `/courses` | CRUD de cursos (com módulos e turmas) |
| `/students` | Listagem e gestão de alunos |
| `/enrollments` | Gerir inscrições por aluno/curso |
| `/payments` | Aprovar/rejeitar pagamentos com comprovativo |
| `/instructors` | CRUD de formadores |
| `/users` | Gestão de admins/managers |
| `/reports` | Relatórios e analytics |
| `/settings` | Configurações da plataforma |

---

## Pagamentos — Fluxo

1. Aluno submete comprovativo de pagamento (upload de imagem)
2. Pagamento fica com `status: PENDING`
3. Admin vê o comprovativo no modal de detalhes
4. Admin **Aprova** → `status: APPROVED`, `approvedAt: now()`
5. Admin **Rejeita** → `status: REJECTED`, `rejectionReason: "..."`, `rejectedAt: now()`

---

## Notas Importantes

- A app usa **Metical Moçambicano (MZN)** como moeda
- Texto da UI em **Português (pt-MZ)**
- O campo `studentsCount` em `Course` é desnormalizado (atualizar via trigger/lógica de negócio)
- `Payment` tem `studentName` e `courseName` desnormalizados para preservar histórico
- `Enrollment` tem constraint `@@unique([studentId, courseId])` — um aluno não pode inscrever-se duas vezes no mesmo curso
