export default function Legend() {
  return (
    <section className="rounded-2xl glass-light elevated-md p-4">
      <h3 className="font-display text-xl">Legend</h3>
      <div className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-3">
        <p>
          <span className="mr-2 inline-block rounded-full border border-cyan-300/35 bg-cyan-500/15 px-2 py-0.5 text-cyan-200 elevated-sm">
            A
          </span>{" "}
          digit comes from set A.
        </p>
        <p>
          <span className="mr-2 inline-block rounded-full border border-violet-300/35 bg-violet-500/15 px-2 py-0.5 text-violet-200 elevated-sm">
            B*
          </span>{" "}
          digit comes from set B, with 6 also allowed as 9.
        </p>
        <p>
          <span className="mr-2 inline-block rounded-full border border-violet-300/35 bg-violet-500/15 px-2 py-0.5 text-violet-200 elevated-sm">
            6 to 9
          </span>{" "}
          indicates rotation is used.
        </p>
      </div>
    </section>
  );
}
