# Blog Backend API

A clean Nest.js backend for a blog application with PostgreSQL and TypeORM.

## Features

- **Posts Management**: Full CRUD operations for blog posts
- **Comments System**: Add comments to posts
- **Database**: PostgreSQL with TypeORM
- **Validation**: Input validation with class-validator
- **Error Handling**: Global exception handling
- **API Documentation**: Swagger UI with comprehensive endpoint documentation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
FRONTEND_BASE_URL=
```

**Required Environment Variables:**
- `DATABASE_HOST` - PostgreSQL database host
- `DATABASE_PORT` - PostgreSQL database port
- `DATABASE_USER` - Database username
- `DATABASE_PASSWORD` - Database password
- `DATABASE_NAME` - Database name
- `FRONTEND_BASE_URL` - Frontend URL for CORS configuration

3. Start the development server:
```bash
npm run start:dev
```

4. Access the API documentation:
   - Swagger UI: `http://localhost:3000/api`

## API Endpoints

### Posts

- `GET /posts` - Get all posts
- `GET /posts/:id` - Get a specific post
- `POST /posts` - Create a new post
- `PATCH /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

### Comments

- `GET /posts/:postId/comments` - Get all comments for a post
- `POST /posts/:postId/comments` - Add a comment to a post

## Database Schema

### Post Entity
- `id` (UUID, Primary Key)
- `title` (String)
- `content` (Text)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Comment Entity
- `id` (UUID, Primary Key)
- `text` (Text)
- `createdAt` (Timestamp)
- `postId` (UUID, Foreign Key)

## Example Requests

### Create a Post
```bash
POST /posts
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my first blog post."
}
```

### Add a Comment
```bash
POST /posts/{postId}/comments
Content-Type: application/json

{
  "text": "Great post! Thanks for sharing."
}
```
