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

- [x] Day selector
- [x] All Days selector
- [x] Show one kanji
- [x] Show Answer button
- [x] Next button
- [x] Tailwind css cleanup

### Phase 4: Smart Review

- [x] Easy button logic
- [x] Difficult button logic
- [x] Review count
- [x] Difficulty score
- [ ] Prioritize difficult kanji

### Phase 5: Authentication

- [ ] User login
- [ ] Personal kanji collecitons
- [ ] User-specific progress

---

## 2026-07-14 - Beginning Component-Based Architecture

### Completed

* Created the project's first reusable React component: `KanjiList`.
* Created a dedicated `components` folder to separate UI components from application logic.
* Moved the kanji list display from `page.tsx` into `KanjiList.tsx`.
* Passed the kanji data from the parent component to `KanjiList` using React props.
* Defined a dedicated `Props` type describing the data expected by the component.
* Verified that the application behaved exactly as before after the refactor.

### Learned

#### React

* A React component is similar to a self-contained PHP page that is imported into another page, but receives its data through **props** rather than accessing parent variables directly.
* Components should have a single responsibility. `KanjiList` is only responsible for displaying kanji and knows nothing about how the data is fetched or updated.
* Parent components own the application's state, while child components receive only the information they need.

#### TypeScript

* The difference between a data model (`Row`) and a props definition (`Props`).
* Why a component's props need their own type even when the underlying data has already been defined elsewhere.
* How TypeScript can infer the types of many variables automatically, meaning explicit type definitions are only required when inference is insufficient or when describing object shapes.

#### Software Design

* Began moving from a "single large page" design toward a component-based architecture.
* Recognised that breaking the interface into smaller, reusable components improves readability without changing functionality.
* Discussed the similarities between React components and PHP includes, while also understanding that React components communicate through props rather than shared variables.

### Current Status

#### Study Mode

* Day filtering ✅
* Random weighted review ✅
* Easy / Difficult review system ✅
* Review statistics ✅

#### Architecture

* `KanjiList` component ✅
* Component folder structure started ✅
* Additional UI components planned ⏳

### Reflection

Today contained very little new functionality, but it introduced one of the biggest architectural changes in the project so far.

Rather than continuing to add features to an increasingly large `page.tsx`, I began separating the application into focused components. This doesn't make the application do anything new, but it makes the codebase easier to understand, maintain, and extend.

Coming from a PHP background, I naturally compared React components to separate PHP pages or includes. While there are important differences—particularly the use of props—the overall idea of separating responsibilities feels familiar. That connection made React's component model much easier to understand.

### Next Goal

* Extract the Add Kanji form into its own `AddKanjiForm` component.
* Learn how multiple props are passed from a parent component to a child component.
* Continue refactoring the interface before implementing the Edit (CRUD) feature.


## 2026-07-12 - Weighted Review Refactoring

### Completed

* Refactored the weighted review algorithm into smaller, single-purpose functions.
* Created `buildWeightedArray()` to separate weighted array construction from the card selection logic.
* Began extracting the random selection logic into its own `randKanji()` function.
* Reviewed and improved code comments to explain the purpose of the algorithm rather than simply describing individual statements.
* Verified the weighted review algorithm using manual examples and console output.

### Learned

#### JavaScript

* The difference between a function and the value returned by a function.
* Why a function must be called with `()` before its returned value can be accessed.
* Why `buildWeightedArray.length` refers to the function itself, while `buildWeightedArray().length` refers to the returned array.
* Why repeatedly calling the same function can perform unnecessary work and reduce efficiency.

#### Algorithms

* Reinforced how the weighted review algorithm creates probabilities by duplicating rows instead of calculating percentages mathematically.
* Confirmed that:

  * `difficulty_score = 0` appears once.
  * `difficulty_score = 1` appears twice.
  * `difficulty_score = 2` appears three times.
* Practised tracing the algorithm manually before relying on the computer to execute it.

#### Software Design

* Learned the importance of separating one large function into multiple functions, each with a single responsibility.
* Began thinking about functions as reusable building blocks rather than writing all logic inside one event handler.

### Current Status

#### Study Mode

