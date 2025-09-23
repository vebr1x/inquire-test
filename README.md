# Inquire Test Project

This is a full-stack application with a React frontend and NestJS backend.

## Project Structure

```
inquire-test/
├── backend/          # NestJS backend application
│   ├── src/
│   │   ├── posts/    # Posts module (entities, controllers, services)
│   │   ├── comments/ # Comments module (entities, controllers, services)
│   │   └── common/   # Shared utilities and filters
│   └── README.md     # Backend setup and run instructions
├── frontend/         # React frontend application
│   └── inquire-front/
│       ├── src/
│       │   ├── features/  # Feature-based modules (posts, comments)
│       │   ├── pages/     # Application pages
│       │   └── components/ # Reusable components
│       └── README.md      # Frontend setup and run instructions
└── README.md        # This file
```

## Getting Started

For detailed setup and run instructions, please refer to the individual README files:

- **Backend**: See `backend/README.md` for NestJS setup and API documentation
- **Frontend**: See `frontend/inquire-front/README.md` for React setup and development instructions

## Architecture

- **Backend**: NestJS with TypeScript, featuring modular architecture with posts and comments functionality
- **Frontend**: React with TypeScript, Redux Toolkit for state management, and Tailwind CSS for styling
- **Communication**: RESTful API between frontend and backend
