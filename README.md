📱 Social Media Platform Project
Overview
Welcome to our Social Media Platform project, built for the second-year curriculum at the Lev Academic Center for Haredi Seminars (5785/2024-2025) under Prof. Shlomo Kipnis. This full-stack app, inspired by JSONPlaceholder, lets users manage todos, posts, and comments using a React frontend, Node.js/Express backend, and MySQL database. It’s a practical showcase of RESTful APIs, user authentication, and data management. 🚀
Features

🔐 User Login: Secure login with username/password stored in MySQL. Invalid attempts keep you on the login page.
📊 Dashboard: Navigate to Info, Todos, Posts, or Logout with a clean interface.
✅ Todos: View, add, update, or delete your todos, sorted by ID with completion checkboxes.
📬 Posts & Comments: Browse all posts, manage your own posts/comments, and view comments per post.
🔍 Query Support: Filter data with URL params like ?_limit or ?sort.
🛡️ Secure Data: Passwords stored in a separate MySQL table for extra security.
📝 Server Logging: Tracks actions like login attempts and data changes.

Tech Stack
Client

React ⚛️: For a dynamic, component-based UI.
React Router 🛤️: Handles page navigation.
React Hooks 🪝: Manages state and effects.
JS (Async/Await, Fetch): Powers API calls.

Server

Node.js 🟢: Runs the backend.
Express.js 📡: Builds the RESTful API.
MySQL 🗄️: Stores users, todos, posts, comments, and passwords.

Project Structure
social-media-platform/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── App.js             # Main app component
│   │   └── index.js           # Entry point
├── server/                    # Node.js/Express backend
│   ├── routes/                # API routes
│   ├── service/               # Database queries
│   ├── controllers/           # Authentication logic
│   └── server.js              # Server entry point
├── database/                  # MySQL scripts
│   ├── createDB.js            # Table definitions
├── .gitignore                 # Ignored files
└── README.md                  # This file

Setup Instructions
Prerequisites

Node.js (v16+)
MySQL (v8+)
Git
Postman (for API testing)

Installation

Clone the Repo:
git clone https://github.com/Sima-Shulman/Social-Media-Platform-with-Node.js-Server.git
cd Social-Media-Platform-with-Node.js-Server


Set Up MySQL:

Create a database:
node creatDB.js




Install Server Dependencies:
cd server
npm install


Install Client Dependencies:
cd client
npm install


Configure Environment:

Create server/.env:
DB_HOST=localhost
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=social_media_db
PORT=5000




Run the App:

Start the server:
cd server
npm start


Start the client:
cd client
npm start




Test APIs:

Use Postman to test endpoints like GET /users.


Access the App:

Visit http://localhost:3000/login in your browser.



Development Notes

Git: We used branches for features, merging into main after testing.
Sprints: Built incrementally—login, todos, posts, and advanced queries.
Testing: APIs tested with Postman, UI tested in the browser.

