require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatRouter = require('./src/routes/chat.route');
const basicRouter = require('./src/routes/prompt.route');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use('/chat', chatRouter);
app.use('/basic', basicRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
