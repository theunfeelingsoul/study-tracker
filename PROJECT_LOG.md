# Study Tracker Project Log

## Project Vision

Build a Kanji Learning and Review Tool.

Purpose:

- Store personal kanji study notes
- Group kanji by themes and study days
- Review kanji through random practice
- Track learning progress over time

Example Categories / Study Days:

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
- [x] Verify with SELECT \*
- [x] Connect Next.js to kanji table

---

### Phase 2: Kanji Management (CRUD)

#### Database

- [x] Create kanji
- [x] Read kanji list
- [x] Read single kanji
- [x] Update kanji
- [x] Delete kanji

#### User Interface

- [x] Reusable Kanji form
- [x] Reusable Delete confirmation modal
- [x] Reusable Toast notifications
- [x] Redirect after Create
- [x] Redirect after Update
- [x] Redirect after Delete

---

### Phase 3: Study Mode

- [x] Day selector
- [x] All Days selector
- [x] Show one kanji
- [x] Show Answer button
- [x] Next button
- [x] Tailwind CSS cleanup
- [x] Mobile-first layout

---

### Phase 4: Smart Review

- [x] Easy button logic
- [x] Difficult button logic
- [x] Review count
- [x] Difficulty score
- [ ] Prioritize difficult kanji
- [ ] Review history

---

### Phase 5: Study Days

- [ ] Create Study Days table
- [ ] CRUD for Study Days
- [ ] Replace hard-coded Day dropdown
- [ ] Link kanji to Study Days table

---

### Phase 6: Dashboard

- [ ] Home page
- [ ] Main navigation
- [ ] Statistics summary
- [ ] Recently studied kanji
- [ ] Quick actions

---

### Phase 7: Authentication

- [ ] User login
- [ ] Personal kanji collections
- [ ] User-specific progress

---

## Current Architecture

```
app/
│
├── page.tsx
│
├── components/
│   ├── KanjiForm.tsx
│   ├── DeleteModal.tsx
│   └── Toast.tsx
│
├── services/
│   └── kanji.ts
│
├── study/
│
├── kanji/
│   ├── page.tsx
│   ├── add/
│   ├── edit/
│   └── [id]/
│
└── stats/
```

### Reusable Components

- ✅ KanjiForm
- ✅ DeleteModal
- ✅ Toast

### Service Layer

- ✅ getKanjiList()
- ✅ getKanji()
- ✅ saveKanji()
- ✅ updateKanji()
- ✅ deleteKanji()

---

## Current Milestone

🎉 **Version 1 CRUD Complete**

The application now supports the full CRUD lifecycle:

- Create
- Read (List)
- Read (Single)
- Update
- Delete

The project has also begun transitioning toward a reusable architecture through shared components and a dedicated service layer.

---

## 2026-07-25 - Navigation, Delete Workflow & UI Polish

### Completed

#### Delete (CRUD)

- Completed the Delete portion of CRUD.
- Added a reusable confirmation dialog component:

```
DeleteModal
```

- Replaced the browser's default `window.confirm()` dialog with a custom modal.
- Confirmed the delete workflow now behaves as expected:

```
View Record
      ↓
Delete
      ↓
Confirmation Modal
      ↓
Delete Record
      ↓
Redirect to Kanji List
```

#### Toast Notifications

- Created a reusable Toast component.

Current use:

```
<Toast
    message="Kanji deleted successfully."
    type="success"
/>
```

- Implemented the first application notification.
- After deleting a kanji, the application now redirects to:

```
/kanji?deleted=1
```

- The Kanji List page detects the query parameter and displays a temporary success notification.
- Learned how query parameters can be used as lightweight "flash messages", similar to PHP applications.

#### Navigation

- Began designing the application's main navigation.
- Chose to keep a traditional top navigation instead of introducing a hamburger menu.

Current reasoning:

- Faster access to all pages.
- Fewer taps on mobile.
- Cleaner workflow while the application remains relatively small.

- Improved the navigation styling by replacing text underlines with animated bottom borders.

Current link style:

```
border-b-2
border-transparent
hover:border-blue-500
hover:text-blue-600
transition-colors
```

- Added active-page highlighting using:

```
usePathname()
```

- Current page is now displayed using:

- blue text
- bold font
- blue underline

- Increased navigation font size on desktop using responsive Tailwind classes while preserving the compact mobile layout.

#### UI Improvements

- Continued refining the application's visual design.
- Decided against large button-style navigation after experimenting with it.
- Found that clean text links with subtle hover effects create a more modern interface.
- Overall interface now feels lighter, cleaner and less cluttered.

