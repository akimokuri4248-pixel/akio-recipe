import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { ingredient, theme } = req.body;

  if (!ingredient || !theme) {
    return res.status(400).json({ message: "食材とテーマを入力してください。" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // ← ここに環境変数でAPIキーを設定
    });

    const prompt = `
あなたはプロのホテルレストランシェフです。
以下の条件で最新トレンドを意識したレシピを提案してください。
- 食材: ${ingredient}
- テーマ: ${theme}
出力形式：
1. 料理名
2. レシピ（材料と作り方）
3. 原価ポイント
4. 盛り付けコメント
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0].message.content;

    res.status(200).json({
      title: "AKIOレシピ生成結果",
      recipe: text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "OpenAI接続エラー: " + error.message });
  }
}
