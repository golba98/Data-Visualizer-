import { useMemo, lazy, Suspense } from "react";
import Hero from "./components/Hero";
import DateGrid from "./components/DateGrid";
import CombinationViewer from "./components/CombinationViewer";
import Legend from "./components/Legend";
import Footer from "./components/Footer";
import DigitCube from "./components/DigitCube";
import ScrollToTop from "./components/ScrollToTop";
import QuickNav from "./components/QuickNav";
import FilterControls from "./components/FilterControls";
import StatsPanel from "./components/StatsPanel";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import { DATE_ENTRIES } from "./data/dates";
import { SET_A, SET_B } from "./data/digitSets";
import { getDateMappings } from "./logic/canMakeDate";
import { useReducedMotion } from "./utils/useReducedMotion";
import { useURLState } from "./utils/useURLState";

const ProofSection = lazy(() => import("./components/ProofSection"));
const PracticalitySection = lazy(() => import("./components/PracticalitySection"));

export default function App() {
  const [urlState, setURLState] = useURLState(29, "all");
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = !prefersReducedMotion;

  const mappingsByDay = useMemo(() => {
    return Object.fromEntries(DATE_ENTRIES.map((entry) => [entry.day, getDateMappings(entry.day)]));
  }, []);

  const filteredDates = useMemo(() => {
    if (urlState.filter === "all") return DATE_ENTRIES.map((entry) => entry.day);

    return DATE_ENTRIES.filter((entry) => {
      const mappings = mappingsByDay[entry.day] ?? [];

      if (urlState.filter === "rotation") {
        return mappings.some((m) => m.usesRotation);
      }

      if (urlState.filter === "A×B*" || urlState.filter === "B*×A") {
        return mappings.some((m) => m.pairFamily === urlState.filter);
      }

      return true;
    }).map((entry) => entry.day);
  }, [urlState.filter, mappingsByDay]);

  const handleNavigate = (direction: "prev" | "next") => {
    const currentIndex = filteredDates.indexOf(urlState.date);
    if (currentIndex === -1) return;

    if (direction === "prev" && currentIndex > 0) {
      setURLState({ date: filteredDates[currentIndex - 1] });
    } else if (direction === "next" && currentIndex < filteredDates.length - 1) {
      setURLState({ date: filteredDates[currentIndex + 1] });
    }
  };

  return (
    <div className="min-h-screen">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-10 md:py-14">
        <Hero />

        <div className="flex flex-wrap items-center gap-3">
          {prefersReducedMotion && (
            <span className="text-xs text-slate-400" role="status">
              System prefers reduced motion
            </span>
          )}
          <div className="flex-1" />
          <a
            href="#visualization"
            className="rounded-lg border glass-light px-4 py-2 text-sm font-medium text-blue-200 transition-all duration-300 hover-lift hover:border-blue-400/50 hover:glow-blue focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-bg"
            aria-label="Jump to interactive grid section"
          >
            ↓ Jump to Interactive Grid
          </a>
        </div>

        <section id="sets" className="space-y-5" aria-labelledby="sets-heading">
          <div>
            <h2 id="sets-heading" className="section-title">
              Digit Sets
            </h2>
            <p className="section-subtitle mt-2">
              These two blocks are the entire symbol inventory. The second block reuses 6 as 9 when
              rotated.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-cyan-300/35 bg-cyan-500/12 p-5 elevated-md hover-lift">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">
                Set A = {`{0,1,2,3,4,5}`}
              </p>
              <div className="mt-3 flex flex-wrap gap-2" role="list" aria-label="Digits in Set A">
                {SET_A.map((digit) => (
                  <DigitCube key={`set-A-${digit}`} digit={digit} sourceSet="A" size="sm" />
                ))}
              </div>
            </article>
            <article className="rounded-2xl border border-violet-300/35 bg-violet-500/12 p-5 elevated-md hover-lift">
              <p className="text-xs uppercase tracking-[0.14em] text-violet-200">
                Set B = {`{0,1,2,6,7,8}`}
              </p>
              <div className="mt-3 flex flex-wrap gap-2" role="list" aria-label="Digits in Set B">
                {SET_B.map((digit) => (
                  <DigitCube key={`set-B-${digit}`} digit={digit} sourceSet="B*" size="sm" />
                ))}
              </div>
              <p className="mt-3 text-sm text-violet-100">Rotation note: 6 can be used as 9.</p>
            </article>
          </div>
        </section>

        <section id="visualization" className="space-y-7">
          <StatsPanel mappingsByDay={mappingsByDay} />
          <QuickNav onSelectDay={(day) => setURLState({ date: day })} />
          <FilterControls
            activeFilter={urlState.filter}
            onFilterChange={(filter) => setURLState({ filter })}
          />
          <DateGrid
            dates={filteredDates}
            selectedDay={urlState.date}
            onSelectDay={(day) => setURLState({ date: day })}
            mappingsByDay={mappingsByDay}
            isAnimated={shouldAnimate}
          />
          <CombinationViewer
            day={urlState.date}
            mappings={mappingsByDay[urlState.date] ?? []}
            onNavigate={handleNavigate}
          />
          <Legend />
        </section>

        <Suspense
          fallback={
            <div className="rounded-xl glass-medium elevated-md px-6 py-8 text-center text-slate-400">
              Loading proof sections...
            </div>
          }
        >
          <ProofSection />
          <PracticalitySection />
        </Suspense>
      </main>

      <Footer />
      <ScrollToTop />
      <KeyboardShortcuts onNavigate={handleNavigate} />
    </div>
  );
}