---

### Learned

#### Next.js

- Learned how to use:

```
usePathname()
```

to determine the current route.

- Better understood route matching and why:

```
pathname.startsWith(...)
```

is often more flexible than checking for exact matches.

#### React

- Created another reusable UI component:

```
DeleteModal
```

- Created the application's first reusable notification component:

```
Toast
```

- Continued separating reusable UI from page-specific logic.

#### Tailwind CSS

- Learned that subtle interactions often produce a more polished interface than larger visual effects.

Examples:

```
border-transparent
hover:border-blue-500
transition-colors
```

- Continued using responsive typography:

```
text-base
md:text-lg
```

to improve desktop readability while maintaining a mobile-first design.

#### UI Design

- Spent time evaluating different navigation patterns.

Considered:

- Button navigation
- Hamburger menu
- Sidebar
- Traditional top navigation

Ultimately chose a traditional navigation because it provides immediate access to every page with no extra interactions, which better suits the size of the current application.

---

### Current Status

#### Study Mode

- Day filtering ✅
- Random weighted review ✅
- Easy / Difficult review system ✅
- Review statistics ✅
- Mobile-first interface ✅

#### CRUD

- Create ✅
- Read (List) ✅
- Read (Single Record) ✅
- Update ✅
- Delete ✅

#### Architecture

- Multi-page App Router structure ✅
- Reusable KanjiForm ✅
- Reusable DeleteModal ✅
- Reusable Toast ✅
- Service layer (`services/kanji.ts`) ✅
- Study page ✅
- Kanji List page ✅
- Kanji Detail page ✅
- Add Kanji page ✅
- Edit Kanji page ✅
- Dashboard ⏳

---

### Reflection

Today's work focused less on adding major functionality and more on improving the overall user experience.

Completing the Delete workflow means the application's CRUD functionality is now fully operational. More importantly, replacing browser dialogs with reusable React components made the application feel significantly more polished and professional.

The navigation also evolved considerably. After experimenting with button-based navigation and considering a hamburger menu, I realised that a simple text navigation with responsive sizing, hover animations and active-page highlighting offers a cleaner experience for an application of this size. Small details such as animated borders and temporary success notifications contribute more to the overall quality than large visual effects.

Looking back over the last few weeks, the project has gradually shifted from simply "making features work" to thinking about maintainability, consistency and user experience. Reusable components, shared services and thoughtful UI design are beginning to shape the application into something that feels like a real product rather than a coding exercise.

### Next Goal

- Build the reusable main navigation component across all pages.
- Add contextual sub-navigation (Back, Edit, Delete) where appropriate.
- Begin designing the Dashboard page.
- Create CRUD functionality for the Study Days table.
- Continue refining the overall visual consistency of the application.

## 2026-07-25 - Delete Confirmation, Toast Notifications & Reusable UI

### Completed

#### Delete (CRUD)

- Completed the Delete functionality.
- Replaced the browser's default confirmation dialog:

```javascript
window.confirm(...)
```

with a custom React confirmation modal.

- Created a reusable component:

```
app/components/DeleteModal.tsx
```

- Added support for:

```
isOpen
onClose
onConfirm
```

allowing the modal to be reused anywhere in the application.

- Improved the delete workflow:

```
View Record
      ↓
Delete
      ↓
Confirmation Modal
      ↓
Delete Database Record
      ↓
Redirect to Kanji List
```

---

#### Toast Notifications

- Created the application's first reusable Toast component.

```
app/components/Toast.tsx
```

- Added support for:

```
message
type
```

making it reusable for future success, warning and error messages.

- Implemented a success notification after deleting a kanji.

Current workflow:

```
Delete Record
      ↓
Redirect

/kanji?deleted=1

      ↓
Kanji List
      ↓
Toast appears
```

- Learned to pass simple status information between pages using query parameters instead of relying on global state.

---

#### Component Reusability

The project now contains several reusable components:

```
KanjiForm
DeleteModal
Toast
```

These are becoming the foundation of the application's UI library.

---

#### UI Improvements

- Added a custom confirmation dialog with a cleaner appearance than the browser default.
- Improved overall user feedback by displaying confirmation after successful deletion.
- Continued following the mobile-first layout approach.

---

### Learned

#### React

- Learned how reusable modal components communicate with parent pages through callback props.

Example:

```
isOpen
onClose
onConfirm
```

The parent page owns the state while the modal only displays itself.

