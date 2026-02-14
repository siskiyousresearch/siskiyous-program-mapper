# College of the Siskiyous - Program Mapper

## Overview
A full-stack web application that displays semester-by-semester academic pathways for College of the Siskiyous programs. Features an AI-powered chatbot (MapperGPT) to help students plan their coursework.

## Recent Changes
- 2026-02-14: Converted from mock data to full-stack with PostgreSQL + Drizzle ORM
- 2026-02-14: Integrated OpenAI via Replit AI Integrations for MapperGPT chatbot with streaming responses
- 2026-02-14: Added dedicated program detail route `/program/:slug` for direct linking
- 2026-02-14: Seeded database with 9 programs (CS, Nursing, Business, Admin Justice, Fire Tech, Welding, Kinesiology, Liberal Arts, Communication Studies)

## Architecture
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui + Framer Motion + wouter routing + TanStack Query
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: OpenAI via Replit AI Integrations (gpt-5.2, streaming SSE)
- **Styling**: Siskiyous branding - Cardinal Red (#8A1538), Montserrat fonts

## Project Structure
```
client/src/
  pages/Home.tsx         - Main dashboard with program grid
  pages/ProgramDetail.tsx - Direct link program view
  components/ChatBot.tsx  - MapperGPT AI advisor (streaming)
  components/ProgramGrid.tsx - Program card grid
  components/PathwayMapper.tsx - Semester-by-semester course map
  components/CourseCard.tsx - Individual course display
  components/Header.tsx   - Navigation header
  lib/types.ts           - TypeScript types for Course/Term/Year/Program
  data/mock-program.ts   - Original mock data (now seeded to DB)
server/
  index.ts               - Express server entry
  routes.ts              - API routes (/api/programs, /api/chat)
  storage.ts             - Database storage interface
  db.ts                  - Drizzle + pg connection
  seed.ts                - Database seed script
shared/
  schema.ts              - Drizzle schema (users, programs, conversations, messages)
```

## Key API Routes
- `GET /api/programs` - List all programs
- `GET /api/programs/:slug` - Get program by slug
- `POST /api/chat` - Chat with MapperGPT (SSE streaming)

## Database
- Programs table with JSONB `years` column storing the full pathway structure
- Conversations and messages tables for chat history (future use)

## User Preferences
- Siskiyous branding with Cardinal Red primary color
- MapperGPT styling reference from external repository
- Data sourced from https://siskiyous.elumenapp.com/public/

## Seed Script
Run `npx tsx server/seed.ts` to populate programs.
