import { useState } from "react";
import { askQuestion } from "../services/api";

export default function AskForm({ setAnswer }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question) return;

    try {
      setLoading(true);
      const data = await askQuestion(question);
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
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>
    </form>
  );
}