* Day filtering ✅
* Random kanji selection ✅
* No immediate duplicate cards ✅
* Show Answer ✅
* Review statistics displayed ✅

#### Smart Review

* Easy button ✅
* Difficult button ✅
* Review count tracking ✅
* Difficulty score tracking ✅
* Weighted review algorithm ✅
* Algorithm refactoring ⏳

### Reflection

Today's work focused less on writing new features and more on improving the structure of existing code.

The biggest breakthrough was recognizing the difference between a function and the value it returns. This helped clarify why JavaScript requires parentheses when calling functions and why building reusable helper functions leads to cleaner, more maintainable code.

Another important milestone was being able to reason through the weighted review algorithm without running the program. By manually predicting the contents of the weighted array and the resulting probabilities, I demonstrated an understanding of the algorithm itself rather than simply following the code.

This feels like a shift from learning JavaScript syntax to learning how to design software.

### Next Goal

* Finish refactoring the weighted review functions.
* Remove temporary debugging code and perform final testing.
* Begin implementing Edit functionality to continue completing the CRUD features.


## 2026-07-11 - Adaptive Weighted Review Algorithm

### Completed
* Implemented a weighted review algorithm prototype.
* Built a temporary weighted array based on each kanji's difficulty_score.
* Higher difficulty kanji are inserted into the weighted array multiple times, increasing their probability of being selected.
* Converted a randomly selected weighted entry back into the correct index of filteredData so it could be displayed by React.
* Confirmed that review_count and difficulty_score update correctly after pressing Easy and Difficult.
* Verified through console logging that the weighted array changes dynamically as difficulty scores change.

### Learned

JavaScript

* The difference between expressions and statements.
* Why map() expects an expression while for loops are statements.
* The difference between map() and forEach().
* Why JavaScript uses callback functions instead of PHP-style foreach syntax.
* How push() stores entire objects rather than just individual properties.

TypeScript

Why an empty array can be declared as:
const weighted: Row[] = [];
How Row[] tells TypeScript what type of objects the array will eventually contain even though it starts empty.
Algorithms
How weighted random selection works by duplicating entries in an array.
Why a kanji with
difficulty_score = 0

appears once,

difficulty_score = 1

appears twice,

difficulty_score = 3

appears four times,

making difficult kanji statistically more likely to appear.

Why selecting from the weighted array does not give the correct React index directly.
How to convert the selected weighted row back into its position inside filteredData.

### Current Status

Study Mode

* Day filtering ✅
* Random kanji ✅
* No immediate duplicate cards ✅
* Show Answer ✅
* Review statistics displayed ✅

### Smart Review

* Easy button ✅
* Difficult button ✅
* Review count tracking ✅
* Difficulty score tracking ✅
* Weighted review algorithm (prototype) ✅
* Final testing and cleanup ⏳

### Reflection

Today's biggest achievement was thinking through an algorithm instead of simply writing code.

I designed the weighted review approach myself: rather than calculating probabilities mathematically, I created a weighted array where difficult kanji appear multiple times. This makes the random selection naturally favour kanji that need more practice while still allowing easier kanji to appear occasionally.

I also became much more comfortable reading JavaScript syntax and understanding how React uses array indexes. One important breakthrough was realizing that the weighted array and filteredData use different indexes, so the selected weighted item must be mapped back to its original position before updating the UI.

### Next Goal

Thoroughly test the weighted review algorithm with larger datasets.
Refactor nextKanji() to make the code cleaner and more efficient.
Begin implementing Edit and Delete functionality to complete the CRUD features.

## 2026-07-10 - Random Study Mode Design

### Completed

* Replaced sequential navigation design with a random kanji selection algorithm
* Prevented the same kanji from appearing twice in a row during study sessions
* Planned the integration of Easy and Difficult review buttons into the study interface
* Reviewed the flow of the React component from state initialization through rendering
* Improved comments throughout the code to better document study mode logic

### Learned

* How Math.random() and Math.floor() generate random array indexes
* Why the application should avoid selecting the current kanji again immediately
* The difference between data.length (all kanji loaded from Supabase) and filteredData.length (only the currently selected study set)
* How filteredData is recreated on every React render rather than being stored in state
* Why useEffect() is responsible for loading data from Supabase while derived values are recalculated automatically during rendering

