function Header({ onNewFile }) {
  return (
    <header className="flex items-center justify-between py-5 border-b border-white/10">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold tracking-widest uppercase">
          Secure<span className="text-white/40">|</span>Lens
        </h1>
        <span className="text-[11px] tracking-widest uppercase text-white/40 leading-tight">
          Privacy-First Image<br />Anonymizer
        </span>
      </div>
      <button
        className="w-8 h-8 border border-white/20 rounded flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
        onClick={onNewFile}
      >
        +
      </button>
    </header>
  );
}

export default Header;
