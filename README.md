# SQLatch

> **Visual SQL Learning Platform** - Μάθε SQL με drag-and-drop blocks!

[![Next.js](https://img.shields.io/badge/Next.js-13.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
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
- **Floating Action Button (FAB)** για query execution
- **Dark theme** με gradient backgrounds και animations
- **Responsive design** - Works σε desktop, tablet, και mobile
- **Touch-optimized** με pinch-to-zoom support

### 🧩 Visual SQL Builder
- **Drag-and-drop blocks** για SQL statements
- Support για: `SELECT`, `CREATE TABLE`, `INSERT`, `UPDATE`, `DELETE`, `WHERE`, `ORDER BY`
- **SQL Preview** - Δες το generated SQL πριν το execution
- **Syntax highlighting** για better readability

### 💾 In-Browser Database
- **SQLite WASM** - Πλήρης SQL database στον browser
- **Pre-loaded scenarios** με databases
- **Real-time execution** - Instant results
- **Error handling** με user-friendly messages

### 📖 Interactive Learning
- **3 Μαθήματα**: SELECT, CREATE TABLE, INSERT basics
- **3 Σενάρια**: Story-based learning (Magic Book, Museum Theft, Planet Exploration)
- **Ασκήσεις**: Practice exercises με progressive difficulty
- **Markdown-based content** - Εύκολη προσθήκη νέων lessons

### 📊 Query History
- **Track όλα τα executed queries** με timestamp
- **Success/Error status** indicators
- **Result count** display για successful queries
- **Copy to clipboard** functionality
- **Delete individual** ή clear all queries

### 💾 Workspace Persistence
- **Auto-save** κάθε 2 δευτερόλεπτα
- **LocalStorage** persistence - Δεν χάνεις τη δουλειά σου
- **Import/Export** workspace files (.json)
- **Share URLs** - Base64-encoded workspace sharing

### ⌨️ Power User Features
- **Keyboard shortcuts**: `Ctrl+Enter` για execution, `Ctrl+S` για sharing
- **Export results** σε CSV/JSON format
- **Custom scenarios** - Δημιούργησε τα δικά σου μαθήματα

---

## 🛠️ Tech Stack

### Core
- **[Next.js 13](https://nextjs.org/)** - React framework με static export
- **[React 18](https://react.dev/)** - UI library με Suspense & startTransition
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Visual Programming
- **[Blockly](https://developers.google.com/blockly)** - Google's visual programming library
- **Blockly Plugins**: Continuous Toolbox, Dark Theme, Zoom-to-Fit

### Database
- **[SQLite WASM](https://sqlite.org/wasm/)** - Full SQL database σε WebAssembly

### UI/UX
- **[Bootstrap 5](https://getbootstrap.com/)** & **React Bootstrap** - Responsive components
- **[Bootstrap Icons](https://icons.getbootstrap.com/)** - Icon library
- **CSS Modules** - Scoped styling

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
│   ├── components/          # React components
│   │   ├── blockly/         # Blockly workspace + FAB
│   │   ├── common/          # Reusable components (BaseModal)
│   │   ├── guide/           # Tutorial system
│   │   ├── layout/          # Navbar
│   │   ├── modals/          # Modal dialogs
│   │   ├── sql/             # QueryHistory
│   │   └── ui/              # UI elements (toasts, spinners)
│   │
│   ├── contexts/            # React Context providers
│   │   ├── AutoSaveContext.tsx
│   │   ├── BlocklyContext.tsx
│   │   ├── QueryHistoryContext.tsx
│   │   └── SQLiteContext.tsx
│   │
│   ├── hooks/               # Custom React hooks
│   ├── modules/             # Core modules (Blockly, SQLite, Showdown)
│   ├── pages/               # Next.js pages
│   ├── styles/              # CSS Modules
│   ├── utils/               # Utility functions
│   └── config/              # Configuration (lessons.ts)
│
├── public/                  # Static assets
│   ├── MDGuides/            # Educational content (Markdown)
│   │   ├── Lessons/
│   │   ├── Scenarios/
│   │   └── Tasks/
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

### Static Hosting

Το SQLatch εξάγει static files, οπότε μπορεί να host σε:

- **[Vercel](https://vercel.com/)** (Recommended - one-click deploy)
- **[Netlify](https://www.netlify.com/)**
- **[GitHub Pages](https://pages.github.com/)**
- **[Cloudflare Pages](https://pages.cloudflare.com/)**
- Οποιονδήποτε static file server (Apache, Nginx, etc.)

### Deploy Steps

```bash
# 1. Build
npm run build

# 2. Deploy το ./out folder
# Copy contents to your web server
```

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

### Planned Features
- [ ] More SQL blocks (JOIN, GROUP BY, HAVING, subqueries)
- [ ] Multiple database tabs
- [ ] Query performance metrics
- [ ] SQL to Blocks (reverse engineering)
- [ ] Collaborative editing (realtime)
- [ ] Dark/Light theme toggle
- [ ] More educational scenarios
- [ ] Database schema visualization
- [ ] Export workspace to SQL file

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
