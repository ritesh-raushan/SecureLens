import { useState, useRef } from "react";
import Header from "./components/Header";
import Dropzone from "./components/Dropzone";
import ControlsBar from "./components/ControlsBar";
import Footer from "./components/Footer";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [anonymizeFaces, setAnonymizeFaces] = useState(true);
  const [anonymizePlates, setAnonymizePlates] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleProcess = async () => {
    if (!selectedFile) return;
    setLoading(true);
    // Integration with backend will be added in Phase 5
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col px-16 lg:px-32 xl:px-48 2xl:px-64">
      <Header onNewFile={() => fileInputRef.current?.click()} />

      <main className="flex-1 flex flex-col py-6">
        <Dropzone
          preview={preview}
          onBrowse={() => fileInputRef.current?.click()}
          onFileDrop={handleFile}
        />

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
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
