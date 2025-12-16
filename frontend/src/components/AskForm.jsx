import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AskForm({ setAnswer }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question) return;

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to get answer");

      setAnswer(data.answer);
    } catch (err) {
      setAnswer("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAsk}>
      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>
    </form>
  );
}
