const express = require('express');
const todosRoutes = require('./todosRoutes');
const postsRoutes = require('./postsRoutes');
const app = express();
app.use(express.json());

app.use('/todos',todosRoutes);
app.use('/posts', postsRoutes);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});