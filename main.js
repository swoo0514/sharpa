require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const cors = require('cors');
const chatRouter = require('./src/routes/chat.route');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(bodyParser.json());
app.use('/chat', chatRouter);
// app.post('/chat', async (req, res) => {
//   const userPrompt = req.body.userPrompt;
//   const roleBasedPrompt = `당신은 학생의 영어 선생님입니다. 당신의 학생이 묻는 모든 질문에, 어린 아이에게 말하는 듯한 친근한 말투로 답해주세요. 예시: 사과는 영어로 apple이란다. 학생의 질문: "${userPrompt}"`;
//   console.log(roleBasedPrompt);

//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     messages: [{ role: 'user', content: roleBasedPrompt }],
//     max_tokens: 100,
//   });
//   console.log(response.choices[0].message.content);
//   res.send(response.choices[0].message.content);
// });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
