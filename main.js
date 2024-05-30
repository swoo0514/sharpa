require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/getResponse', async (req, res) => {
  const userPrompt = req.body.userPrompt;
  console.log(userPrompt);
  const response = await OpenAI.chat.completeions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: userPrompt }],
    max_tokens: 100,
  });
  console.log(response.choices[0].message.content);
  res.send(response.choices[0].message.content);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
