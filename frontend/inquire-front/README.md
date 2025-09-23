# Inquire Frontend

React + TypeScript + Vite frontend application for the Inquire.

## Running the Project

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installing Dependencies
```bash
npm install
```

### Environment Variables Setup
Create a `.env` file in the project root directory and add:

```env
VITE_BACKEND_BASE_URL=http://localhost:3000
```

**Important:** Replace `http://localhost:3000` with your actual backend server URL.

### Running in Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## Project Structure

- `src/features/` - main functional modules (posts, comments)
- `src/components/` - reusable components
- `src/pages/` - application pages
- `src/app/` - global configuration (store, hooks)

## Technologies

- React 18
- TypeScript
- Vite
- Redux Toolkit
- Tailwind CSS