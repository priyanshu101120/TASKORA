require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cokieParser = require('cookie-parser');
const connectDB = require('./src/db/db');
const authRoutes = require('./src/routes/auth.routes');
const boardRoutes = require('./src/routes/board.routes');
const columnRoutes = require('./src/routes/columns.routes');
const taskRoutes = require('./src/routes/task.routes');


connectDB()
const app = express();


app.use(express.json());
app.use(cokieParser());



app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/columns', columnRoutes);
app.use('/api/tasks', taskRoutes)



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});