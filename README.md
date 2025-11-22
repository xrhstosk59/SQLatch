# SQLatch

> **Visual SQL Learning Platform** - Μάθε SQL με drag-and-drop blocks!

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![SQLite WASM](https://img.shields.io/badge/SQLite-WASM-003b57?style=flat&logo=sqlite)](https://sqlite.org/wasm/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat)](LICENSE)

---

## 📚 Περιγραφή

Το **SQLatch** είναι μια εκπαιδευτική πλατφόρμα που κάνει τη μάθηση SQL **εύκολη και διασκεδαστική**! Χρησιμοποιώντας visual programming με **Blockly blocks**, οι μαθητές μπορούν να δημιουργήσουν SQL queries χωρίς να θυμούνται syntax.

### 🎯 Γιατί SQLatch;

- ✅ **Zero Setup** - Τρέχει εξολοκλήρου στον browser, χωρίς installation
- ✅ **Visual Programming** - Drag-and-drop SQL blocks
- ✅ **Instant Feedback** - Εκτέλεση queries σε real-time με in-browser database
- ✅ **Educational Content** - Ενσωματωμένα μαθήματα, ασκήσεις και σενάρια
- ✅ **Modern UI** - Dark theme, responsive, mobile-friendly
- ✅ **Share & Collaborate** - Save/load workspace, share URLs

---

## ✨ Κύρια Χαρακτηριστικά

### 🎨 Modern User Interface

- **Floating Action Buttons (FAB)** - Dual FAB για "Run All" και "Run Selected"
- **Dark theme** με gradient backgrounds και smooth animations
- **Responsive design** - Works σε desktop (≥992px), tablet (768-991px), και mobile (<768px)
- **Touch-optimized** με pinch-to-zoom support για Blockly workspace
- **Icon-based UI** - Bootstrap Icons 1.13 throughout interface
- **Toast notifications** - Success, Error, και Validation toasts με auto-dismiss
- **Modal system** - Keyboard-accessible modals με focus management
- **Progress bars** - Visual progress tracking σε scenarios

### 🧩 Visual SQL Builder (18 Block Types)

- **Drag-and-drop blocks** για SQL statements
- **Πλήρες Support για SQL Operations**:
    - **Data Query**: `SELECT` με `WHERE`, `ORDER BY`, `GROUP BY`, `HAVING`, `JOIN`
    - **Table Creation**: `CREATE TABLE` με column definitions και constraints (PRIMARY KEY, UNIQUE, FOREIGN KEY)
    - **Data Manipulation**: `INSERT`, `UPDATE`, `DELETE`
    - **Aggregation Functions**: `MIN`, `MAX`, `SUM`, `AVG`, `COUNT`
    - **Logical Operators**: `AND`, `OR`, `NOT`
    - **Advanced**: Multiple column support, chained conditions, SET clauses
- **Smart Block Validation** - Τα blocks "κουμπώνουν" μόνο σε valid positions με parent/child checking
- **Continuous Toolbox** - Innovative flyout design
- **Selective Execution** - Run all blocks ή run selected block only
- **SQL Preview Modal** - Δες και review το generated SQL πριν το execution
- **Syntax highlighting** για better readability

### 💾 In-Browser Database

- **SQLite WASM** - Πλήρης SQL database στον browser
- **Pre-loaded scenarios** με 5 example databases (Bindle, E-commerce, Finance, Live, NBA)
- **Real-time execution** - Instant results
- **Error handling** με user-friendly messages
- **Schema Visualization** - Interactive React Flow diagrams με:
  - Table relationships και foreign keys
  - Color-coded tables
  - Drag-and-drop node positioning
  - Auto-layout για tables

### 📖 Interactive Learning

- **10 Μαθήματα**: SELECT, CREATE, INSERT, Logical Operators, UPDATE, DELETE/DROP, Aggregation Functions, ORDER BY, GROUP BY, JOIN
- **2 Σενάρια**: Story-based learning με video integration (The Magic Book Part 1 & 2)
  - Part 1: 8 exercises (SELECT, WHERE, OR, INSERT, UPDATE, MIN, ORDER BY, DELETE)
  - Part 2: 7 exercises (GROUP BY, HAVING, JOIN operations)
- **3 Task Sets**: Progressive practice exercises με validation
- **Markdown-based content** - Εύκολη προσθήκη νέων lessons
- **Progress tracking** - Lesson completion stored locally

### 📊 Query History

- **Track έως 50 executed queries** με timestamp
- **Success/Error status** indicators με icons
- **Result count** display για successful queries
- **Copy to clipboard** functionality για individual queries
- **Delete individual** ή clear all queries
- **Collapsible UI** για space optimization
- **LocalStorage persistence** - Queries μένουν μετά το reload

### 💾 Workspace Persistence

- **Auto-save** κάθε 30 δευτερόλεπτα (configurable, με toggle on/off)
- **LocalStorage** persistence - Δεν χάνεις τη δουλειά σου
- **Auto-save indicator** - Shows last saved timestamp
- **Import/Export** workspace files (.json) με drag & drop support
- **Share URLs** - Base64-encoded workspace sharing
- **Confirmation dialogs** για destructive actions

### ⌨️ Power User Features

- **Comprehensive Keyboard Shortcuts**:
  - `Ctrl+Enter` - Execute SQL query (Run All)
  - `Ctrl+S` - Save workspace as JSON file
  - `Ctrl+O` - Load workspace from JSON file
  - `Ctrl+Shift+S` - Generate shareable URL
  - `Esc` - Close open modals
  - `Tab` / `Shift+Tab` - Navigate UI elements
  - `?` - Show keyboard shortcuts help modal
- **Multiple Export Formats**: CSV, JSON, και clipboard copy (tab-separated)
- **Export query results** με proper quote handling
- **Custom scenarios** - Δημιούργησε τα δικά σου μαθήματα
- **Validation system** - Deep-equal output comparison για lessons

---

## 🛠️ Tech Stack

### Core

- **[Next.js 15.5](https://nextjs.org/)** - React framework με static export
- **[React 18.3](https://react.dev/)** - UI library με Suspense & startTransition
- **[TypeScript 5.6](https://www.typescriptlang.org/)** - Type safety με strict mode

### Visual Programming

- **[Blockly](https://developers.google.com/blockly)** - Google's visual programming library
- **Blockly Plugins**: Continuous Toolbox, Dark Theme, Zoom-to-Fit

### Database

- **[SQLite WASM](https://sqlite.org/wasm/)** - Full SQL database σε WebAssembly

### UI/UX

- **[Bootstrap 5](https://getbootstrap.com/)** & **React Bootstrap 2.10** - Responsive components
- **[Bootstrap Icons 1.13](https://icons.getbootstrap.com/)** - Icon library
- **[React Flow 11.11](https://reactflow.dev/)** - Schema visualization diagrams
- **CSS Modules** & **SASS 1.94** - Scoped styling με preprocessor

### Content

- **[Showdown](https://showdownjs.com/)** - Markdown to HTML converter
- **[DOMPurify](https://github.com/cure53/DOMPurify)** - XSS protection

### Code Quality

- **[ESLint](https://eslint.org/)** - Linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript](https://www.typescriptlang.org/)** - Type checking

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.x ή νεότερο
- **npm** 7.x ή νεότερο

### Installation

```bash
# Clone the repository
git clone https://github.com/xrhstosk59/SQLatch.git
cd SQLatch

# Install dependencies
npm install

# Start development server (port 3000)
npm run dev
```

Άνοιξε το browser στο **http://localhost:3000** 🎉

### Production Build

```bash
# Build για production (static export)
npm run build

# Το output βρίσκεται στο ./out folder
# Deploy το out/ σε οποιονδήποτε static host
```

---

## 📂 Project Structure

```
SQLatch/
├── src/
│   ├── components/          # React components (25+)
│   │   ├── blockly/         # Blockly workspace + FAB buttons
│   │   ├── common/          # Reusable components (BaseModal, InfoScenarioButton)
│   │   ├── guide/           # Tutorial system (Guide, GuideHome, GuideContent, GuidePagination)
│   │   ├── layout/          # Navbar με file operations
│   │   ├── modals/          # Modal dialogs (SQL Output, Preview, Schema, Sharing, etc.)
│   │   ├── scenario/        # Scenario component με video integration
│   │   ├── sql/             # QueryHistory, SQLRuntimeControl, SchemaButton
│   │   ├── sql_schema_visualizer/ # React Flow-based schema visualization
│   │   └── ui/              # UI elements (Toasts, LoadingSpinner, AutoSaveIndicator)
│   │
│   ├── contexts/            # React Context providers (4 total)
│   │   ├── AutoSaveContext.tsx      # Auto-save management (30s interval, toggle on/off)
│   │   ├── BlocklyContext.tsx       # Blockly workspace + SQL code generator
│   │   ├── QueryHistoryContext.tsx  # Query tracking (50 queries max)
│   │   └── SQLiteContext.tsx        # SQLite WASM database management
│   │
│   ├── hooks/               # Custom React hooks (2 total)
│   │   ├── useAutoSave.ts          # Interval-based auto-save hook
│   │   └── useKeyboardShortcut.ts  # Keyboard shortcut handler
│   │
│   ├── modules/             # Core modules
│   │   ├── Blockly/Blocks/  # 18 Blockly block JSON definitions
│   │   ├── SchemaGenerator.ts   # Database schema introspection
│   │   ├── Showdown.ts          # Markdown converter με DOMPurify
│   │   ├── SQLite.ts            # Legacy SQLite wrapper
│   │   └── Validator.ts         # Query/output validation system
│   │
│   ├── pages/               # Next.js pages
│   │   ├── index.tsx        # Main application page
│   │   └── _app.tsx         # App wrapper με global styles
│   │
│   ├── styles/              # CSS Modules & global styles
│   │   ├── blockly.module.css
│   │   ├── guide.module.css
│   │   ├── queryHistory.module.css
│   │   ├── runtimeControl.module.css
│   │   └── global.css
│   │
│   ├── utils/               # Utility functions
│   │   ├── exportResults.ts     # CSV/JSON export με quote handling
│   │   └── fileOperations.ts    # File download/upload helpers
│   │
│   └── config/              # Configuration
│       └── lessons.ts       # 15 lessons/scenarios/tasks configuration
│
├── public/                  # Static assets
│   ├── MDGuides/            # Educational content (Markdown + databases)
│   │   ├── Lessons/         # 10 lessons με theory.md, blocks.json, database.db
│   │   ├── Scenarios/       # 2 scenarios με videos, blocks, και databases
│   │   └── Tasks/           # 3 task sets με exercises
│   ├── sql_schema_visualizer/ # 5 example databases (Bindle, E-commerce, Finance, Live, NBA)
│   └── favicon.png
│
├── PROJECT_DOCUMENTATION.md # Full technical documentation (1300+ lines)
└── README.md                # This file
```

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server με hot reload (port 3000)
npm run build            # Production build (static export)

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format code με Prettier
npm run format:check     # Check formatting
npm run type-check       # TypeScript validation
```

### Code Quality Tools

Το project χρησιμοποιεί:

- **Prettier** για consistent formatting
- **ESLint** για code quality
- **TypeScript** για type safety

### Development Workflow

1. **Fork & Clone** το repository
2. **Create branch**: `git checkout -b feature/amazing-feature`
3. **Make changes** και test locally
4. **Run checks**: `npm run type-check && npm run lint`
5. **Commit**: Use descriptive commit messages
6. **Push** και create Pull Request

---

## 📖 Creating Custom Content

### Lessons & Scenarios

Τα lessons βρίσκονται στο `public/MDGuides/` και είναι σε **Markdown format**.

#### Structure

```
public/MDGuides/
├── Lessons/Lesson1/
│   ├── theory.md         # Lesson content
│   ├── blocks.json       # Pre-configured Blockly workspace
│   └── database.db       # SQLite database (optional)
│
├── Scenarios/Scenario1/
│   ├── scen.md          # Scenario story
│   └── database.db      # Pre-loaded database
│
└── Tasks/Tasks1/
    └── tasks.md         # Exercise instructions
```

#### Adding New Content

1. Δημιούργησε νέο φάκελο στο `Lessons/`, `Scenarios/`, ή `Tasks/`
2. Γράψε το content σε Markdown (`.md`)
3. (Optional) Προσθέσε Blockly workspace (`.json`)
4. (Optional) Προσθέσε database (`.db`)
5. Ενημέρωσε το `src/config/lessons.ts`:

```typescript
export const LTS = [
    // ... existing lessons
    'Lessons/MyNewLesson/theory.md',
];

export const LTSNames = [
    // ... existing names
    'Το Νέο μου Μάθημα',
];
```

**Markdown Syntax**: [Showdown Documentation](https://showdownjs.com/docs/markdown-syntax/)

---

## 🧩 Blockly Blocks Development

### Available SQL Blocks (18 Total)

Όλα τα blocks ορίζονται στο `src/modules/Blockly/Blocks/` σε JSON format:

#### Statement Blocks (Top-level SQL)

- **`create.json`** - CREATE TABLE statements
- **`select.json`** - SELECT queries
- **`insert.json`** - INSERT statements
- **`update.json`** - UPDATE statements με SET clauses
- **`delete.json`** - DELETE statements με WHERE conditions

#### Clause/Parameter Blocks (Modifiers)

- **`where.json`** - WHERE conditions (works με SELECT, UPDATE, DELETE)
- **`order_by.json`** - ORDER BY με ASC/DESC dropdown
- **`group_by.json`** - GROUP BY για aggregations
- **`having.json`** - HAVING για post-aggregation filtering
- **`join.json`** - JOIN με table name και ON condition
- **`column.json`** - Column definitions με type (INTEGER, REAL, TEXT, BLOB) και constraints (PRIMARY KEY, UNIQUE, FOREIGN KEY)
- **`column_name.json`** - Column names (για INSERT)
- **`value.json`** - Values (για INSERT)
- **`set.json`** & **`set_clause.json`** - SET clauses (για UPDATE)

#### Function & Operator Blocks

- **`aggregation_function.json`** - MIN, MAX, SUM, AVG, COUNT με dropdown
- **`combiner.json`** - AND/OR/comma operators για combining conditions
- **`not.json`** - NOT logical operator για negation

### Block Connections

Τα blocks έχουν **type-safe connections** που επιτρέπουν μόνο valid συνδυασμούς:

```
CREATE TABLE → column → column → column (chaining)
SELECT → WHERE → ORDER BY (parameters)
INSERT → column_name → column_name (column list)
       → value → value (value list)
UPDATE → set → set (multiple SET clauses)
DELETE → WHERE (conditions)
```

### Adding New Blocks

1. **Create JSON definition** στο `src/modules/Blockly/Blocks/newblock.json`:

```json
{
    "type": "newblock",
    "message0": "MY BLOCK %1",
    "args0": [
        {
            "type": "input_value",
            "name": "INPUT",
            "check": "String"
        }
    ],
    "previousStatement": "CONNECTION_TYPE",
    "nextStatement": "CONNECTION_TYPE",
    "colour": 200
}
```

2. **Import στο BlocklyContext.tsx**:

```typescript
import newblockJSON from '../modules/Blockly/Blocks/newblock.json';
```

3. **Register το block** στο `initBlockly()`:

```typescript
Blockly.Blocks['newblock'] = {
    init: function () {
        this.jsonInit(newblockJSON);
    },
    onchange: createValidationHandler(['allowed_parent']),
};
```

4. **Add code generator** στο `initGen()`:

```typescript
SQL.forBlock['newblock'] = function (block) {
    const input = SQL.valueToCode(block, 'INPUT', 0);
    return 'GENERATED SQL ' + input;
};
```

5. **Update toolbox** στο `toolbox.json` για να εμφανιστεί στη palette.

**Περισσότερα**: [Blockly Developer Guide](https://developers.google.com/blockly/guides/create-custom-blocks/overview)

---

## 🎨 Design System

### Colors

- **Primary Background**: `#1a1d29`, `#252a3a` (dark gradients)
- **Accent**: `#4a9eff` (blue)
- **Success**: `#28a745` (green)
- **Error**: `#dc3545` (red)
- **Text**: `#e1e4ed` (light gray)

### Responsive Breakpoints

- **Desktop**: ≥992px (70/30 split layout)
- **Tablet**: 768-991px
- **Mobile**: <768px (stacked layout)
- **Small mobile**: <576px (compact UI, icon-only FAB)

---

## 🔒 Security

- **XSS Prevention**: DOMPurify sanitizes όλο το HTML content
- **No Backend**: Όλα τα data μένουν στον browser (privacy-first)
- **No Tracking**: Zero analytics, zero cookies
- **Input Validation**: SQL injection protection (parameterized queries)

---

## 🚀 Deployment

### Quick Deploy to Vercel (1-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/xrhstosk59/SQLatch)

**Ή manually:**

1. **Push to GitHub** (if not already)

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy στη Vercel**:
    - Πήγαινε στο [vercel.com](https://vercel.com/)
    - Login με GitHub
    - Κλικ **"Add New..."** → **"Project"**
    - Import το **SQLatch** repository
    - Κλικ **"Deploy"**
    - Περίμενε 2-3 λεπτά → Live! 🎉

### Alternative Hosting

Το SQLatch είναι static site και μπορεί να host σε:

- **[Vercel](https://vercel.com/)** - Recommended, auto-deploy, free SSL
- **[Netlify](https://www.netlify.com/)** - Drag & drop deployment
- **[GitHub Pages](https://pages.github.com/)** - Free για public repos
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Global CDN
- Οποιονδήποτε static server (Apache, Nginx, etc.)

### Manual Deploy

```bash
# 1. Build
npm run build

# 2. Deploy το ./out folder
# Upload contents σε web server
```

**Για αναλυτικό deployment guide**, δες το **[DEPLOYMENT.md](DEPLOYMENT.md)**

---

## 📄 Documentation

Για **πλήρη τεχνική τεκμηρίωση**, δες το **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** (1,300+ γραμμές).

Περιλαμβάνει:

- Αναλυτική περιγραφή κάθε component
- Architecture diagrams
- Data flow explanations
- API documentation
- Development workflows

---

## 🤝 Contributing

Contributions are welcome! Παρακαλώ:

1. Fork το project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Guidelines

- Follow existing code style (Prettier + ESLint)
- Write descriptive commit messages
- Add tests για new features (when applicable)
- Update documentation

---

## 🐛 Known Issues & Limitations

- SQLite WASM requires modern browser (Chrome 89+, Firefox 89+, Safari 15+)
- Large databases (>10MB) μπορεί να είναι αργά
- No server-side persistence - όλα τα data είναι local
- Limited σε SQLite SQL dialect (no stored procedures, triggers, etc.)

---

## 🗺️ Roadmap

### ✅ Implemented Features

**Core SQL Support (18 Blocks):**
- [x] **SELECT blocks** - με WHERE, ORDER BY, GROUP BY, HAVING, JOIN
- [x] **CREATE TABLE blocks** - με column types και constraints (PRIMARY KEY, UNIQUE, FOREIGN KEY)
- [x] **INSERT blocks** - με column names και values
- [x] **UPDATE blocks** - Full support με SET clauses και WHERE conditions
- [x] **DELETE blocks** - με optional WHERE conditions
- [x] **Aggregation functions** - MIN, MAX, SUM, AVG, COUNT
- [x] **Logical operators** - AND, OR, NOT
- [x] **JOIN support** - Table joins με ON conditions

**Features:**
- [x] **Schema Visualization** - Interactive React Flow diagrams με table relationships
- [x] **Query History** - Track 50 queries με timestamps και status
- [x] **Auto-save** - Configurable interval-based saving (30s default)
- [x] **Export Results** - Multiple formats (CSV, JSON, Clipboard)
- [x] **Keyboard Shortcuts** - Comprehensive shortcuts για power users
- [x] **Selective Execution** - Run all blocks ή selected block only
- [x] **SQL Preview Modal** - Review generated SQL πριν execution
- [x] **Progress Tracking** - Lesson completion με localStorage
- [x] **Video Integration** - Embedded videos σε scenarios
- [x] **Dark Theme** - Professional dark UI με gradients

### 🔮 Planned Features

- [ ] **Subqueries support** - Nested SELECT statements
- [ ] **Multiple database tabs** - Work με πολλαπλές databases ταυτόχρονα
- [ ] **Query performance metrics** - Execution time και optimization hints
- [ ] **SQL to Blocks** - Reverse engineering από raw SQL
- [ ] **Collaborative editing** - Realtime collaboration features
- [ ] **Light theme toggle** - Alternative light color scheme
- [ ] **More scenarios** - Additional story-based learning content
- [ ] **Export to SQL file** - Save workspace ως .sql script
- [ ] **Undo/Redo** - Workspace history management
- [ ] **Block search** - Quick search στη toolbox

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Google Blockly](https://developers.google.com/blockly)** - Visual programming framework
- **[SQLite](https://sqlite.org/)** - Database engine
- **[Next.js](https://nextjs.org/)** - React framework
- **[Bootstrap](https://getbootstrap.com/)** - UI components
- **Original Creator**: [BillisC](https://github.com/BillisC/SQLatch)

---

## 📧 Contact

**Repository**: [https://github.com/xrhstosk59/SQLatch](https://github.com/xrhstosk59/SQLatch)

**Issues**: [https://github.com/xrhstosk59/SQLatch/issues](https://github.com/xrhstosk59/SQLatch/issues)

---

<div align="center">

**Made with ❤️ for SQL learners**

**🚀 Generated with [Claude Code](https://claude.com/claude-code)**

</div>
