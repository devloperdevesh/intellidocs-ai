import { askQuestion } from "../services/api";
import { useState } from "react";

export default function AskForm({ setAnswer }) {
  const [question, setQuestion] = useState("");

  async function handleAsk() {
    if (!question) return;
    const res = await askQuestion(question);
    setAnswer(res.answer);
  }

  return (
    <>
      <h2 className="section-title">❓ Ask Question</h2>

      <input
        className="text-input"
        placeholder="Ask something about the document..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button className="primary-btn" onClick={handleAsk}>
        Ask
      </button>
    </>
  );
}
