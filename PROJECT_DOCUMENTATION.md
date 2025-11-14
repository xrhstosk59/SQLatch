# SQLatch - Πλήρης Τεκμηρίωση Project

> **Έκδοση:** 1.0
> **Ημερομηνία:** 2025-01-14
> **Τύπος:** Educational SQL Platform με Visual Programming

---

## 📋 Περιεχόμενα

1. [Επισκόπηση Project](#επισκόπηση-project)
2. [Κύρια Χαρακτηριστικά](#κύρια-χαρακτηριστικά)
3. [Τεχνολογίες & Dependencies](#τεχνολογίες--dependencies)
4. [Αρχιτεκτονική Project](#αρχιτεκτονική-project)
5. [Δομή Φακέλων](#δομή-φακέλων)
6. [Αναλυτική Περιγραφή Αρχείων](#αναλυτική-περιγραφή-αρχείων)
7. [Workflows & Features](#workflows--features)
8. [Scripts & Commands](#scripts--commands)

---

## 🎯 Επισκόπηση Project

Το **SQLatch** είναι μια εκπαιδευτική πλατφόρμα για τη μάθηση SQL μέσω **visual programming**. Χρησιμοποιεί το Blockly για να δημιουργήσει ένα drag-and-drop interface που μετατρέπει blocks σε SQL queries, εκτελεί τα queries σε in-browser SQLite database, και παρέχει άμεσα αποτελέσματα.

### Στόχος
Να κάνει την εκμάθηση SQL προσβάσιμη σε αρχάριους μέσω οπτικού προγραμματισμού, ενώ παράλληλα δείχνει το πραγματικό SQL code που παράγεται.

### Κύρια Πλεονεκτήματα
- ✅ **Zero-setup** - Τρέχει εξολοκλήρου στον browser
- ✅ **Visual Programming** - Drag-and-drop SQL blocks
- ✅ **Instant Feedback** - Άμεση εκτέλεση queries
- ✅ **Educational Content** - Ενσωματωμένα μαθήματα και σενάρια
- ✅ **Modern UI** - Dark theme, responsive, animations
- ✅ **Query History** - Παρακολούθηση όλων των queries
- ✅ **Auto-save** - Αυτόματη αποθήκευση workspace

---

## 🌟 Κύρια Χαρακτηριστικά

### 1. Visual SQL Builder (Blockly)
- **Τι κάνει:** Drag-and-drop interface για δημιουργία SQL queries
- **Γιατί:** Οι αρχάριοι μπορούν να μάθουν SQL χωρίς να θυμούνται syntax
- **Τεχνολογία:** Google Blockly με custom SQL blocks
- **Features:**
  - Continuous toolbox (scrollable categories)
  - Dark theme integration
  - Zoom controls & zoom-to-fit
  - Pinch-to-zoom για mobile
  - Custom SQL blocks (SELECT, CREATE, INSERT, UPDATE, DELETE, WHERE, ORDER BY)

### 2. In-Browser SQL Database
- **Τι κάνει:** Εκτελεί πραγματικά SQL queries στον browser
- **Γιατί:** Δεν χρειάζεται backend server ή database installation
- **Τεχνολογία:** SQLite WASM (WebAssembly)
- **Features:**
  - Πλήρης SQL support
  - Persistent data κατά τη διάρκεια της session
  - Pre-loaded databases για scenarios
  - Error handling με φιλικά μηνύματα

### 3. Interactive Guide System
- **Τι κάνει:** Παρέχει structured μαθήματα, ασκήσεις και σενάρια
- **Γιατί:** Καθοδηγημένη μάθηση από βασικά σε προχωρημένα
- **Features:**
  - Markdown-based lessons με syntax highlighting
  - Auto-loading Blockly workspace ανά μάθημα
  - Pre-configured databases για κάθε σενάριο
  - Pagination με visual indicators
  - Home page με lesson overview

### 4. Query History & Management
- **Τι κάνει:** Καταγράφει όλα τα executed queries με metadata
- **Γιατί:** Tracking προόδου και εύκολη αναφορά σε παλιά queries
- **Features:**
  - Success/error status badges
  - Result count display
  - Query copy-to-clipboard
  - Individual query deletion
  - Clear all functionality
  - Timestamp tracking (ελληνική μορφή)
  - Collapsible panel

### 5. SQL Preview & Execution
- **Τι κάνει:** Δείχνει το generated SQL πριν το execution
- **Γιατί:** Educational - οι χρήστες βλέπουν τι SQL παράγουν τα blocks τους
- **Features:**
  - Syntax-highlighted preview modal
  - Confirm/Cancel actions
  - Results modal με table view
  - Error toasts με detailed messages
  - Keyboard shortcut (Ctrl+Enter)

### 6. Workspace Persistence
- **Τι κάνει:** Αυτόματη αποθήκευση και επαναφορά του workspace
- **Γιατί:** Οι χρήστες δεν χάνουν τη δουλειά τους
- **Features:**
  - Auto-save κάθε 2 δευτερόλεπτα
  - LocalStorage persistence
  - Visual save indicator
  - URL-based workspace sharing
  - Import/Export functionality

### 7. Modern Responsive UI
- **Τι κάνει:** Professional, dark-themed, mobile-friendly interface
- **Γιατί:** Better user experience σε όλες τις συσκευές
- **Features:**
  - Dark theme με gradients
  - Floating Action Button για execution
  - Responsive breakpoints (desktop, tablet, mobile)
  - Touch-optimized για mobile
  - Smooth animations & transitions
  - Bootstrap Icons integration

### 8. Keyboard Shortcuts
- **Τι κάνει:** Gyorsítótárok για common actions
- **Γιατί:** Power users μπορούν να δουλέψουν πιο γρήγορα
- **Shortcuts:**
  - `Ctrl+Enter` - Execute query
  - `Ctrl+S` - Share URL modal
  - Custom hook για extensibility

---

## 🛠️ Τεχνολογίες & Dependencies

### Core Framework
| Τεχνολογία | Έκδοση | Χρήση |
|------------|--------|-------|
| **Next.js** | 13.5.4 | React framework με SSR/SSG capabilities |
| **React** | 18.2.0 | UI library για component-based architecture |
| **TypeScript** | 5.2.2 | Type safety και developer experience |

**Γιατί Next.js:**
- Automatic code splitting για performance
- Built-in routing
- Optimized production builds
- Zero-config setup

### Visual Programming
| Τεχνολογία | Έκδοση | Χρήση |
|------------|--------|-------|
| **Blockly** | 10.2.2 | Core visual programming library |
| **@blockly/continuous-toolbox** | 5.0.8 | Scrollable toolbox για πολλά blocks |
| **@blockly/theme-dark** | 6.0.4 | Dark theme integration |
| **@blockly/zoom-to-fit** | 5.0.9 | Auto-zoom functionality |

**Γιατί Blockly:**
- Industry-standard visual programming από Google
- Extensible με custom blocks
- Code generation σε οποιαδήποτε γλώσσα (SQL στη δική μας περίπτωση)
- Mobile support

### Database
| Τεχνολογία | Έκδοση | Χρήση |
|------------|--------|-------|
| **@sqlite.org/sqlite-wasm** | 3.43.2 | In-browser SQL database |

**Γιατί SQLite WASM:**
- Πλήρης SQL database στον browser χωρίς server
- WebAssembly για native-like performance
- Persistent data στη session
- Ίδιο syntax με production databases

### UI/UX
| Τεχνολογία | Έκδοση | Χρήση |
|------------|--------|-------|
| **Bootstrap** | 5.3.2 | CSS framework για layout & components |
| **React Bootstrap** | 2.9.1 | React components για Bootstrap |
| **Bootstrap Icons** | 1.11.2 | Icon library |

**Γιατί Bootstrap:**
- Proven responsive grid system
- Pre-built components
- Dark theme support
- Accessibility features

### Content Processing
| Τεχνολογία | Έκδοση | Χρήση |
|------------|--------|-------|
| **Showdown** | 2.1.0 | Markdown to HTML converter |
| **html-react-parser** | 4.2.9 | Ασφαλής HTML parsing στη React |
| **DOMPurify** | 3.3.0 | XSS protection για HTML content |

**Γιατί αυτά:**
- Markdown για εύκολη συγγραφή lessons
- DOMPurify για security (XSS prevention)
- html-react-parser για React-safe rendering

### Development Tools
| Τεχνολογία | Έκδοση | Χρήση |
|------------|--------|-------|
| **ESLint** | - | Code quality & style enforcement |
| **Prettier** | 3.6.2 | Code formatting |
| **TypeScript** | 5.2.2 | Static type checking |

---

## 🏗️ Αρχιτεκτονική Project

### Component Architecture
```
┌─────────────────────────────────────────────┐
│           Next.js Application               │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │        Pages Layer (_app, index)      │ │
│  └───────────────────────────────────────┘ │
│              ↓                              │
│  ┌───────────────────────────────────────┐ │
│  │         Context Providers             │ │
│  │  • BlocklyContext (workspace mgmt)    │ │
│  │  • SQLiteContext (database ops)       │ │
│  │  • QueryHistoryContext (history)      │ │
│  │  • AutoSaveContext (persistence)      │ │
│  └───────────────────────────────────────┘ │
│              ↓                              │
│  ┌───────────────────────────────────────┐ │
│  │        Component Tree                 │ │
│  │  ┌─────────────────────────────────┐  │ │
│  │  │  Layout (Navbar)                │  │ │
│  │  └─────────────────────────────────┘  │ │
│  │  ┌──────────────┐  ┌───────────────┐  │ │
│  │  │   Blockly    │  │     Guide     │  │ │
│  │  │   + FAB      │  │  + History    │  │ │
│  │  └──────────────┘  └───────────────┘  │ │
│  │  ┌─────────────────────────────────┐  │ │
│  │  │     Modals (Preview, Output)    │  │ │
│  │  └─────────────────────────────────┘  │ │
│  └───────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Data Flow
```
User Action (Drag Block)
         ↓
BlocklyContext (workspace state)
         ↓
Generate SQL Code (Blockly.JavaScript)
         ↓
User clicks FAB → Preview Modal
         ↓
User confirms → SQLiteContext.queryDB()
         ↓
QueryHistoryContext.addQuery()
         ↓
Display Results / Error Toast
         ↓
AutoSaveContext (save workspace)
```

### State Management Strategy
- **React Context API** για global state (όχι Redux - overkill για το scope)
- **Local useState** για component-specific state
- **useRef** για Blockly workspace reference
- **LocalStorage** για persistence
- **URL parameters** για sharing

---

## 📁 Δομή Φακέλων

```
SQLatch/
├── public/                          # Static assets
│   ├── Intro/                       # Intro modal content
│   ├── MDGuides/                    # Educational content
│   │   ├── Lessons/                 # Structured lessons
│   │   ├── Scenarios/               # Story-based scenarios
│   │   └── Tasks/                   # Practice exercises
│   └── favicon.png                  # App icon
│
├── src/                             # Source code
│   ├── components/                  # React components
│   │   ├── blockly/                 # Blockly-related
│   │   ├── common/                  # Reusable components
│   │   ├── guide/                   # Tutorial system
│   │   ├── layout/                  # Layout components
│   │   ├── modals/                  # Modal dialogs
│   │   ├── sql/                     # SQL-related
│   │   └── ui/                      # UI elements
│   │
│   ├── contexts/                    # React Context providers
│   │   ├── AutoSaveContext.tsx      # Workspace auto-save
│   │   ├── BlocklyContext.tsx       # Blockly state
│   │   ├── QueryHistoryContext.tsx  # Query tracking
│   │   └── SQLiteContext.tsx        # Database operations
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useAutoSave.ts           # Auto-save logic
│   │   └── useKeyboardShortcut.ts   # Keyboard bindings
│   │
│   ├── modules/                     # Core modules
│   │   ├── Blockly/                 # Blockly configuration
│   │   │   ├── Blockly.ts           # Init & config
│   │   │   └── Blocks/              # Custom block definitions
│   │   ├── Showdown.ts              # Markdown processor
│   │   └── SQLite.ts                # Database wrapper
│   │
│   ├── pages/                       # Next.js pages
│   │   ├── _app.tsx                 # App wrapper with providers
│   │   └── index.tsx                # Main page
│   │
│   ├── styles/                      # CSS Modules
│   │   ├── global.css               # Global styles
│   │   ├── blockly.module.css       # Blockly styles
│   │   ├── guide.module.css         # Guide styles
│   │   ├── queryHistory.module.css  # History styles
│   │   └── runtimeControl.module.css # Deprecated (was top bar)
│   │
│   ├── types/                       # TypeScript definitions
│   │   └── global.d.ts              # Global type declarations
│   │
│   ├── utils/                       # Utility functions
│   │   ├── exportResults.ts         # CSV/JSON export
│   │   └── fileOperations.ts        # File handling
│   │
│   └── config/                      # Configuration files
│       └── lessons.ts               # Lesson metadata
│
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript configuration
├── next.config.js                   # Next.js configuration
├── .eslintrc.json                   # ESLint rules
├── .prettierrc                      # Prettier formatting
└── PROJECT_DOCUMENTATION.md         # This file

```

---

## 📄 Αναλυτική Περιγραφή Αρχείων

### Root Files

#### `package.json`
**Τι είναι:** NPM configuration file
**Τι κάνει:** Ορίζει dependencies, scripts, και project metadata
**Γιατί χρειάζεται:**
- Διαχείριση εξαρτήσεων (dependencies & devDependencies)
- NPM scripts για development, build, lint, format
- Browser field για polyfills (fs, os, path = false)

**Κύρια Scripts:**
```json
"dev": "next dev -p 3000"        // Development server
"build": "next build"            // Production build
"lint": "next lint"              // ESLint check
"format": "prettier --write"     // Code formatting
"type-check": "tsc --noEmit"     // TypeScript check
```

#### `tsconfig.json`
**Τι είναι:** TypeScript configuration
**Τι κάνει:** Ορίζει TypeScript compiler options
**Γιατί χρειάζεται:**
- Type checking rules
- Module resolution strategy
- JSX support για React
- Path aliases (@/ για src/)

#### `next.config.js`
**Τι είναι:** Next.js configuration
**Τι κάνει:** Custom Next.js build settings
**Γιατί χρειάζεται:**
- Webpack configuration
- Environment variables
- Image optimization settings
- Custom headers/redirects

---

## 📂 src/components/

### blockly/

#### `BlocklyField.tsx`
**Τι κάνει:** Main Blockly workspace component με SQL execution
**Γιατί χρειάζεται:** Το κέντρο της εφαρμογής - drag-and-drop SQL builder

**Features:**
- Blockly workspace initialization με dark theme
- Mobile detection & touch optimization
- Pinch-to-zoom support
- Zoom-to-fit control
- **Floating Action Button** για query execution
- SQL preview modal integration
- Results display modal
- Error toast notifications
- Auto-save integration
- Keyboard shortcuts (Ctrl+Enter)
- URL parameter loading για sharing

**Contexts χρησιμοποιεί:**
- `BlocklyContext` - Workspace management
- `SQLiteContext` - Query execution
- `QueryHistoryContext` - History tracking

**Dependencies:**
- `blockly` - Core library
- `@blockly/continuous-toolbox` - Scrollable toolbox
- `@blockly/theme-dark` - Dark theme
- `@blockly/zoom-to-fit` - Auto-zoom

**Key Functions:**
```typescript
showResult()      // Display query results or errors
onClickRun()      // Generate SQL and show preview
executeSQL()      // Execute query and update history
```

---

### common/

#### `BaseModal.tsx`
**Τι κάνει:** Reusable modal wrapper component
**Γιατί χρειάζεται:** DRY principle - single modal base για όλα τα modals

**Props:**
- `show: boolean` - Visibility state
- `onHide: () => void` - Close handler
- `title: string` - Modal title
- `children: ReactNode` - Modal content
- `size?: 'sm' | 'lg' | 'xl'` - Modal size
- `fullscreen?: boolean | string` - Fullscreen on mobile

**Features:**
- Responsive fullscreen on mobile (<768px)
- Dark theme styling
- Centered layout
- Custom header with close button
- Animation transitions

#### `IconButton.tsx`
**Τι κάνει:** Reusable button με icon
**Γιατί χρειάζεται:** Consistent button styling across app

**Props:**
- `icon: string` - Bootstrap icon class
- `onClick: () => void` - Click handler
- `variant?: string` - Bootstrap variant
- `children?: ReactNode` - Button text

---

### guide/

#### `Guide.tsx`
**Τι κάνει:** Main guide container - orchestrates lessons/scenarios
**Γιατί χρειάζεται:** Educational content management

**State:**
- `idxState` - Current lesson index
- `inHome` - Show home vs lesson
- `MDGuides` - Rendered HTML content
- `isLoading` - Loading state

**Features:**
- Lesson navigation (prev/next/home)
- Auto-load Blockly workspace per lesson
- Auto-load database per scenario
- Markdown to HTML conversion
- Lazy loading με Suspense
- **Query History display** (στο κάτω μέρος)

**Contexts:**
- `BlocklyContext` - Load workspace files
- `SQLiteContext` - Load databases
- `Showdown` - Markdown conversion

#### `GuideContent.tsx`
**Τι κάνει:** Displays rendered lesson content
**Γιατί χρειάζεται:** Separation of concerns - content rendering

**Features:**
- Sanitized HTML rendering (DOMPurify)
- Loading spinner
- Syntax highlighting για code blocks
- Responsive typography

#### `GuideHome.tsx`
**Τι κάνει:** Landing page με lesson list
**Γιατί χρειάζεται:** User-friendly lesson selection

**Features:**
- Card-based lesson grid
- Lesson names display
- Click handlers για navigation
- Responsive grid (2 columns → 1 on mobile)

#### `GuidePagination.tsx`
**Τι κάνει:** Lesson navigation controls
**Γιατί χρειάζεται:** Easy navigation between lessons

**Features:**
- Previous/Next buttons
- Home button
- Page numbers με active state
- Disabled states για first/last
- Responsive design

---

### layout/

#### `Navbar.tsx`
**Τι κάνει:** Top navigation bar
**Γιατί χρειάζεται:** App-wide navigation και actions

**Features:**
- Logo/Brand
- **Αρχείο** dropdown:
  - Άνοιγμα αρχείου (.json)
  - Αποθήκευση workspace (.json)
  - Εξαγωγή αποτελεσμάτων (CSV/JSON)
- **Ρυθμίσεις** dropdown:
  - Keyboard shortcuts modal
- **Κοινοποίηση** button:
  - Share URL modal
- Auto-save indicator
- Responsive hamburger menu (mobile)
- Dark theme

**Modals:**
- `KeyboardShortcutsModal` - Show shortcuts
- `ShareURLModal` - Generate share URLs

**Contexts:**
- `BlocklyContext` - File operations
- `AutoSaveContext` - Save indicator

---

### modals/

#### `IntroModal.tsx`
**Τι κάνει:** Welcome modal on first visit
**Γιατί χρειάζεται:** Onboarding για νέους users

**Features:**
- Markdown content από `/public/Intro/text.md`
- Auto-show on mount
- Responsive fullscreen on mobile
- DOMPurify sanitization

#### `KeyboardShortcutsModal.tsx`
**Τι κάνει:** Shows available keyboard shortcuts
**Γιατί χρειάζεται:** User education - power user features

**Shortcuts displayed:**
- `Ctrl+Enter` - Execute query
- `Ctrl+S` - Share URL

#### `ShareURLModal.tsx`
**Τι κάνει:** Generate shareable URL με workspace state
**Γιατί χρειάζεται:** Collaboration - share workspace με άλλους

**Features:**
- Base64 encode workspace JSON
- Copy to clipboard functionality
- Success toast notification
- URL preview

**Contexts:**
- `BlocklyContext` - Get workspace state

#### `SQLOutputModal.tsx`
**Τι κάνει:** Display query results σε table format
**Γιατί χρειάζεται:** User-friendly results visualization

**Props:**
- `output: Record<string, unknown>[]` - Query results
- `show: boolean`
- `onHide: () => void`

**Features:**
- Responsive table
- Auto-detect columns από data
- Scrollable για many rows
- Empty state message
- Dark theme styling

#### `SQLPreviewModal.tsx`
**Τι κάνει:** Preview generated SQL before execution
**Γιατί χρειάζεται:** Educational - show SQL code, allow cancellation

**Props:**
- `sqlCode: string` - Generated SQL
- `onConfirm: () => void` - Execute handler
- `show: boolean`
- `onHide: () => void`

**Features:**
- Syntax highlighting
- Pre-formatted code display
- Confirm/Cancel buttons
- Copy code functionality (future)

---

### sql/

#### `QueryHistory.tsx`
**Τι κάνει:** Display και manage εκτελεσμένα queries
**Γιατί χρειάζεται:** Progress tracking και query reuse

**State:**
- `isOpen: boolean` - Collapse state

**Features:**
- **Collapsible panel** με chevron icon
- **Query count badge**
- **Success/Error status badges** (✓/✗)
- **Timestamp** (ελληνική μορφή: DD/MM/YYYY HH:MM)
- **Result count** για successful queries
- **Error message** display
- **Copy query** to clipboard
- **Delete individual** query
- **Clear all** functionality
- **Empty state** με animated icon
- **Custom scrollbar** styling
- **Hover animations**
- **Modern gradient design**

**Contexts:**
- `QueryHistoryContext` - CRUD operations

**UI Design:**
- Dark theme με #1a1d29, #252a3a backgrounds
- Blue accents #4a9eff
- Gradient buttons
- Float animation για empty icon

#### `SQLRuntimeControl.tsx` (DEPRECATED)
**Τι ήταν:** Old top bar με execute button
**Γιατί deprecated:** Μετακινήθηκε στο BlocklyField ως FAB

**Status:** Δεν χρησιμοποιείται πλέον, αλλά κρατήθηκε για reference

---

### ui/

#### `AutoSaveIndicator.tsx`
**Τι κάνει:** Visual indicator για auto-save status
**Γιατί χρειάζεται:** User feedback - workspace is being saved

**States:**
- "Saving..." - During save
- "Saved" - After successful save
- Fade out animation

**Contexts:**
- `AutoSaveContext` - Listen to save events

#### `ErrorToast.tsx`
**Τι κάνει:** Error notification toast
**Γιατί χρειάζεται:** User-friendly error messages

**Props:**
- `error: string` - Error message
- `show: boolean`
- `onHide: () => void`

**Features:**
- Auto-hide after 5s
- Dismissible
- Red theme
- Bottom-right position

#### `LoadingSpinner.tsx`
**Τι κάνει:** Loading indicator
**Γιατί χρειάζεται:** Feedback για async operations

**Props:**
- `message?: string` - Optional loading text

**Features:**
- Bootstrap spinner
- Centered layout
- Dark theme

#### `SuccessToast.tsx`
**Τι κάνει:** Success notification toast
**Γιατί χρειάζεται:** Positive feedback για actions

**Props:**
- `message: string`
- `show: boolean`
- `onHide: () => void`

**Features:**
- Auto-hide after 3s
- Green theme
- Dismissible

---

## 📂 src/contexts/

### `AutoSaveContext.tsx`
**Τι κάνει:** Auto-save workspace logic
**Γιατί χρειάζεται:** Prevent data loss

**State:**
- `lastSaved: Date | null` - Timestamp
- `isSaving: boolean` - Save in progress

**Functions:**
```typescript
triggerSave()     // Manual save trigger
```

**How it works:**
- Listens to BlocklyContext changes
- Debounced save (2s delay)
- Saves to LocalStorage
- Updates lastSaved timestamp

**LocalStorage key:** `blockly-workspace-autosave`

### `BlocklyContext.tsx`
**Τι κάνει:** Blockly workspace state management
**Γιατί χρειάζεται:** Central workspace control

**State:**
- `workspace: Blockly.WorkspaceSvg | null`
- `toolbox: JSON` - Blockly toolbox config

**Functions:**
```typescript
initBlockly()                  // Initialize custom blocks
initGen()                      // Initialize SQL generator
setWorkspace(ws)              // Set workspace reference
getWorkspace()                // Get workspace reference
runGen()                      // Generate SQL from blocks
loadWorkspaceFile(path)       // Load .json workspace
loadWorkspaceState(state)     // Load from object
getWorkspaceState()           // Export workspace
getToolbox()                  // Get toolbox config
```

**How it works:**
- Wraps Blockly API
- Manages custom SQL blocks
- Code generation (Blockly.JavaScript)
- File I/O operations

### `QueryHistoryContext.tsx`
**Τι κάνει:** Query history management
**Γιατί χρειάζεται:** Track executed queries

**State:**
- `history: QueryEntry[]`

**QueryEntry interface:**
```typescript
{
  id: string           // UUID
  query: string        // SQL code
  timestamp: Date      // Execution time
  success: boolean     // Success/error
  resultCount?: number // Row count
  error?: string       // Error message
}
```

**Functions:**
```typescript
addQuery(query, success, resultCount?, error?)
deleteQuery(id)
clearHistory()
```

**Persistence:** LocalStorage με key `sql-query-history`

### `SQLiteContext.tsx`
**Τι κάνει:** SQLite database operations
**Γιατί χρειάζεται:** Execute SQL queries in-browser

**State:**
- `db: sqlite3 | null` - Database instance
- `resultDB: Record<string, unknown>[]` - Query results
- `error: string` - Last error

**Functions:**
```typescript
initSQL()              // Initialize SQLite WASM
queryDB(sql)          // Execute SQL query
getResultDB()         // Get last results
getError()            // Get last error
resetDB()             // Clear database
loadDB(path)          // Load .db file
```

**How it works:**
- Loads SQLite WASM module
- Creates in-memory database
- Executes queries με exec()
- Parses results to JSON
- Error handling με try-catch

---

## 📂 src/hooks/

### `useAutoSave.ts`
**Τι κάνει:** Custom hook για auto-save functionality
**Γιατί χρειάζεται:** Reusable auto-save logic

**Usage:**
```typescript
useAutoSave(data, saveFunction, delay)
```

**How it works:**
- useEffect με debounce
- Saves after N ms of inactivity
- Prevents excessive saves

### `useKeyboardShortcut.ts`
**Τι κάνει:** Custom hook για keyboard bindings
**Γιατί χρειάζεται:** Reusable shortcut logic

**Usage:**
```typescript
useKeyboardShortcut({ key: 'Enter', ctrl: true }, callback)
```

**Options:**
- `key: string` - Key name
- `ctrl?: boolean` - Ctrl modifier
- `shift?: boolean` - Shift modifier
- `alt?: boolean` - Alt modifier

**How it works:**
- Adds keydown listener
- Checks modifiers
- Calls callback if match
- Cleanup on unmount

---

## 📂 src/modules/

### Blockly/

#### `Blockly.ts`
**Τι κάνει:** Blockly initialization και custom block loading
**Γιατί χρειάζεται:** Custom SQL block definitions

**Functions:**
```typescript
initializeBlockly()    // Load all custom blocks
getSQLGenerator()      // Get SQL code generator
```

**Custom Blocks loaded:**
- `select.json` - SELECT statement
- `create.json` - CREATE TABLE
- `insert.json` - INSERT INTO
- `update.json` - UPDATE
- `delete.json` - DELETE FROM
- `where.json` - WHERE clause
- `order_by.json` - ORDER BY clause
- `column.json` - Column definition
- `column_name.json` - Column reference
- `value.json` - Value input
- `set.json` - SET clause

#### `Blocks/*.json`
**Τι είναι:** Blockly block definitions
**Τι περιέχουν:**
- Block structure (inputs, fields, connections)
- Block color/style
- Code generator (JavaScript)

**Example: `select.json`**
```json
{
  "type": "select",
  "message0": "SELECT %1 FROM %2 %3 %4",
  "args0": [
    { "type": "input_value", "name": "COLUMNS" },
    { "type": "field_input", "name": "TABLE" },
    { "type": "input_value", "name": "WHERE" },
    { "type": "input_value", "name": "ORDER" }
  ]
}
```

#### `toolbox.json`
**Τι είναι:** Blockly toolbox configuration
**Τι ορίζει:** Categories και available blocks

**Categories:**
- Γενικά (SELECT, WHERE, ORDER BY)
- Δημιουργία (CREATE TABLE, COLUMN)
- Εισαγωγή (INSERT INTO, VALUES)
- Επιλογή (SELECT variants)
- Ενημέρωση (UPDATE, SET)
- Διαγραφή (DELETE FROM)

### `Showdown.ts`
**Τι κάνει:** Markdown to HTML converter wrapper
**Γιατί χρειάζεται:** Lesson content rendering

**Functions:**
```typescript
useShowdown()
  .convertMd(path)    // Load MD file and convert to HTML
```

**Configuration:**
- Tables support
- Strikethrough
- Task lists
- Code highlighting

### `SQLite.ts`
**Τι κάνει:** SQLite WASM wrapper
**Γιατί χρειάζεται:** Simplified database API

**Functions:**
```typescript
initSQLite()         // Load WASM module
executeQuery(sql)    // Run SQL query
loadDatabase(path)   // Load .db file
```

**How it works:**
- Loads sqlite-wasm module
- Creates OPFS-based database
- Provides promise-based API

---

## 📂 src/pages/

### `_app.tsx`
**Τι κάνει:** Next.js app wrapper
**Γιατί χρειάζεται:** Global providers και styles

**Wraps:**
- BlocklyProvider
- SQLiteProvider
- QueryHistoryProvider
- AutoSaveProvider

**Imports:**
- Bootstrap CSS
- Bootstrap Icons
- Global CSS

### `index.tsx`
**Τι κάνει:** Main page - app layout
**Γιατί χρειάζεται:** Single-page app structure

**Layout:**
```
<Navbar />
<Container>
  <Row>
    <Col lg={7}>
      <BlocklyField />  {/* + FAB */}
    </Col>
    <Col lg={5}>
      <Guide />  {/* + QueryHistory */}
    </Col>
  </Row>
</Container>
<IntroModal />
```

**Features:**
- Responsive grid (70/30 split on desktop, stacked on mobile)
- Lazy loading (Guide, IntroModal)
- Dark theme
- Viewport meta tag για mobile

---

## 📂 src/styles/

### `global.css`
**Τι κάνει:** Global CSS styles
**Γιατί χρειάζεται:** App-wide styling

**Defines:**
- `.wh-100` - Full width/height utility
- `.bg-dark` - Dark background
- Body styling (dark theme, font)
- Scrollbar styling

### `blockly.module.css`
**Τι κάνει:** Blockly workspace styles
**Γιατί χρειάζεται:** Workspace sizing και FAB styling

**Classes:**
- `.container` - Workspace container με responsive height
- `.floatingButton` - FAB (Floating Action Button)
  - Fixed position bottom-right
  - Green gradient
  - Pill shape (border-radius: 50px)
  - Hover animations (lift effect)
  - Responsive (icon-only on mobile)

### `guide.module.css`
**Τι κάνει:** Guide panel styles
**Γιατί χρειάζεται:** Lesson content styling

**Classes:**
- `.container` - Main guide container
- `.card` - Lesson card styling
- `.pagination` - Navigation buttons
- `.content` - Markdown content styling

### `queryHistory.module.css`
**Τι κάνει:** Query history panel styles
**Γιατί χρειάζεται:** Modern history UI

**Classes:**
- `.container` - Main container με gradients
- `.header` - Collapsible header
- `.toggleButton` - Collapse toggle
- `.badge` - Query count badge
- `.listItem` - Individual query item
- `.queryCode` - SQL code display
- `.statusBadge` - Success/error indicator
- `.actionButton` - Copy/delete buttons
- `.emptyState` - No queries state
- `.emptyIcon` - Animated floating icon

**Design:**
- Dark gradients (#1a1d29, #252a3a)
- Blue accents (#4a9eff)
- Green success (#28a745)
- Red error (#dc3545)
- Float animation για empty icon

### `runtimeControl.module.css` (DEPRECATED)
**Τι ήταν:** Old execute button bar styles
**Γιατί deprecated:** Replaced by FAB in blockly.module.css

---

## 📂 src/types/

### `global.d.ts`
**Τι κάνει:** Global TypeScript type declarations
**Γιατί χρειάζεται:** Type safety για custom types

**Declares:**
- Window extensions
- Module declarations
- Global interfaces

---

## 📂 src/utils/

### `exportResults.ts`
**Τι κάνει:** Export query results σε CSV/JSON
**Γιατί χρειάζεται:** Data export functionality

**Functions:**
```typescript
exportToCSV(data, filename)
exportToJSON(data, filename)
```

**How it works:**
- Converts data to format
- Creates Blob
- Triggers download

### `fileOperations.ts`
**Τι κάνει:** File read/write operations
**Γιατί χρειάζεται:** Workspace import/export

**Functions:**
```typescript
readFile(file)           // Read file content
downloadFile(data, name) // Trigger download
```

---

## 📂 src/config/

### `lessons.ts`
**Τι κάνει:** Lesson metadata configuration
**Γιατί χρειάζεται:** Central lesson configuration

**Exports:**
- `LTS: string[]` - Lesson file paths
- `LTSBlocks: string[]` - Workspace files
- `LTSNames: string[]` - Display names
- `DBs: string[]` - Database files

**Content:**
- 3 Lessons (SELECT, CREATE TABLE, INSERT)
- 1 Task
- 3 Scenarios (story-based learning)

---

## 📂 public/

### `Intro/text.md`
**Τι είναι:** Intro modal content
**Τι περιέχει:** Welcome message και quick start

### `MDGuides/`
**Τι είναι:** Educational content directory
**Δομή:**
```
MDGuides/
├── Lessons/           # Structured tutorials
│   ├── Lesson1/       # SELECT basics
│   ├── Lesson2/       # CREATE TABLE
│   └── Lesson3/       # INSERT data
├── Scenarios/         # Story-based learning
│   ├── Scenario1/     # Magic book story
│   ├── Scenario2/     # Museum theft
│   └── Scenario3/     # Planet exploration
└── Tasks/             # Practice exercises
```

**File types:**
- `theory.md` / `scen.md` / `tasks.md` - Lesson content
- `blocks.json` - Pre-configured Blockly workspace
- `database.db` - SQLite database για το scenario

---

## 🔄 Workflows & Features

### User Journey: Εκτέλεση Query

1. **User opens app**
   - IntroModal shows (first visit)
   - Blockly workspace loads
   - SQLite initializes

2. **User drags blocks**
   - Blockly workspace updates
   - Auto-save triggers (2s debounce)

3. **User clicks FAB** (Floating Action Button)
   - SQL code generates από blocks
   - Preview modal opens με SQL

4. **User confirms**
   - SQLite executes query
   - Results/error captured
   - Query added to history
   - Results modal shows / Error toast shows

5. **User views history**
   - Clicks "Ιστορικό Queries" στο guide panel
   - Sees all past queries με status
   - Can copy/delete queries

### Auto-Save Flow

1. **Workspace changes**
   - BlocklyContext updates
   - AutoSaveContext detects change

2. **Debounce timer** (2s)
   - Waits for user to stop editing

3. **Save**
   - Workspace exported to JSON
   - Saved to LocalStorage
   - Indicator shows "Saving..."

4. **Complete**
   - Indicator shows "Saved"
   - Fades out after 2s

### Lesson Navigation Flow

1. **User opens app**
   - Guide shows home page με lesson list

2. **User selects lesson**
   - Markdown loads and renders
   - Associated Blockly workspace loads
   - Database loads (if scenario)

3. **User navigates**
   - Prev/Next buttons
   - Home button returns to list
   - Page numbers για direct access

---

## 🎮 Scripts & Commands

### Development
```bash
npm run dev          # Start dev server on port 3000
npm run build        # Production build
npm run lint         # Check code quality
npm run lint:fix     # Auto-fix lint issues
```

### Code Quality
```bash
npm run format       # Format all files με Prettier
npm run format:check # Check formatting
npm run type-check   # TypeScript validation
```

### Production
```bash
npm run build        # Build για production
npm start            # Start production server
```

---

## 🎨 Design System

### Colors
- **Primary Background:** #1a1d29, #252a3a (dark gradients)
- **Accent:** #4a9eff (blue)
- **Success:** #28a745 (green)
- **Error:** #dc3545 (red)
- **Text:** #e1e4ed (light gray)

### Typography
- **Font:** System font stack
- **Headings:** Bold, gradient text
- **Code:** 'Consolas', 'Monaco', monospace

### Spacing
- **Container padding:** 12-20px
- **Gap:** 8-15px
- **Border radius:** 6-12px (buttons), 20px (badges), 50px (pills)

### Animations
- **Transitions:** `all 0.3s ease`
- **Hover effects:** `translateY(-2px)`, enhanced shadows
- **Float animation:** Keyframe για empty states

---

## 🔒 Security

### XSS Prevention
- **DOMPurify** sanitizes όλο το HTML content
- **html-react-parser** για React-safe rendering
- User input escaped στα queries

### Data Privacy
- **No backend** - όλα τα data μένουν στον browser
- **LocalStorage only** - no cookies, no tracking
- **No analytics** - privacy-first

---

## 📱 Responsive Breakpoints

- **Desktop:** ≥992px (70/30 split)
- **Tablet:** 768-991px (60/40 split, stacked)
- **Mobile:** <768px (stacked layout, icon-only FAB)
- **Small mobile:** <576px (reduced padding, compact UI)

---

## 🚀 Future Enhancements

### Planned Features
- [ ] More SQL blocks (JOIN, GROUP BY, HAVING)
- [ ] Multiple database support
- [ ] Query performance metrics
- [ ] Collaborative editing (realtime)
- [ ] Export workspace to SQL file
- [ ] Import SQL to blocks (reverse)
- [ ] Dark/Light theme toggle
- [ ] More scenarios και lessons

### Known Limitations
- SQLite WASM requires modern browser
- Large databases may be slow
- No server-side persistence
- Limited to SQLite SQL dialect

---

## 📞 Επαφή & Πληροφορίες

**Project Type:** Educational Platform
**License:** [Specify]
**Created:** 2024
**Version:** 1.0

---

**Τέλος Τεκμηρίωσης**
