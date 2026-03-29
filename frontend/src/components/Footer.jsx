function Footer() {
  return (
    <footer className="flex items-center justify-between py-4 border-t border-white/10">
      <span className="text-[10px] tracking-widest uppercase text-white/25">
        &copy; {new Date().getFullYear()} SecureLens AI Labs
      </span>

      <div className="flex items-center gap-2 text-[10px] tracking-wider text-white/25">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
        All processing runs locally &mdash; your images never leave your device
      </div>

      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] tracking-widest uppercase text-white/25 hover:text-white/50 transition-colors"
      >
        GitHub
      </a>
    </footer>
  );
}

export default Footer;
