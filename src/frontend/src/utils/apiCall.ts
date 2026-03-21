export async function analyzeWithAI(
  symptoms: string[],
  apiKey: string,
): Promise<string | null> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a medical AI assistant. Given a list of symptoms, provide a brief diagnostic analysis mentioning possible conditions. Always remind the user to consult a real doctor. Keep response under 200 words.",
          },
          {
            role: "user",
            content: `The patient reports the following symptoms: ${symptoms.join(", ")}. What conditions should be considered?`,
          },
        ],
        max_tokens: 250,
      }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  }
}