---

#### Next.js

- Learned how query parameters can be used to transfer small pieces of information after redirects.

Example:

```tsx
router.push("/kanji?deleted=1");
```

and later reading it with:

```tsx
useSearchParams();
```

---

#### Component Design

Continued recognising a pattern for reusable components.

Rather than placing logic inside each page, components expose configurable props while the page controls the behaviour.

Current reusable UI components:

```
KanjiForm
DeleteModal
Toast
```

---

### Current Status

#### Study Mode

- Day filtering ✅
- Random weighted review ✅
- Easy / Difficult review system ✅
- Review statistics ✅
- Mobile-first interface ✅

#### CRUD

- Create ✅
- Read (List) ✅
- Read (Single Record) ✅
- Update ✅
- Delete ✅

🎉 **Full CRUD is now complete.**

#### Reusable Components

- KanjiForm ✅
- DeleteModal ✅
- Toast ✅

#### Architecture

- Multi-page App Router ✅
- Service layer ✅
- Reusable form ✅
- Reusable modal ✅
- Reusable toast ✅
- Dashboard ⏳

---

### Reflection

Today's work completed the application's CRUD functionality, marking the first major milestone of the project. Beyond simply deleting records, I improved the user experience by replacing the browser's confirmation dialog with a reusable React modal and by introducing toast notifications that provide clear feedback after successful actions.

Another important step was continuing to think in terms of reusable components rather than page-specific code. The application is gradually developing its own small UI component library, with the form, modal and toast all designed to be reused elsewhere in the project. This feels much closer to how larger applications are structured and reinforces the idea of separating presentation from page logic.

I also learned how Next.js query parameters can be used to communicate simple state between pages after redirects. Instead of introducing a global state solution, passing a small flag such as `?deleted=1` proved to be a clean and practical approach.

With CRUD now complete, the application has moved beyond being a basic database exercise and is beginning to feel like a polished web application with reusable architecture and a more professional user experience.

### Next Goal

- Create the main application navigation.
- Add contextual navigation (Back, Edit, Delete) where appropriate.
- Build the Dashboard (Home) page.
- Begin CRUD functionality for the **Study Days** table.
- Continue refining the UI with reusable components and consistent styling.

## 2026-07-21 - Reusable Forms, Service Layer & Update (CRUD) Completed

### Completed

#### Update (CRUD)

- Completed the **Edit Kanji** page.
- Successfully implemented the Update portion of CRUD.
- Existing kanji records are now loaded into the edit form automatically.
- Saving changes updates the database and redirects back to the Kanji Detail page.
- Verified the complete edit workflow:

```
Kanji List
      ↓
View Record
      ↓
Edit Record
      ↓
Update Database
      ↓
Return to Detail Page
```

#### Reusable Form Component

- Refactored the Add Kanji page to use the existing `KanjiForm` component.
- Extended `KanjiForm` so it can be reused by both the Add and Edit pages.
- Added reusable props including:

```
buttonText
onSubmit
```

- Eliminated duplicate form markup between Add and Edit pages.

#### Service Layer

- Introduced a dedicated services layer:

```
app/services/kanji.ts
```

- Moved all database operations into reusable functions.

Current service methods:

```
getKanjiList()
getKanji()
saveKanji()
updateKanji()
deleteKanji()
```

- Added shared TypeScript models:

```
Kanji
NewKanji
```

- Separated database logic from page components, making each page much smaller and easier to read.

#### Navigation Improvements

- After successfully creating a new kanji, the application now automatically redirects to:

```
/kanji/{id}
```

instead of remaining on the Add page.

- Verified the returned inserted record from Supabase can be used immediately for navigation.

#### Tailwind CSS

- Redesigned the form layout.

Mobile:

```
Label
Input
```

Desktop:

```
Label      Input
```

using:

```
grid-cols-1
md:grid-cols-[150px_1fr]
```

- Added cleaner spacing and improved button styling.
- Added:

```
cursor-pointer
```

to buttons for better user feedback.

- Experimented with lighter hover colours instead of stronger defaults.

---

### Learned

#### Software Architecture

- A service layer is similar to creating reusable classes or helper libraries in PHP.
- Instead of repeating Supabase code across multiple pages, database operations now live in one location.
- Separating responsibilities makes future maintenance much easier.

Current responsibility split:

```
Pages
    ↓
Handle UI

KanjiForm
    ↓
Displays reusable form

Services
    ↓
Database operations

Supabase
    ↓
Database
```

#### React

