export default function Footer() {
  return (
    <footer className="mt-16 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent"></div>
      <div className="glass-light py-8 text-sm text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-slate-200">Two Sets, All Dates</p>
          <p>
            Explore the{" "}
            <a
              href="#proof"
              className="transition-all duration-300 hover:text-blue-300 hover:underline"
            >
              proof summary
            </a>{" "}
            and{" "}
            <a
              href="#practicality"
              className="transition-all duration-300 hover:text-blue-300 hover:underline"
            >
              practical interpretation
            </a>
            . Full docs are included in the repository.
          </p>
        </div>
      </div>
    </footer>
  );
}
