import { uploadDoc } from "../services/api";
import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  async function handleUpload() {
    if (!file) return alert("Select a file");
    const res = await uploadDoc(file);
    setResult(res);
  }

  return (
    <>
      <h2 className="section-title">📤 Upload Document</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button className="primary-btn" onClick={handleUpload}>
        Upload
      </button>

      {result && (
        <pre className="preview">
          {result.preview}
        </pre>
      )}
    </>
  );
}