- A reusable component should contain only presentation logic.
- Parent pages own the state and simply pass values and callback functions into the component.
- The same component can be reused for multiple purposes by changing only a few props.

#### TypeScript

- Better understood the purpose of dedicated types such as:

```
Kanji
NewKanji
```

- Learned why `.ts` files are used for non-JSX code while `.tsx` files contain React components.
- Learned how shared types improve consistency across the application.

#### Next.js

- Gained more experience using:

```
useParams()
```

to retrieve dynamic route parameters.

- Better understood asynchronous loading using:

```
useEffect()
```

combined with async helper functions.

#### VS Code

- Learned useful editor features including:

- Toggle suggestion popups.

- Change editor zoom.

- Exit Zen Mode.

- Navigate quickly between functions using the Outline and Go to Symbol features.

#### UI Design

- Continued refining the mobile-first layout.
- Began thinking about responsive forms rather than simply responsive pages.
- Confirmed that a two-column desktop layout significantly improves readability while preserving a clean mobile experience.

---

### Current Status

#### Study Mode

- Day filtering ✅
- Random weighted review ✅
- Easy / Difficult review system ✅
- Review statistics ✅
- Mobile-first interface ✅

#### CRUD

- Create ✅
- Read (List) ✅
- Read (Single Record) ✅
- Update ✅
- Delete ⏳

#### Architecture

- Multi-page App Router structure ✅
- Reusable `KanjiForm` ✅
- Service layer (`services/kanji.ts`) ✅
- Study page ✅
- Kanji List page ✅
- Kanji Detail page ✅
- Add Kanji page ✅
- Edit Kanji page ✅
- Dashboard ⏳

---

### Reflection

Today's work marked another important architectural milestone.

Completing the Update feature means the application's CRUD functionality is nearly complete. More importantly, I avoided duplicating code by reusing the same form for both creating and editing kanji. This reinforced the idea that React components should focus on presentation while page components manage state and workflow.

Introducing a dedicated service layer also felt very familiar coming from PHP. Instead of scattering database queries throughout the application, all Supabase operations now exist in one place. This separation makes the project feel much closer to a professionally structured application.

I also continued becoming more comfortable with Tailwind CSS. Rather than treating it as inline styling, I now see it as a collection of composable utility classes that allow responsive layouts to be built directly alongside the HTML. The form redesign demonstrated how easily the interface can adapt between mobile and desktop without maintaining separate CSS files.

Overall, the project is becoming increasingly modular, maintainable, and easier to extend with future features.

### Next Goal

- Implement Delete (CRUD).
- Add a confirmation dialog before deleting a kanji.
- Redirect back to the Kanji List after deletion.
- Begin building the Dashboard page.
- Create CRUD functionality for Study Days using a separate database table.

### Additional Completed

- Delete (CRUD)
- Completed the Delete portion of CRUD.
- Added a Delete action from the Kanji Detail page.
- Implemented reusable database deletion through:
- deleteKanji()

inside the service layer.

- Successfully redirects back to the Kanji List after deletion.
- Verified the complete delete workflow:

```
Kanji List
↓
View Record
↓
Delete
↓
Confirmation Dialog
↓
Delete Database Record
↓
Return to Kanji List
```

### Reusable Delete Confirmation

- Created a reusable DeleteModal component.
- Replaced the browser's default window.confirm() dialog with a custom React modal.
- Controlled the modal using React state:

```
const [showDelete, setShowDelete] = useState(false);
```

- Learned how a modal can be shown and hidden by conditionally rendering it using:

```
if (!isOpen) return null;
```

instead of relying on the browser's built-in confirmation dialog.

- Fixed several issues while implementing the modal, including:
  -- accidentally reversing the modal visibility logic
  -- understanding the difference between passing a callback (onClick={onClose}) and calling it immediately
  ```
  (onClick={onClose()})
  ```
  -- using the TypeScript primitive boolean instead of Boolean

### Additional Learned

React

- Learned how reusable modal components communicate with parent components through callback props.
- Better understood "lifting state up," where the parent controls when a child component is visible.
- Reinforced the concept that React components should receive behaviour through props instead of containing application logic.

UI Design

- Began replacing browser-native dialogs with custom UI components to create a more consistent user experience.
- Learned that custom confirmation dialogs are built entirely with React state and conditional rendering rather than special browser APIs.

### Updated Current Status

CRUD

- Create ✅
- Read (List) ✅
- Read (Single Record) ✅
- Update ✅
- Delete ✅

### Updated Next Goal

