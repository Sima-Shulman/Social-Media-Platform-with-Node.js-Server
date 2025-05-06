const express = require('express');
const todosRoutes = require('./todosRoutes');
const app = express();
app.use(express.json());

app.use('/todos',todosRoutes);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});