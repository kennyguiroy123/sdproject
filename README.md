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

2. Install Dependencies
Run the following command to install all necessary dependencies:

bash
Copier le code
npm install
This will install dependencies defined in your package.json file, including Next.js, Tailwind CSS, Prisma, and others.

3. Set up Environment Variables
Create a .env file in the root of your project and add the following environment variables:

plaintext
Copier le code
# Database connection
DATABASE_URL=your_postgres_database_url

# JWT Secret for token-based authentication
JWT_SECRET=your_jwt_secret_key
Example .env file:
plaintext
Copier le code
DATABASE_URL=postgres://user:password@host:port/database
JWT_SECRET=your_jwt_secret_key
Replace your_postgres_database_url with your PostgreSQL connection string.
Replace your_jwt_secret_key with a secure secret key for JWT authentication.
Note: If you're using Vercel for deployment, ensure you set the same environment variables on your Vercel project dashboard.

4. Set up Prisma
Run Prisma migrations to create the database tables and generate the Prisma Client:

bash
Copier le code
# Apply database migrations
npx prisma migrate deploy

# Generate Prisma Client to interact with your database
npx prisma generate
5. Run the Project Locally
To start the project in development mode, use the following command:

bash
Copier le code
npm run dev
The application will be running at http://localhost:3000.

6. Open the app in your browser
Now, you can navigate to the application in your browser:

plaintext
Copier le code
http://localhost:3000
Deployment on Vercel
1. Push to GitHub
Make sure your repository is pushed to GitHub.

2. Connect to Vercel
Go to Vercel Dashboard and create a new project.
Select your GitHub repository for deployment.
3. Set up Environment Variables on Vercel
On the Vercel dashboard, go to your project settings and add the following environment variables:

DATABASE_URL: The PostgreSQL connection URL from your database provider.
JWT_SECRET: A secure JWT secret key (same as in .env).
4. Deploy to Vercel
Vercel will automatically build and deploy your project. After the deployment process is complete, your app will be live on a Vercel URL.

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
If you encounter issues where Prisma Client is not generated in production (e.g., on Vercel), add the following postinstall script in your package.json:

json
Copier le code
"scripts": {
  "postinstall": "prisma generate"
}
This will ensure Prisma is generated automatically after every install, including on Vercel deployments.

Environment Variables
Variable	Description
DATABASE_URL	PostgreSQL connection string (URL format)
JWT_SECRET	Secret key for JWT token generation
Troubleshooting
Here are some common issues and their solutions:

1. Database Errors
If you encounter errors related to the database (e.g., P2021: The table "User" does not exist), ensure you have successfully run the migrations using:

bash
Copier le code
npx prisma migrate deploy
npx prisma generate
If you're using Vercel, check that your DATABASE_URL is set correctly in your .env file and on the Vercel dashboard.

2. JWT Errors
If you get an error like secretOrPrivateKey must have a value, make sure JWT_SECRET is set in both .env and in Vercel's environment variables.

3. Vercel Build Issues
If Prisma Client isn’t generated on Vercel, ensure the following:

You have the postinstall script in package.json:
json
Copier le code
"postinstall": "prisma generate"
License
This project is licensed under the MIT License.