- Display a toast notification after successful Create, Update and Delete operations.
- Build a reusable notification component that can be reused throughout the application.
- Create the Dashboard page.
- Create CRUD functionality for Study Days using a separate database table.

## 2026-07-19 - Project Restructure & Mobile-First UI

### Completed

#### Project Structure

- Refactored the application from a single-page design into a multi-page Next.js App Router project.
- Created the following page structure:

```
app/
│
├── page.tsx              ← Home / Dashboard
│
├── study/
│   └── page.tsx
│
├── kanji/
│   ├── page.tsx
│   ├── add/
│   │   └── page.tsx
│   ├── [id]/
│   │   └── page.tsx
│   └── edit/
│       └── [id]/
│           └── page.tsx
│
└── stats/
    └── page.tsx
```

- Successfully moved the Study Mode into its own dedicated page.
- Began separating CRUD pages following a REST-style structure similar to Yii.

#### Kanji List

- Created a dedicated Kanji List page.
- Displayed kanji records inside an HTML table.
- Ordered records by ID.
- Added View and Edit links for each record.
- Began designing a responsive table suitable for both desktop and mobile.

#### Kanji Detail

- Implemented a dynamic route using:

```
kanji/[id]/page.tsx
```

- Successfully retrieved a single kanji using:

```
.eq("id", Number(id)).single()
```

- Created the first version of the Kanji Detail page.

#### Tailwind CSS

- Began replacing old HTML spacing using `<br />` with Tailwind spacing utilities.
- Learned to use:
  - `mb-*`
  - `mt-*`
  - `px-*`
  - `py-*`
  - `mx-auto`
  - `w-full`
  - `max-w-*`

- Redesigned the Study page using a cleaner mobile-first layout.
- Used CSS Grid to display the answer section in two columns with automatically-sized labels.

---

### Learned

#### Next.js

- Learned how App Router automatically creates routes from the folder structure.
- Learned how dynamic routes (`[id]`) work.
- Learned that newer versions of Next.js provide `params` as a Promise.
- Learned how to retrieve route parameters using:

```tsx
const { id } = React.use(params);
```

instead of directly accessing `params.id`.

#### React

- Reinforced the Rule of Hooks:
  - Hooks must always be called inside a React component.

- Fixed the "Invalid hook call" error caused by placing `useState()` outside the component function.
- Better understood component organisation by moving functionality into dedicated pages.

#### Tailwind CSS

- Learned that Tailwind does not provide Bootstrap-style layout classes.
- Understood that layout is built using utility classes instead.
- Learned the difference between:
  - `flex`
  - `grid`

- Learned that HTML provides the layout system while Tailwind simply provides utility classes that apply CSS.

Examples learned:

- Full width buttons:

```
w-full
```

- Centering a container:

```
mx-auto
```

- Responsive maximum width:

```
max-w-md
max-w-xl
max-w-2xl
```

- Grid layouts:

```
grid
grid-cols-2
gap-4
```

- Custom grid columns:

```
grid-cols-[auto_1fr]
```

which automatically sizes the label column while allowing the value column to occupy the remaining space.

#### UI Design

- Decided to build the application using a mobile-first philosophy.
- Chose a clean, minimal interface rather than a feature-heavy layout.
- Planned for the desktop version to simply be a wider version of the mobile interface, similar to Instagram's responsive design.
- Decided that HTML tables are more appropriate than CSS Grid when displaying tabular kanji data.

---

### Current Status

#### Study Mode

- Day filtering ✅
- Random weighted review ✅
- Easy / Difficult review system ✅
- Review statistics ✅
- Mobile-first interface ✅

#### CRUD

- Create ✅
- Read (List) ✅
- Read (Single Record) ✅
- Update ⏳
- Delete ⏳

#### Architecture

- Multi-page App Router structure ✅
- Study page ✅
- Kanji List page ✅
- Kanji Detail page ✅
- Add Kanji page ⏳
- Edit page ⏳
- Dashboard ⏳

---

### Reflection

Today's work represented one of the largest architectural improvements made to the project.

Instead of continuing to build every feature inside a single `page.tsx`, I reorganised the application into separate pages following a structure that feels very similar to Yii's CRUD approach. This makes the project easier to understand and provides a clear place for future features.

Another important milestone was beginning to understand Tailwind CSS. Initially it felt similar to writing inline CSS, but after building several pages I started recognising that Tailwind's strength comes from rapidly composing reusable utility classes while encouraging responsive design from the beginning.

