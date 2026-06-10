# Study Tracker Project Log

## Project Vision

Build a Kanji Learning and Review Tool.

Purpose:
- Store personal kanji study notes
- Group kanji by themes and study days
- Review kanji through random practice
- Track learning progress over time

Example Categories/study_day:
- Day 1: Change / System / Flow
- Day 2: Situation / Increase / Continuation

---

## Roadmap

### Phase 1: Database Foundation


- [x] Define database fields
- [x] Create kanji table
- [x] Remove temporary test table
- [x] Enable RLS
- [x] Add policy
- [x] Insert first kanji
- [x] Verify with SELECT *
- [x] Connect Next.js to kanji table

### Phase 2: Kanji Management (CRUD)

- [x] Add kanji form
- [x] View kanji list
- [ ] Edit kanji
- [ ] Delete kanji

### Phase 3: Study Mode

- [ ] Random kanji selection
- [ ] Show answer button
- [ ] Next button
- [ ] Category filtering

### Phase 4: Progress Tracking

- [ ] Track review count
- [ ] Track correct answers
- [ ] Last reviewed date
- [ ] Basic statistics

### Phase 5: Authentication

- [ ] User login
- [ ] Personal kanji collections
- [ ] User-specific progress

---


## 2026-06-10 - Create Kanji Feature Completed

### Completed

- Built a React form for adding kanji
- Added state variables for form inputs
- Connected form to Supabase
- Implemented INSERT operation
- Added automatic list refresh after saving
- Confirmed new records appear immediately without page reload

### Learned

- React form state with useState()
- Event handlers with onChange
- Button click handlers with onClick
- Async functions and await
- Supabase insert()
- Difference between objects and arrays in TypeScript
- Generic types such as useState<Row[]>()

### CRUD Progress

- Create ✅
- Read ✅
- Update ⏳
- Delete ⏳

### Current Status

Users can add new kanji entries through the web application and immediately see them displayed from the database.

Kanji Trainer

Database
├── Create ✅
├── Read ✅
├── Update ⏳
└── Delete ⏳

Study Features
├── Day Selection ⏳
├── Random Kanji ⏳
├── Show Answer ⏳
└── Next Kanji ⏳

### Next Goal

Transform the kanji list into a study/review tool with "Show Answer" and "Next Kanji" functionality.
Phase 3 — Study Day Filter

The next tasks are:
1. Select Day 1 / Day 2
2. Filter kanji by study_day
3. Show one random kanji
4. Add Show Answer button
5. Add Next Kanji button

## 2026-06-07 - Kanji Table Created

### Completed

- Created the kanji table in Supabase
- Added fields:
  - id
  - kanji
  - meaning
  - onyomi
  - kunyomi
  - examples
  - study_day
  - created_at
- Enabled Row Level Security
- Created a temporary learning policy
- Inserted first kanji entry using SQL
- Updated Next.js application to read from the kanji table
- Displayed kanji information in the browser

### Learned

- How to create database tables using SQL
- How Supabase policies work
- How React renders arrays using map()
- How TypeScript types describe database records
- How JSX tags must be properly opened and closed

### Problems Solved

- Fixed JSX closing tag errors
- Updated application from test data to real kanji data
- Adjusted schema to use study_day INTEGER instead of category text

### Current Status

The application successfully displays kanji records stored in Supabase.

### Next Goal

Create a form that allows kanji entries to be added from the web application instead of manually using SQL.

## 2026-06-05 - Milestone: Supabase + Vercel Deployment Successful

Completed:
- Next.js setup
- Supabase connection
- GitHub repository
- Vercel deployment
- Database read test

Current Version:
- Displays "Hello from Supabase"

Deployment URL:
https://study-tracker-lime-theta.vercel.app/

Today I completed the first full-stack connection test for my Study Tracker project.

### What I Built

* Created a Next.js application
* Connected the app to a Supabase PostgreSQL database
* Created a test table and inserted sample data
* Fetched database data inside the React frontend
* Successfully deployed the project to Vercel

### Result

The deployed app successfully displays:

"Hello from Supabase"

This confirmed:

* database connection works
* environment variables work
* Supabase client setup works
* deployment pipeline works
* production deployment works

### Technologies Used

* Next.js
* React
* TypeScript
* Supabase
* PostgreSQL
* Vercel
* Git/GitHub

### Things I Learned

* Difference between TypeScript and JavaScript
* How environment variables work
* How frontend apps connect to databases
* Basic Git remote setup
* How deployment works on Vercel
* How React state and data fetching work

### Problems Solved

* Fixed missing Supabase export error
* Understood TypeScript type syntax
* Fixed Git remote setup
* Learned how Vercel environment variables work

### Reflection

This was my first successful deployment of a Next.js application connected to a live PostgreSQL database through Supabase.

The most valuable lesson was understanding the complete flow:

User → React Frontend → Supabase → PostgreSQL Database → React UI

I also gained a better understanding of environment variables, GitHub repositories, and Vercel deployments.

### Next Goal

Add a form that allows users to submit and save data into the database.

## Project Vision

Build a Kanji Learning and Review Tool.

Purpose:
- Store personal kanji study notes
- Group kanji by themes and study days
- Review kanji through random practice
- Track learning progress over time

Example Categories:
- Day 1: Change / System / Flow
- Day 2: Situation / Increase / Continuation

---

## Roadmap

### Phase 1: Database Foundation


- [x] Define database fields
- [x] Create kanji table
- [ ] Insert first kanji
- [ ] Connect app to kanji table
- [ ] Remove temporary test table

### Phase 2: Kanji Management (CRUD)

- [ ] Add kanji form
- [ ] View kanji list
- [ ] Edit kanji
- [ ] Delete kanji

### Phase 3: Study Mode

- [ ] Random kanji selection
- [ ] Show answer button
- [ ] Next button
- [ ] Category filtering

### Phase 4: Progress Tracking

- [ ] Track review count
- [ ] Track correct answers
- [ ] Last reviewed date
- [ ] Basic statistics

### Phase 5: Authentication

- [ ] User login
- [ ] Personal kanji collections
- [ ] User-specific progress
