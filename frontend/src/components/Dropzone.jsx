import { useState } from "react";

function Dropzone({ preview, onBrowse, onFileDrop }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileDrop(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  if (preview) {
    return (
      <div className="flex-1 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
        <img
          src={preview}
          alt="Preview"
          className="max-h-[60vh] max-w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex-1 border border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
        dragActive
          ? "border-white/40 bg-white/5"
          : "border-white/15 hover:border-white/30"
      }`}
      onClick={onBrowse}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <svg
        className="w-10 h-10 text-white/40 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0-12L8 8m4-4l4 4"
        />
      </svg>
      <p className="text-sm font-bold tracking-widest uppercase">
        Drag & Drop Image
      </p>
      <p className="text-xs tracking-widest uppercase text-white/40 mt-1">
        Or click to browse local files
      </p>
    </div>
  );
}

export default Dropzone;
