import { useState, useRef } from "react";
import Header from "./components/Header";
import Dropzone from "./components/Dropzone";
import ControlsBar from "./components/ControlsBar";
import Footer from "./components/Footer";

const API_URL = "http://localhost:8000";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [anonymizeFaces, setAnonymizeFaces] = useState(true);
  const [anonymizePlates, setAnonymizePlates] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setResultUrl(null);
    setError(null);
  };

  const handleProcess = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);
    setResultUrl(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(`${API_URL}/anonymize`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const blob = await response.blob();
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message || "Failed to process image. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResultUrl(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col px-16 lg:px-32 xl:px-48 2xl:px-64">
      <Header onNewFile={() => {
        handleReset();
        fileInputRef.current?.click();
      }} />

      <main className="flex-1 flex flex-col py-6">
        <Dropzone
          preview={preview}
          resultUrl={resultUrl}
          loading={loading}
          onBrowse={() => fileInputRef.current?.click()}
          onFileDrop={handleFile}
        />

        {error && (
          <p className="mt-3 text-xs tracking-wider text-red-400">{error}</p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files[0])}
          className="hidden"
        />

        <ControlsBar
          anonymizeFaces={anonymizeFaces}
          anonymizePlates={anonymizePlates}
          onToggleFaces={() => setAnonymizeFaces((v) => !v)}
          onTogglePlates={() => setAnonymizePlates((v) => !v)}
          onProcess={handleProcess}
          canProcess={!!selectedFile}
          loading={loading}
          resultUrl={resultUrl}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
