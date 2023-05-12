const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const showRoutes = require('./routes/shows');

const PORT = 3000;
app.use(express.json());
app.use('/users', userRoutes);
app.use('/shows', showRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
