# Sdproject
 Dashboard Admin Template

# Task Management Dashboard

A full-stack Task Management Dashboard built with Next.js, Tailwind CSS, Prisma, and PostgreSQL, deployed on Vercel. This application supports user authentication, CRUD operations, task filtering, and responsive design.

## Features

- User Authentication (Login, Registration)
- Role-based access (Admin, Client, Staff)
- Task management with CRUD operations
- Filtering and viewing tasks by status (e.g., "Incomplete" or "Completed")
- Responsive and modern UI built with Tailwind CSS

## Prerequisites

- Node.js (v16 or later)
- PostgreSQL database
- Vercel account for deployment

## Installation

1. Install Dependencies
Run the following command to install the dependencies defined in your `package.json` file, including Next.js, Tailwind CSS, Prisma, and others:

```bash
npm install
```
This will install dependencies defined in your package.json file, including Next.js, Tailwind CSS, Prisma, and others.

2. Set up Environment Variables
Create a .env file in the root of your project and add the following environment variables:

3. Import backup_schema.sql For Database in PostgreSQL schema
Create a new database in pgAdmin or any other tools for PostgreSQL database, and import the model "backup_schema.sql" for the structure of the DB

# Database connection
DATABASE_URL=your_postgres_database_url for me it was "postgresql://postgres:P@ssword132@localhost:5432/SDProject"

# JWT Secret for token-based authentication
JWT_SECRET=your_jwt_secret_key example : "QM9WyzJ/tWLgSIUA9HjgiulUjzPbkSVX+LPH2SyLDh4="
Example .env file:

Replace your_postgres_database_url with your PostgreSQL connection string.
Replace your_jwt_secret_key with a secure secret key for JWT authentication.
Note: If you're using Vercel for deployment, ensure you set the same environment variables on your Vercel project dashboard.


Project Structure
Here's an overview of the project structure:

/pages - Contains the main pages (login.js, register.js, dashboard.js, etc.)
/components - Contains reusable components like TaskList, Sidebar, TaskForm.
/prisma - Contains the Prisma schema file (schema.prisma) and migration files.
/styles - Global styles and Tailwind CSS configurations.
Scripts
The following npm scripts are available:

npm run dev - Start the development server (localhost:3000).
npm run build - Build the project for production.
npm run start - Start the project in production mode.
npm run migrate:deploy - Apply Prisma migrations to the database.
npm run prisma:generate - Generate Prisma client to interact with your database.
Postinstall Script for Prisma


License
This project is licensed under the MIT License.