const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const getModel = () => process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';

const buildHeaders = () => ({
  Authorization: `Bearer ${process.env.OPENROUTER_API_KEY || ''}`,
  'Content-Type': 'application/json',
  'HTTP-Referer': process.env.CLIENT_URL || 'http://localhost:5173',
  'X-Title': 'ExpenseIQ',
});

const postChat = async (messages, temperature = 0.2, maxTokens = 300) => {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API key is not configured');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({
      model: getModel(),
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter request failed: ${errorText}`);
  }

  return response.json();
};

const parseJsonSafely = (value) => {
  try {
    if (!value) return null;
    let clean = value.trim();
    const jsonMatch = clean.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      clean = jsonMatch[0];
    }
    return JSON.parse(clean);
  } catch (error) {
    console.error('JSON parse error on value:', value, error);
    return null;
  }
};

const parseIntent = async ({ message, context }) => {
  const fallback = {
    intent: 'query_spend',
    reply: "I'm sorry, I couldn't process that request. Try saying something like 'Add ₹450 for lunch today' or 'What is my total spent?'",
  };

  try {
    const result = await postChat(
      [
        {
          role: 'system',
          content:
            'You are an expert financial assistant. Analyze the user request. Return a strict JSON object with these keys: intent (either "create_expense" or "query_spend"), amount (number, if create_expense), category (must be one of: "Food", "Travel", "Bills", "Shopping", "Health", "Entertainment", "Education", "Rent", "Groceries", "Other"), description (string), date (ISO string YYYY-MM-DD), reply (friendly text answering/confirming). Do not include any other markdown or text outside the JSON.',
        },
        {
          role: 'user',
          content: JSON.stringify({ message, context }),
        },
      ],
      0
    );

    const content = result?.choices?.[0]?.message?.content || '';
    return parseJsonSafely(content) || fallback;
  } catch (error) {
    return fallback;
  }
};

const generateInsight = async ({ summary, totals }) => {
  try {
    const result = await postChat(
      [
        {
          role: 'system',
          content:
            'Write a concise monthly finance summary and 1-2 actionable tips. Return strict JSON with keys summary and tips array.',
        },
        {
          role: 'user',
          content: JSON.stringify({ summary, totals }),
        },
      ],
      0.4,
      600
    );

    const content = result?.choices?.[0]?.message?.content || '';
    return parseJsonSafely(content) || { summary, tips: [] };
  } catch (error) {
    return { summary, tips: [] };
  }
};

module.exports = {
  parseIntent,
  generateInsight,
};