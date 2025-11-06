# Dynamic Data Table Manager

A modern, feature-rich data table management application built with Next.js, Redux Toolkit, Material UI, and React Hook Form. This application allows users to manage, manipulate, and visualize data tables with advanced features like inline editing, column management, CSV import/export, and theme switching.

## 🚀 Features

### Core Features

- **Dynamic Table View**

  - Display data with customizable columns (Name, Email, Age, Role, Department, Location)
  - Client-side pagination (10 rows per page)
  - Sortable columns with ascending/descending toggle
  - Global search across all fields

- **Column Management**

  - Show/hide columns dynamically
  - Add new custom columns
  - Drag-and-drop column reordering
  - Column visibility persisted in Redux Persist

- **Data Import & Export**
  - Import CSV files with automatic parsing
  - Export current table view to CSV
  - Only visible columns included in exports
  - Error handling for invalid CSV formats

### Bonus Features

- **Inline Row Editing**

  - Double-click to edit fields inline
  - Input validation (age, email format)
  - "Save All" and "Cancel All" buttons
  - Real-time editing state management

- **Row Actions**

  - Edit individual rows
  - Delete rows with confirmation modal
  - Visual feedback for actions

- **Theme Toggle**

  - Light and dark mode support
  - Theme preference persisted in localStorage
  - Smooth transitions between themes
  - Material Design dark theme implementation

- **Fully Responsive Design**
  - Mobile-friendly layout
  - Adaptive grid system
  - Touch-friendly controls

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit with Redux Persist
- **UI Library**: Material UI (MUI) v7
- **Form Handling**: React Hook Form
- **CSV Parsing**: PapaParse
- **Styling**: Material UI's `sx` prop with custom themes

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dynamic-data-table
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

```bash
npm run dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Basic Operations

1. **Searching**: Type in the search box to filter rows across all visible columns
2. **Sorting**: Click on column headers to sort (click again to reverse order)
3. **Editing**: Double-click any cell to edit, or click the edit icon
4. **Managing Columns**: Click "Manage Columns" to show/hide or add columns
5. **Importing Data**: Click "Import" to upload a CSV file
6. **Exporting Data**: Click "Export" to download the current table as CSV

### Adding a New Column

1. Click "Manage Columns"
2. Scroll to "Add New Column" section
3. Enter a column name (e.g., "Phone Number")
4. Click "Add"
5. The new column will appear in the table with empty values for existing rows

### Editing Multiple Rows

1. Double-click or click edit icon on multiple rows
2. Make your changes
3. Click "Save All" to commit all changes at once
4. Or click "Cancel All" to discard all changes

## 📁 Project Structure

```
dynamic-data-table/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── DataTable.tsx          # Main data table component
│   │   │   ├── Pagination.tsx         # Pagination controls
│   │   │   ├── ManageColumnsModal.tsx # Column management modal
│   │   │   ├── ConfirmationModal.tsx  # Delete confirmation modal
│   │   │   └── icons/                 # Icon components
│   │   ├── page.tsx                   # Main page component
│   │   ├── layout.tsx                 # Root layout
│   │   ├── globals.css                # Global styles
│   │   └── MUIThemeProvider.tsx       # MUI theme provider
│   ├── store/
│   │   ├── index.ts                   # Redux store configuration
│   │   ├── StoreProvider.tsx          # Redux provider wrapper
│   │   ├── hooks.ts                   # Typed Redux hooks
│   │   └── slices/
│   │       ├── usersSlice.ts          # Users state management
│   │       ├── columnsSlice.ts        # Columns state management
│   │       └── uiSlice.ts             # UI state management
│   ├── types/
│   │   └── index.ts                   # TypeScript type definitions
│   ├── constants/
│   │   └── index.ts                   # Initial data and constants
│   ├── hooks/
│   │   └── useLocalStorage.ts         # Local storage hook
│   └── styles/
│       └── muiTheme.ts                # MUI theme configuration
├── public/                            # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Theme Configuration

The application supports two themes:

### Light Mode

- Background: `#f9fafb` (gray-50)
- Card Background: `#ffffff` (white)
- Text: Dark gray shades

### Dark Mode

- Background: `#0a0a0f` (deep charcoal with blue tint)
- Card Background: `#1a1a24` (dark slate)
- Text: Light gray shades
- Enhanced shadows for depth

## 🔧 State Management

The application uses Redux Toolkit for state management with three main slices:

1. **usersSlice**: Manages user data (CRUD operations, import/export)
2. **columnsSlice**: Manages column configuration (visibility, ordering, adding)
3. **uiSlice**: Manages UI state (theme, search, pagination, modals, editing)

All state is persisted using Redux Persist with localStorage.

## 📝 CSV Format

For CSV import, ensure your file has:

- Headers in the first row matching column labels (case-insensitive)
- Data rows with values matching the column types
- Valid age values (numbers)
- Valid email format for email columns

Example CSV:

```csv
Name,Email,Age,Role
John Doe,john@example.com,28,Developer
Jane Smith,jane@example.com,32,Designer
```

## 🚦 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Technologies

- **Next.js 16**: React framework with App Router
- **Redux Toolkit**: Modern Redux with simplified API
- **Material UI**: Comprehensive React component library
- **React Hook Form**: Performant form library with validation
- **TypeScript**: Type-safe JavaScript
- **PapaParse**: Fast CSV parser

## 🎯 Features Implementation

### Redux Store Structure

```typescript
{
  users: {
    users: User[]
  },
  columns: {
    columns: Column[]
  },
  ui: {
    theme: 'light' | 'dark',
    searchTerm: string,
    sortConfig: SortConfig | null,
    currentPage: number,
    isManageColumnsModalOpen: boolean,
    userToDelete: number | null,
    editingRows: Record<number, Partial<User>>
  }
}
```

### Component Architecture

- **Page Component**: Main container managing Redux state and orchestration
- **DataTable**: Reusable table component with inline editing and sorting
- **Pagination**: Pagination controls with page number display
- **Modals**: Reusable dialog components for confirmations and settings

## 🔒 Data Persistence

- User data persisted in Redux Persist (localStorage)
- Column configuration persisted in Redux Persist
- UI preferences (theme, pagination) persisted in Redux Persist
- No server-side storage required (fully client-side)

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as a frontend interview task demonstrating:

- Modern React patterns and hooks
- Redux Toolkit state management
- Material UI component library
- TypeScript type safety
- Responsive design principles
- Form handling and validation

---

**Note**: This project was built to fulfill the requirements of a Dynamic Data Table Manager interview task, demonstrating proficiency in Next.js, Redux Toolkit, Material UI, and React Hook Form.
