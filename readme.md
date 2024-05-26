# Solvative Assignment: User and Tips Management API

This project provides a backend solution for managing user registrations, logins, and tip calculations. It includes a set of RESTful APIs developed as part of a backend assignment for Solvative.

## Features

- User registration with profile picture upload
- User login with token authentication
- Tip calculation based on total amount and percentage
- Retrieval of tip records based on date range

## Technologies Used

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT for authentication
- Multer for file uploads

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- npm or pnpm
- PostgreSQL

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-github-username/solvative-assignment.git
   cd solvative-assignment
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. Set up database:
   - Create a new MySQL database
   - Configure your database connection settings in an .env file

4. Start the server:
   ```bash
   pnpm start
   ```

## API Documentation
   The API is documented using Swagger. Once the server is running, access the Swagger UI at:
http://localhost:3000/api-docs