I also became more comfortable deciding which HTML elements are appropriate for different situations, such as using semantic elements like `<main>` and `<section>`, CSS Grid for page layouts, and HTML tables for displaying structured database records.

The project is beginning to feel less like a programming exercise and more like a real web application with a maintainable structure.

### Next Goal

- Complete the Add Kanji page.
- Build the Edit Kanji page.
- Implement Update (CRUD).
- Implement Delete.
- Create a reusable navigation menu.
- Build the Dashboard page linking to:
  - Study
  - Kanji List
  - Add Kanji
  - Statistics

## 2026-07-16 - Component Architecture Continues

### Completed

- Created a reusable `KanjiForm` component inside the `components` folder.
- Moved the entire Add Kanji form JSX out of `page.tsx` without changing any functionality.
- Passed all required state values, setter functions, and the `saveKanji()` function from the parent component to `KanjiForm` using React props.
- Successfully removed the original form from `page.tsx` and verified that the application continued to function correctly after the refactor.
- Created a reusable `StudyMode` component.
- Moved the entire study interface—including day selection, flashcard display, review buttons, and navigation—into `StudyMode`.
- Passed application state and event handler functions from `page.tsx` to `StudyMode` using props.
- Successfully resolved several prop-related errors while completing the refactor.
- Reduced the size and responsibility of `page.tsx`, continuing the transition toward a component-based architecture.

### Learned

#### React

- Components can receive both state values and functions as props.
- Child components never own the application's state—they simply display data and notify the parent when something should change.
- A parent component coordinates the application's state while child components focus on rendering the user interface.
- Extracting a large section of JSX into its own component does not change how the application behaves, provided all required props are passed correctly.

#### TypeScript

- Gained more practice defining component interfaces (`Props`) that contain:
  - Primitive values
  - Objects
  - State setter functions
  - Callback functions
- Better understood that a component's props define its public interface, independent of where the underlying state is stored.

#### Software Design

- Continued transitioning from a single large component to a modular architecture.
- Began seeing React components as the equivalent of self-contained modules or Yii views with clearly defined interfaces.
- Recognized that separating responsibilities improves readability and makes future features easier to implement without changing existing code.

### Current Status

#### Study Mode

- Day filtering ✅
- Random weighted review ✅
- Easy / Difficult review system ✅
- Review statistics ✅

#### Architecture

- `KanjiList` component ✅
- `KanjiForm` component ✅
- `StudyMode` component ✅
- `page.tsx` acting as the application's coordinator ✅

### Reflection

Today's work reinforced that software architecture is about organization rather than adding new functionality.

Although the application behaves exactly as it did before, the codebase is now much easier to understand. The responsibility of `page.tsx` is gradually shrinking as presentation logic moves into dedicated components.

One particularly valuable realization was that React's component model closely resembles the modular design patterns I used in PHP and Yii. Instead of separate pages communicating through includes or controllers, React components communicate through props, but the underlying goal is the same: each module should have a clear and limited responsibility.

This refactoring lays the foundation for implementing Edit and Delete functionality without allowing `page.tsx` to become increasingly difficult to maintain.

### Next Goal

- Finish the component refactoring by extracting any remaining large UI sections if appropriate.
- Begin implementing the **Edit (CRUD)** feature using the new component structure.
- Continue learning how parent and child components collaborate through props and state management.

## 2026-07-14 - Beginning Component-Based Architecture

### Completed

- Created the project's first reusable React component: `KanjiList`.
- Created a dedicated `components` folder to separate UI components from application logic.
- Moved the kanji list display from `page.tsx` into `KanjiList.tsx`.
- Passed the kanji data from the parent component to `KanjiList` using React props.
- Defined a dedicated `Props` type describing the data expected by the component.
- Verified that the application behaved exactly as before after the refactor.

### Learned

#### React

- A React component is similar to a self-contained PHP page that is imported into another page, but receives its data through **props** rather than accessing parent variables directly.
- Components should have a single responsibility. `KanjiList` is only responsible for displaying kanji and knows nothing about how the data is fetched or updated.
- Parent components own the application's state, while child components receive only the information they need.

#### TypeScript

- The difference between a data model (`Row`) and a props definition (`Props`).
- Why a component's props need their own type even when the underlying data has already been defined elsewhere.
- How TypeScript can infer the types of many variables automatically, meaning explicit type definitions are only required when inference is insufficient or when describing object shapes.

#### Software Design

