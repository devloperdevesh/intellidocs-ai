import { useState } from "react";
import { uploadDoc } from "../services/api";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      setLoading(true);
      setMessage("");

      await uploadDoc(file);

      setMessage("✅ File uploaded successfully");
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
