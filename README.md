# Node.js-Server
🌟 Social Media Platform Project 🚀
Welcome to our awesome full-stack social media platform! Built with 💖 as part of the second-year curriculum at the Lev Academic Center for Haredi Seminars (5785/2024-2025), under the guidance of Prof. Shlomo Kipnis. This project is a vibrant, JSONPlaceholder-inspired app where users can manage todos, posts, and comments with a sleek React frontend, a robust Node.js/Express backend, and a MySQL database. Let’s dive into the fun! 🎉
🎈 What’s This Project About?
This is a dynamic web app that lets users:

📝 Create and manage their todos.
📬 Share posts and comments with the community.
🔐 Log in securely with username and password.
🌐 Navigate a user-friendly dashboard with React Router.

Inspired by jsonplaceholder.typicode.com, it’s packed with RESTful API goodness (GET, POST, PUT, DELETE) and advanced features like query filtering and user authentication. Whether you’re a coder or a curious visitor, this project is a blast to explore! 😎
✨ Cool Features

🔑 Secure Login: Log in with a username and password, stored safely in MySQL. Wrong credentials? You’ll get a friendly nudge to try again! 🚫
📊 User Dashboard: View your profile, todos, posts, or log out with a slick navigation bar.
✅ Todos Galore: Add, update, or delete todos with handy checkboxes to track progress.
💬 Posts & Comments: Share posts, comment on others, and manage your content (only yours, though! 😜).
🔍 Smart Queries: Filter and sort data with URL params like ?_limit, ?_page, or ?sort. Super powerful!
🛡️ Password Protection: Passwords live in a separate, locked-down MySQL table.
📋 Action Logging: The server keeps tabs on key actions like login attempts and data changes.

🛠️ Tech Stack That Rocks!
🌐 Client-Side

React ⚛️: Builds a snappy, interactive UI.
React Router 🛤️: Smooth navigation between pages.
React Hooks 🪝: Manages state and lifecycle like a pro.
React Forms 📋: Handles login and data input effortlessly.
JS (Async/Await, Fetch) 🚀: Talks to the server with async magic.

🖥️ Server-Side

Node.js 🟢: Powers our lightning-fast server.
Express.js 📡: Serves up a RESTful API with style.
MySQL 🗄️: Stores all the juicy data in relational tables.

💾 Database

MySQL 🛢️: Structured tables for users, todos, posts, comments, and passwords, linked with foreign keys for max efficiency.

📂 Project Structure
social-media-platform/
├── client/                    🌈 React client magic
│   ├── src/
│   │   ├── components/        🧩 Reusable UI bits
│   │   ├── App.js             🎨 Main React component
│   │   └── index.js           🚪 Entry point
├── server/                    ⚙️ Node.js/Express powerhouse
│   ├── routes/                🛣️ API endpoints
│   ├── controllers/        
│   ├── service/           
│   └── app.js              🔥 Main server file
├── database/                  🗃️ MySQL scripts
│   ├── createDB.js           🏗️ Table blueprints
├── .gitignore                 🙈 Files to ignore
└── README.md                  📖 You’re reading it!

🚀 Get Started in a Flash!
🛠️ What You’ll Need

Node.js (v16+): The engine for our server and client.
MySQL (v8+): Our data home.
Git: For cloning this repo.
Postman: To test API endpoints like a boss.

⚡ Installation Steps

Clone the Repo:
git clone https://github.com/Sima-Shulman/Node.js-Server.git
cd NODE.JS-SERVER


Set Up the Database:

Create a MySQL database:
node createDB.js




Install Server Goodies:
cd server
npm install


Install Client Goodies:
cd client
npm install


Set Up Environment Variables:

Create a .env file in the server folder:
DB_HOST=localhost
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=MyDB
PORT=3000




Launch the App:

Fire up the server:
cd server
node app.js

Fire up the client:
cd client
npm run dev




Test the API:

Use Postman to hit endpoints like GET /users or POST /todos.


Visit the App:

Open http://localhost:3000/login in your browser and start exploring! 🌍



🛠️ How We Built It

Git Workflow: We used Git branches for features, merging into main after testing. 🗂️
Sprints: Added features in phases—auth, todos, posts, and more!
Code Organization: Split into neat files for routes, queries, and components.