- Began moving from a "single large page" design toward a component-based architecture.
- Recognised that breaking the interface into smaller, reusable components improves readability without changing functionality.
- Discussed the similarities between React components and PHP includes, while also understanding that React components communicate through props rather than shared variables.

### Current Status

#### Study Mode

- Day filtering ✅
- Random weighted review ✅
- Easy / Difficult review system ✅
- Review statistics ✅

#### Architecture

- `KanjiList` component ✅
- Component folder structure started ✅
- Additional UI components planned ⏳

### Reflection

Today contained very little new functionality, but it introduced one of the biggest architectural changes in the project so far.

Rather than continuing to add features to an increasingly large `page.tsx`, I began separating the application into focused components. This doesn't make the application do anything new, but it makes the codebase easier to understand, maintain, and extend.

Coming from a PHP background, I naturally compared React components to separate PHP pages or includes. While there are important differences—particularly the use of props—the overall idea of separating responsibilities feels familiar. That connection made React's component model much easier to understand.

### Next Goal

- Extract the Add Kanji form into its own `AddKanjiForm` component.
- Learn how multiple props are passed from a parent component to a child component.
- Continue refactoring the interface before implementing the Edit (CRUD) feature.

## 2026-07-12 - Weighted Review Refactoring

### Completed

- Refactored the weighted review algorithm into smaller, single-purpose functions.
- Created `buildWeightedArray()` to separate weighted array construction from the card selection logic.
- Began extracting the random selection logic into its own `randKanji()` function.
- Reviewed and improved code comments to explain the purpose of the algorithm rather than simply describing individual statements.
- Verified the weighted review algorithm using manual examples and console output.

### Learned

#### JavaScript

- The difference between a function and the value returned by a function.
- Why a function must be called with `()` before its returned value can be accessed.
- Why `buildWeightedArray.length` refers to the function itself, while `buildWeightedArray().length` refers to the returned array.
- Why repeatedly calling the same function can perform unnecessary work and reduce efficiency.

#### Algorithms

- Reinforced how the weighted review algorithm creates probabilities by duplicating rows instead of calculating percentages mathematically.
- Confirmed that:
  - `difficulty_score = 0` appears once.
  - `difficulty_score = 1` appears twice.
  - `difficulty_score = 2` appears three times.

- Practised tracing the algorithm manually before relying on the computer to execute it.

#### Software Design

- Learned the importance of separating one large function into multiple functions, each with a single responsibility.
- Began thinking about functions as reusable building blocks rather than writing all logic inside one event handler.

### Current Status

#### Study Mode

- Day filtering ✅
- Random kanji selection ✅
- No immediate duplicate cards ✅
- Show Answer ✅
- Review statistics displayed ✅

#### Smart Review

- Easy button ✅
- Difficult button ✅
- Review count tracking ✅
- Difficulty score tracking ✅
- Weighted review algorithm ✅
- Algorithm refactoring ⏳

### Reflection

Today's work focused less on writing new features and more on improving the structure of existing code.

The biggest breakthrough was recognizing the difference between a function and the value it returns. This helped clarify why JavaScript requires parentheses when calling functions and why building reusable helper functions leads to cleaner, more maintainable code.

Another important milestone was being able to reason through the weighted review algorithm without running the program. By manually predicting the contents of the weighted array and the resulting probabilities, I demonstrated an understanding of the algorithm itself rather than simply following the code.

This feels like a shift from learning JavaScript syntax to learning how to design software.

### Next Goal

- Finish refactoring the weighted review functions.
- Remove temporary debugging code and perform final testing.
- Begin implementing Edit functionality to continue completing the CRUD features.

## 2026-07-11 - Adaptive Weighted Review Algorithm

### Completed

- Implemented a weighted review algorithm prototype.
- Built a temporary weighted array based on each kanji's difficulty_score.
- Higher difficulty kanji are inserted into the weighted array multiple times, increasing their probability of being selected.
- Converted a randomly selected weighted entry back into the correct index of filteredData so it could be displayed by React.
- Confirmed that review_count and difficulty_score update correctly after pressing Easy and Difficult.
- Verified through console logging that the weighted array changes dynamically as difficulty scores change.

### Learned

JavaScript

- The difference between expressions and statements.
- Why map() expects an expression while for loops are statements.
- The difference between map() and forEach().
- Why JavaScript uses callback functions instead of PHP-style foreach syntax.
- How push() stores entire objects rather than just individual properties.

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

- Day filtering ✅
- Random kanji ✅
- No immediate duplicate cards ✅
- Show Answer ✅
- Review statistics displayed ✅

