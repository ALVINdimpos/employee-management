# Employee Records Management System

## Overview
A full-stack web application built with Next.js, React, MongoDB, and NextAuth.js for managing employee records with CRUD functionality and user authentication.

## Features
- CRUD operations for employee records
- JWT-based authentication
- Responsive UI with Tailwind CSS
- Server-side rendering
- MongoDB integration with Mongoose

## Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`:

## File Structure
```
my-employee-app/
├── .env.local
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── README.md
├── public/
│   └── logo.png
├── styles/
│   └── globals.css
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth].ts
│   │   ├── employees/
│   │   │   ├── create.ts
│   │   │   ├── read.ts
│   │   │   ├── update.ts
│   │   │   └── delete.ts
│   ├── _app.tsx
│   ├── index.tsx
│   ├── auth/
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── dashboard.tsx
│   └── 404.tsx
├── components/
│   ├── Navbar.tsx
│   ├── EmployeeForm.tsx
│   ├── EmployeeList.tsx
│   ├── EmployeeItem.tsx
│   ├── AuthForm.tsx
│   └── ProtectedRoute.tsx
├── lib/
│   ├── dbConnect.ts
│   └── auth.ts
├── models/
│   └── Employee.ts
├── context/
│   └── AuthContext.tsx
└── hooks/
    └── useAuth.ts
```

## Tech Stack
- Next.js
- Tailwind CSS
- TypeScript

## Features
- Create a record
- Read all record and display them in a list
- Update the First Name, LastName, Phone
- Delete a record

## Run the project
- Clone the repository
- Run `npm install` to install the dependencies
- Run `npm run dev` to start the development server

## Screenshots

![Home Page](./public/home.png)
![Add Employee](./public/add-employee.png)
![Edit Employee](./public/edit-employee.png)
![Delete Employee](./public/delete-employee.png)
