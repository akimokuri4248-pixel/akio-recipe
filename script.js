document.getElementById("recipe-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const ingredient = document.getElementById("ingredient").value;
  const theme = document.getElementById("theme").value;
  const resultDiv = document.getElementById("recipe-result");
  resultDiv.innerHTML = "AIがレシピを考案中です…🍳";

  try {
    const response = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredient, theme }),
    });

    const data = await response.json();
    resultDiv.innerHTML = `<h2>${data.title}</h2><p>${data.recipe}</p>`;
  } catch (error) {
    resultDiv.innerHTML = "エラーが発生しました。API設定を確認してください。";
  }
});
