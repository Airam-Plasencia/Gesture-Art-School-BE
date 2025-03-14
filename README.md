Gesture Art School Server

Backend server application for the Gesture Art School platform.

Overview
This project serves as the API server for the Gesture Art School application, providing authentication, database access, and business logic for the platform.
Requirements

Node.js (v16+)
MongoDB
npm or yarn

Installation

Clone the repository:
Copygit clone https://github.com/your-username/gesture-art-school-server.git
cd gesture-art-school-server

Install dependencies:
Copynpm install

Set up environment variables:
Create a .env file in the root directory with the following variables:
CopyPORT=5000
MONGODB_URI=mongodb://localhost:27017/gesture-art-school
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=7d
CORS_ORIGIN=http://localhost:3000


Development
To start the development server with hot-reload:
Copynpm run dev
The server will run on http://localhost:5000 by default.
Production
To start the server in production mode:
Copynpm start
Project Structure
Copy/

├── config/             # Configuration files

├── controllers/        # Route controllers

├── middleware/         # Custom middleware

├── models/             # Mongoose models

├── routes/             # API route definitions

├── utils/              # Utility functions

├── .env                # Environment variables (not in repo)

├── .gitignore          # Git ignore file

├── package.json        # Project dependencies and scripts

├── README.md           # Project documentation

└── server.js           # Main application entry point

Features

User authentication (register, login, JWT)
User authorization and role-based access
RESTful API design
Secure password storage with bcrypt
Cookie-based authentication
CORS support for frontend integration

Dependencies

express: Web server framework
mongoose: MongoDB ODM for data modeling
jsonwebtoken: JWT implementation for authentication
express-jwt: JWT middleware for Express
bcrypt: Password hashing
cors: Cross-Origin Resource Sharing middleware
dotenv: Environment variable management
body-parser: Request body parsing
cookie-parser: Cookie parsing
morgan: HTTP request logger

Dev Dependencies

nodemon: Development server with hot reload

License
Private - All Rights Reserved
Authors
Gesture Art School Team
