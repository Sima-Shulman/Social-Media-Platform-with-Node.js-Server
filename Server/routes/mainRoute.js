const express = require('express');
const todosRoutes = require('./routes/todosRoutes');
const app = express();

app.use('/todos',todosRoutes);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});