### Smart Review

- Easy button ✅
- Difficult button ✅
- Review count tracking ✅
- Difficulty score tracking ✅
- Weighted review algorithm (prototype) ✅
- Final testing and cleanup ⏳

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

- Replaced sequential navigation design with a random kanji selection algorithm
- Prevented the same kanji from appearing twice in a row during study sessions
- Planned the integration of Easy and Difficult review buttons into the study interface
- Reviewed the flow of the React component from state initialization through rendering
- Improved comments throughout the code to better document study mode logic

### Learned

- How Math.random() and Math.floor() generate random array indexes
- Why the application should avoid selecting the current kanji again immediately
- The difference between data.length (all kanji loaded from Supabase) and filteredData.length (only the currently selected study set)
- How filteredData is recreated on every React render rather than being stored in state
- Why useEffect() is responsible for loading data from Supabase while derived values are recalculated automatically during rendering

### Current Status

Study Mode

- Day filtering ✅
- Random kanji selection ✅
- No immediate duplicate cards ✅
- Show Answer ✅
- Next Kanji ✅

### Smart Review

- Easy review logic ✅
- Difficult review logic ✅
- Review count tracking ✅
- Difficulty score tracking ✅
- Adaptive review algorithm ⏳

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

- Added `review_count` field to kanji records
- Added `difficulty_score` field to kanji records
- Updated the TypeScript `Row` type to match the database schema
- Implemented `easyKanji()` function
- Implemented `difficultKanji()` function
- Used `currentKanji.id` to update the correct database record
- Learned to use Supabase `update()` with `.eq()`
- Refreshes study data after each review
- Automatically advances to the next kanji after recording a review

### Learned

- Difference between React's `currentIndex` and the database primary key `id`
- Why React uses array indexes for displaying data but database updates use primary keys
- How `let` differs from `const`
- How JavaScript object syntax (`field: value`) works
- How Supabase `update()` performs database updates
- How `.eq()` works like a SQL `WHERE` clause
- Basic error handling after database operations
- React's render cycle and how derived values like `filteredData` are recalculated on each render

### Current Status

Study Mode

- Day filtering ✅
- Show one kanji ✅
- Show Answer ✅
- Next Kanji ✅

Smart Review

- Easy review logic ✅
- Difficult review logic ✅
- Review count tracking ✅
- Difficulty score tracking ✅
- Adaptive review algorithm ⏳

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

- Added `review_count` field to kanji records
- Added `difficulty_score` field to kanji records
- Updated TypeScript `Row` type to match database schema
- Planned Easy / Difficult review workflow
- Designed adaptive review logic
- Implemented `easyKanji()` function structure
- Learned how Supabase `update()` works
- Learned how `.eq()` is used as a SQL `WHERE` clause
- Connected review actions to specific kanji using `currentKanji.id`

### Learned

- Difference between `currentIndex` and database `id`
- Why React uses array indexes for display but database records use primary keys
- JavaScript `let` vs `const`
- JavaScript object syntax:
  - `field: value`
  - commas between properties

- How CRUD maps to Supabase:
  - Create → `insert()`
  - Read → `select()`
  - Update → `update()`
  - Delete → `delete()`

### Current Status

Study Mode is functional:

- Day filtering ✅
- Show Answer ✅
- Next Kanji ✅

Smart Review is partially implemented:

- Easy review logic ⏳
- Difficult review logic ⏳
- Database review tracking ⏳

### Next Goal

Complete the `easyKanji()` implementation and create `difficultKanji()`.

After both buttons work:

- Increment review counts
- Track difficulty scores
- Begin adaptive kanji review system

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

- Created a Next.js application
- Connected the app to a Supabase PostgreSQL database
- Created a test table and inserted sample data
- Fetched database data inside the React frontend
- Successfully deployed the project to Vercel

### Result

The deployed app successfully displays:

"Hello from Supabase"

This confirmed:

- database connection works
- environment variables work
- Supabase client setup works
- deployment pipeline works
- production deployment works

### Technologies Used

- Next.js
- React
- TypeScript
- Supabase
- PostgreSQL
- Vercel
- Git/GitHub

### Things I Learned

- Difference between TypeScript and JavaScript
- How environment variables work
- How frontend apps connect to databases
- Basic Git remote setup
- How deployment works on Vercel
- How React state and data fetching work

### Problems Solved

- Fixed missing Supabase export error
- Understood TypeScript type syntax
- Fixed Git remote setup
- Learned how Vercel environment variables work

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
