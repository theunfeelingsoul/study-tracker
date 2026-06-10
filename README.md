# Kanji Tracker

A personal Japanese kanji study application built with Next.js, TypeScript, and Supabase.

## Project Purpose

This project was created to:

- Practice full-stack web development
- Learn React and Next.js
- Learn TypeScript
- Learn database integration with Supabase
- Build a useful tool for studying Japanese kanji

## Current Features

### Kanji Database

Users can store:

- Kanji
- Meaning
- Onyomi reading
- Kunyomi reading
- Example words
- Study day category

### Create Kanji

New kanji entries can be added through a web form and saved directly to the database.

### View Kanji

Saved kanji entries are retrieved from Supabase and displayed in the application.

## Tech Stack

- Next.js
- React
- TypeScript
- Supabase
- PostgreSQL
- Vercel
- Git / GitHub

## Project Status

Current version: MVP v0.1

Completed:

- Database setup
- Supabase integration
- Kanji table creation
- Create (CRUD)
- Read (CRUD)
- Vercel deployment

Planned:

- Study Day filtering
- Flashcard-style review mode
- Random kanji review
- Update kanji entries
- Delete kanji entries
- Progress tracking

## Running Locally

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not commit `.env.local` to GitHub.

## Author

Built as a learning project and personal Japanese study tool.