### Current Status

Study Mode

* Day filtering ✅
* Random kanji selection ✅
* No immediate duplicate cards ✅
* Show Answer ✅
* Next Kanji ✅

### Smart Review

* Easy review logic ✅
* Difficult review logic ✅
* Review count tracking ✅
* Difficulty score tracking ✅
* Adaptive review algorithm ⏳

### Reflection

Today's biggest achievement wasn't writing a large amount of code—it was becoming more comfortable thinking like a JavaScript and React developer.

Instead of copying solutions, I began designing my own algorithms and translating programming ideas I already knew from PHP into JavaScript.

A good example was designing the random kanji selection logic. I recognised the problem, considered edge cases such as preventing duplicate selections, and wrote most of the solution myself before refining it.

I'm becoming more confident with JavaScript syntax, while React's rendering lifecycle is starting to make much more sense.

### Next Goal

Connect the Easy and Difficult buttons to the user interface
Display review_count and difficulty_score during study
Begin implementing the adaptive review algorithm based on difficulty_score

## 2026-07-09 - Smart Review Logic Implemented

### Completed

* Added `review_count` field to kanji records
* Added `difficulty_score` field to kanji records
* Updated the TypeScript `Row` type to match the database schema
* Implemented `easyKanji()` function
* Implemented `difficultKanji()` function
* Used `currentKanji.id` to update the correct database record
* Learned to use Supabase `update()` with `.eq()`
* Refreshes study data after each review
* Automatically advances to the next kanji after recording a review

### Learned

* Difference between React's `currentIndex` and the database primary key `id`
* Why React uses array indexes for displaying data but database updates use primary keys
* How `let` differs from `const`
* How JavaScript object syntax (`field: value`) works
* How Supabase `update()` performs database updates
* How `.eq()` works like a SQL `WHERE` clause
* Basic error handling after database operations
* React's render cycle and how derived values like `filteredData` are recalculated on each render

### Current Status

Study Mode

* Day filtering ✅
* Show one kanji ✅
* Show Answer ✅
* Next Kanji ✅

Smart Review

* Easy review logic ✅
* Difficult review logic ✅
* Review count tracking ✅
* Difficulty score tracking ✅
* Adaptive review algorithm ⏳

### Reflection

Today I wrote the core logic for both `easyKanji()` and `difficultKanji()` almost entirely on my own.

The biggest breakthrough was understanding the complete update flow:

Read current values → Calculate new values → Update Supabase → Refresh data → Display the next kanji.

I also gained a much better understanding of when React recalculates values during rendering and why database updates rely on the primary key rather than the current array index.

### Next Goal

Connect the Easy and Difficult buttons to the interface.

Then begin implementing adaptive review so kanji with higher difficulty scores appear more frequently during study sessions.


## 2026-06-18 - Smart Review Foundation Started

### Completed

* Added `review_count` field to kanji records
* Added `difficulty_score` field to kanji records
* Updated TypeScript `Row` type to match database schema
* Planned Easy / Difficult review workflow
* Designed adaptive review logic
* Implemented `easyKanji()` function structure
* Learned how Supabase `update()` works
* Learned how `.eq()` is used as a SQL `WHERE` clause
* Connected review actions to specific kanji using `currentKanji.id`

### Learned

* Difference between `currentIndex` and database `id`
* Why React uses array indexes for display but database records use primary keys
* JavaScript `let` vs `const`
* JavaScript object syntax:

  * `field: value`
  * commas between properties
* How CRUD maps to Supabase:

  * Create → `insert()`
  * Read → `select()`
  * Update → `update()`
  * Delete → `delete()`

### Current Status

Study Mode is functional:

* Day filtering ✅
* Show Answer ✅
* Next Kanji ✅

Smart Review is partially implemented:

* Easy review logic ⏳
* Difficult review logic ⏳
* Database review tracking ⏳

### Next Goal

Complete the `easyKanji()` implementation and create `difficultKanji()`.

After both buttons work:

* Increment review counts
* Track difficulty scores
* Begin adaptive kanji review system


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


