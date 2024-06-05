const openai = require('../../openai');
const axios = require('axios');

const createPromptSet = async (req, res, next) => {
  try {
    //사용가 맨 처음 입력
    const userInputPrompt = req.body.userInputPrompt;
    // 목적
    const PurposePrompt = req.body.PurposePrompt;
    // 명확한 행동요청 / 요청
    const CertainPrompt = req.body.CertainPrompt;
    // 맥락
    const ContextPrompt = req.body.ContextPrompt;
    //기술 / 문맥
    const TechPrompt = req.body.TechPrompt;
    // 가이드라인 / 인용, 예시
    const GuidePrompt = req.body.GuidePrompt;
    // 형식
    const ResTypePrompt = req.body.ResTypePrompt;
    //큰 주제 하나에 보조 질문 들어가는 거임
    //Request Prompt
    const RequestPrompt = ` 나는 "${userInputPrompt}"을 요청하고자 해.
이 내용에 대해서 지금부터 나는 너에게 내가 원하는 결과물을 얻기 위해 미리 세팅을 할거야. 핵심 요청, 요청에 대한 부가적인 설명, 그리고 결과물에 대한 예시나 설명, 결과물에 대한 구체적인 형식을 지정해서 이어서 설명할거야.

지금 너에게 설명할 것은 사용자가 원하는 가장 핵심 요청이야.

(1). 요청 목표 / 목적
"${
      PurposePrompt
        ? PurposePrompt
        : '이 항목에는 내용 없으니까 무시하고 넘어가도 됨'
    }
(2). 명확한 행동 요청이나 지속적으로 진행해야 하는 상황
"${
      CertainPrompt
        ? CertainPrompt
        : '이 항목에는 내용없으니까 무시하고 넘어가도 됨'
    }"
난 이어서 설명할거야. 이해했으면 예 아니오로만 대답해.`;
    console.log(RequestPrompt);
    // Framing prompt
    const FramingPrompt = ` "${RequestPrompt}"에 이어서 설명을 할게
    지금 설명할 부분은 입력한 내용에 대한 설명이야

(1). 요청의 전체적인 맥락
"${
      ContextPrompt
        ? ContextPrompt
        : '이 항목에는 내용 없으니까 무시하고 넘어가도 됨'
    }
(2). 요청의 기술적 세부 사항
"${TechPrompt ? TechPrompt : '이 항목에는 내용없으니까 무시하고 넘어가도 됨'}"
난 이어서 설명할거야. 이해했으면 예 아니오로만 대답해.`;
    console.log(FramingPrompt);

    // Ref example prompt
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: userInputPrompt,
            PurposePrompt,
            CertainPrompt,
            GuidePrompt,
            ResTypePrompt,
          },
        ],
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
  createPromptSet,
};
