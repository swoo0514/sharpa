const openai = require('../../openai');
const axios = require('axios');

const createChatCompletion = async (req, res, next) => {
  try {
    const userPrompt = req.body.userPrompt;
    const roleBasedPrompt = `당신은 학생의 영어 선생님입니다. 당신의 학생이 묻는 모든 질문에, 어린 아이에게 말하는 듯한 친근한 말투로 답해주세요. 예시: 사과는 영어로 apple이란다. 학생의 질문: "${userPrompt}"`;
    console.log(roleBasedPrompt);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: roleBasedPrompt }],
        max_tokens: 30,
        stream: true,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'stream',
      }
    );

    let buffer = '';

    response.data.on('data', (chunk) => {
      buffer += chunk.toString();

      const lines = buffer.split('\n');
      buffer = lines.pop(); // 마지막 줄을 버퍼에 남겨둠

      for (const line of lines) {
        if (line.trim() === '') continue;

        const message = line.replace(/^data: /, '');
        if (message === '[DONE]') {
          res.end();
          return;
        }
        try {
          const parsed = JSON.parse(message);
          const content = parsed.choices[0].delta?.content || '';
          res.write(`${content}`);
        } catch (error) {
          console.error('Could not parse message:', message, error);
        }
      }
    });

    response.data.on('end', () => {
      if (buffer.trim() !== '') {
        try {
          const parsed = JSON.parse(buffer);
          const content = parsed.choices[0].delta?.content || '';
          res.write(`${content}`);
        } catch (error) {
          console.error('Could not parse final buffer:', buffer, error);
        }
      }
      res.end();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createChatCompletion,
};
