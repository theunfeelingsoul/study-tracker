# Study Tracker Project Log

## 2026-06-05 - Milestone: Supabase + Vercel Deployment Successful

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
