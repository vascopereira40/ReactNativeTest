## Installation & Running

Under the directory /ReactNativeTest at the package.json level

### 1. Install dependencies

```
npm install
```

### 2. Start the Expo app

```
npm start
```

Open the Expo Go app
Scan the QR code and it will build the app

## Running Tests

```
npm test
```

This runs Jest with:

- jest-expo preset
- @testing-library/react-native
- mocks for icons and React Navigation
- proper handling of ESM packages

All test suites are passing:

```
PASS **tests**/mockApi.test.ts
PASS **tests**/CategoryEntryScreen.test.tsx
```

## Features

### Multi-level Category Navigation

- Supports category trees of arbitrary depth.
- Parent categories navigate to CategoryLevelScreen.
- Leaf categories navigate directly to ProductListPlaceholderScreen.
- “View all in {Category}” rows are fully supported.

### Highlight Section

- Fetches via React Query.
- Only renders if exactly 4 highlight cards are returned (per assignment rules).
- Supports INTERNAL routes (PLP / CLP / PD) and EXTERNAL routes (open URL).
- Shows skeleton placeholders while loading.

### Brand Section

- Shows a single Brands entry (based on provided mock API).
- Navigates to BrandListPlaceholderScreen.
- Shows skeleton placeholder while loading.

### Placeholder Screens

- Simple, clean placeholder screens as required:
- ProductListPlaceholderScreen (PLP / CLP / PD influences this screen it can either render just a product detail or a list of products)
- BrandListPlaceholderScreen
- They display all route parameters received, aiding review & debugging.

### Loading States (Skeletons)

Skeleton loaders for:

- Highlights grid
- Categories
- Brands

Consistent design & spacing across the app.

### Cached Data Handling (React Query)

When React Query serves stale/cached data:

- A banner is displayed at the top: “Showing cached data. Pull to refresh.”

### Basic Testing (Required)

- Test for mock API (success + error).
- Test for CategoryEntryScreen:
  - loading state (skeletons)
  - data state (sections render correctly)

All tests pass.

## Project Structure

```
src/
├── api/
│   └── mockApi.ts
│
├── navigation/
│   └── RootNavigator.tsx
│
├── screens/
│   ├── CategoryEntryScreen.tsx
│   ├── CategoryLevelScreen.tsx
│   ├── ProductListPlaceholderScreen.tsx
│   └── BrandListPlaceholderScreen.tsx
│
├── hooks/
│   ├── useHighlights.ts
│   └── useCategoryTree.ts
│
├── components/
│   ├── CategoryRow.tsx
│   ├── HighlightCard.tsx
│   ├── SkeletonBlock.tsx
│   ├── BrandsRow.tsx
│   ├── MockListItem.tsx
│   ├── SearchBar.tsx
│   └── ErrorScreen.tsx
│
├── utils/
│   ├── delay.ts
│   └── mockList.ts
│
└── styles/
    └── globals.ts

__tests__/
├── mockApi.test.ts
└── CategoryEntryScreen.test.tsx

App.tsx
README.md

```

## Architecture Overview

This project follows a simple but scalable structure:

- **Screens** contain UI and user interaction logic.
- **Hooks** (with React Query) handle data fetching, caching, and error/loading states.
- **API layer** simulates backend endpoints and contains all mock server logic.
- **Components** provide reusable UI pieces shared across screens.
- **Navigation** is centralized in `RootNavigator.tsx`, following a stack-based approach.
- **Styles** contain design tokens (colors, spacing, typography), ensuring visual consistency.

This separation keeps the codebase modular, easy to navigate, and easy to extend.

## Data Flow Overview

The data flow follows a predictable pattern:

1. **Screen** requests data using a custom hook  
   (`useHighlights`, `useCategoryTree`)

2. **Hooks** call the mock API  
   (`getHighlightContent`, `getCategoryTree`)

3. **React Query** manages:

   - caching
   - background refetch
   - stale state (used for "cached data" banner)
   - loading & error states

4. **Screens** render:

   - skeletons (while loading)
   - UI sections (on success)
   - error screen (on failure)

5. **User interaction** triggers navigation through route metadata
   (`route.screen` + `params.id`).

This approach keeps UI logic clean while providing a realistic e-commerce data lifecycle.

## Technical Decisions & Notes

### 1. React Query

React Query was chosen over manual `useEffect` + fetch because it:

- simplifies async management
- provides caching and stale-while-revalidate automatically
- reduces boilerplate for loading/error states

The trade-off is a slightly larger bundle size, but the benefits outweigh the cost for this type of app.

### 2. Placeholder Screens Instead of Real Screens

Using single placeholder screens (PLP/CLP/PD combined) avoids duplicating code.  
The trade-off is less separation, but it fits the assignment's simplicity requirement.
The backend-provided `route.screen` controls what type of page is shown.  
The trade-off is that navigation maps all three to a shared placeholder instead of separate screens,  
but this keeps the codebase small and faithful to the assignment.

### 3. Brands Section Interpretation

The assignment does not define the brands object shape.
Mock API provides it as a single node, not a list.

To remain faithful to the spec:

- Brands is rendered as a single row
- It navigates to BrandListPlaceholderScreen, as required
- Placeholder indicates no route params are expected

### 4. Highlight Rendering Rules

Per specification:

- Only show highlight section if exactly 4 highlights are returned
- Otherwise hide the entire section
- Loading shows a 4-card skeleton grid

### 5. Caching Signaling

When data is from cache:

- A banner appears at the top (“Showing cached data…”)
- Pull-to-refresh triggers a fresh fetch

### 6. Safe Area Handling

Expo’s built-in SafeAreaView is deprecated.
The app uses:

```
react-native-safe-area-context
```

For screens that use React Navigation headers, top insets are controlled by Navigation, so content uses normal View or SafeAreaView with:

```
<SafeAreaView edges={["bottom", "left", "right"]} />
```

### 7. Global Styles

A unified design system is defined in:

```
src/styles/globals.ts
```

Provides:

- Colors
- Spacing scale
- Typography
- Global styles

Ensures a consistent look across the entire app.

## Mock API

The mock backend simulates:

```
/getHighlightContent
```

- Returns 4 highlight cards
- Can simulate failure via toggle

```
/getCategoryTree
```

- Returns:
  - categories (multi-level tree)
  - brands node
- Can simulate failure

Used by React Query hooks with loading/error/cached states.

## Navigation Overview

```
CategoryEntryScreen
 ├── Highlight Grid (if 4 items)
 ├── Categories (top level)
 └── Brands Row
      ↓
BrandListPlaceholderScreen

CategoryLevelScreen
 ├── Child categories
 └── “View all in {Category}”
      ↓
ProductListPlaceholderScreen

Leaf Category
 ↓
ProductListPlaceholderScreen
```

Highlight INTERNAL cards may route to:

- PLP
- CLP
- PD

EXTERNAL cards open the browser.

## Final Notes

This implementation follows the assignment closely:

- Category navigation with multi-depth tree
- Highlight rules
- Brand section
- React Query caching
- Loading skeletons
- Mock backend
- Testing (API + UI)

And focuses on code clarity, reproducibility, and consistent UX.
