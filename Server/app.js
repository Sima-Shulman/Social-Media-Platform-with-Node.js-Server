const express = require('express');
const todosRoutes = require('./routes/todosRoutes');
const postsRoutes = require('./routes/postsRoutes');
const userRoutes = require('./routes/usersRoutes');
const app = express();
app.use(express.json());

app.use('/todos',todosRoutes);
app.use('/posts', postsRoutes);
app.use('/users', userRoutes);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});