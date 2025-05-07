const express = require('express');
const cors = require('cors'); 
const todosRoutes = require('./routes/todosRoutes');
const postsRoutes = require('./routes/postsRoutes');
const userRoutes = require('./routes/usersRoutes');
const app = express();
app.use(express.json());
app.use(cors()); // מאפשר גישה מכל דומיין

// או לגרסה עם הגדרה ספציפית:


app.use('/todos',todosRoutes);
app.use('/posts', postsRoutes);
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});