function ToggleSwitch({ label, enabled, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <button
        onClick={onChange}
        className={`w-9 h-5 rounded-sm flex items-center transition-colors ${
          enabled ? "bg-orange-500 justify-end" : "bg-white/20 justify-start"
        }`}
      >
        <span className="block w-4 h-4 bg-white rounded-sm m-0.5" />
      </button>
      <span className="text-[11px] tracking-widest uppercase text-white/60">
        {label}
      </span>
    </label>
  );
}

export default ToggleSwitch;
