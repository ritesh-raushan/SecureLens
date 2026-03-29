import ToggleSwitch from "./ToggleSwitch";

function ControlsBar({
  anonymizeFaces,
  anonymizePlates,
  onToggleFaces,
  onTogglePlates,
  onProcess,
  canProcess,
  loading,
  resultUrl,
}) {
  return (
    <div className="flex items-center justify-between mt-5">
      <div className="flex items-center gap-6">
        <ToggleSwitch
          label="Anonymize Faces"
          enabled={anonymizeFaces}
          onChange={onToggleFaces}
        />
        <ToggleSwitch
          label="License Plates"
          enabled={anonymizePlates}
          onChange={onTogglePlates}
        />
      </div>

      <div className="flex items-center gap-4">
        <p className="text-[10px] tracking-wider uppercase text-white/30 max-w-[280px] leading-relaxed hidden sm:block">
          Secured with Lens-Pro end-to-end encryption. No data leaves browser.
        </p>

        {resultUrl && (
          <a
            href={resultUrl}
            download="securelens-anonymized.jpg"
            className="px-5 py-2.5 border border-white/20 text-white text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-colors"
          >
            Download
          </a>
        )}

        <button
          onClick={onProcess}
          disabled={!canProcess || loading}
          className="px-6 py-2.5 bg-white text-black text-xs font-bold tracking-widest uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-colors"
        >
          {loading ? "Processing..." : "Process Image"}
        </button>
      </div>
    </div>
  );
}

export default ControlsBar;
