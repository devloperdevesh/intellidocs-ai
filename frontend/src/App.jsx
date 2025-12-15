import UploadForm from "./components/UploadForm";
import AskForm from "./components/AskForm";
import AnswerCard from "./components/AnswerCard";
import { useState } from "react";

export default function App() {
  const [answer, setAnswer] = useState("");

  return (
    <div className="app-container">
      <h1 className="title">📄 IntelliDocs AI</h1>
      <p className="subtitle">
        Ask intelligent questions from your documents
      </p>

      <div className="card">
        <UploadForm />
      </div>

      <div className="card">
        <AskForm setAnswer={setAnswer} />
      </div>

      {answer && (
        <div className="card">
          <AnswerCard answer={answer} />
        </div>
      )}
    </div>
  );
}
