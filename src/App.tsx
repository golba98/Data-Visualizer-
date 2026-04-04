import { useMemo, useState } from "react";
import Hero from "./components/Hero";
import DateGrid from "./components/DateGrid";
import CombinationViewer from "./components/CombinationViewer";
import ProofSection from "./components/ProofSection";
import PracticalitySection from "./components/PracticalitySection";
import Legend from "./components/Legend";
import Footer from "./components/Footer";
import DigitCube from "./components/DigitCube";
import ScrollToTop from "./components/ScrollToTop";
import QuickNav from "./components/QuickNav";
import FilterControls, { type FilterType } from "./components/FilterControls";
import StatsPanel from "./components/StatsPanel";
import AnimationControls from "./components/AnimationControls";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import { DATE_ENTRIES } from "./data/dates";
import { SET_A, SET_B } from "./data/digitSets";
import { getDateMappings } from "./logic/canMakeDate";

export default function App() {
  const [selectedDay, setSelectedDay] = useState<number>(29);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [isAnimated, setIsAnimated] = useState<boolean>(true);

  const mappingsByDay = useMemo(() => {
    return Object.fromEntries(DATE_ENTRIES.map((entry) => [entry.day, getDateMappings(entry.day)]));
  }, []);

  const filteredDates = useMemo(() => {
    if (filterType === "all") return DATE_ENTRIES.map((entry) => entry.day);
    
    return DATE_ENTRIES.filter((entry) => {
      const mappings = mappingsByDay[entry.day] ?? [];
      
      if (filterType === "rotation") {
        return mappings.some((m) => m.usesRotation);
      }
      
      if (filterType === "A×B*" || filterType === "B*×A") {
        return mappings.some((m) => m.pairFamily === filterType);
      }
      
      return true;
    }).map((entry) => entry.day);
  }, [filterType, mappingsByDay]);

  const handleNavigate = (direction: "prev" | "next") => {
    const currentIndex = filteredDates.indexOf(selectedDay);
    if (currentIndex === -1) return;

    if (direction === "prev" && currentIndex > 0) {
      setSelectedDay(filteredDates[currentIndex - 1]);
    } else if (direction === "next" && currentIndex < filteredDates.length - 1) {
      setSelectedDay(filteredDates[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-10 md:py-14">
        <Hero />

        <div className="flex flex-wrap items-center gap-3">
          <AnimationControls isAnimated={isAnimated} onToggle={() => setIsAnimated(!isAnimated)} />
          <div className="flex-1" />
          <a
            href="#visualization"
            className="rounded-lg border glass-light px-4 py-2 text-sm font-medium text-blue-200 transition-all duration-300 hover-lift hover:border-blue-400/50 hover:glow-blue"
          >
            ↓ Jump to Interactive Grid
          </a>
        </div>

        <section id="sets" className="space-y-5">
          <div>
            <h2 className="section-title">Digit Sets</h2>
            <p className="section-subtitle mt-2">
              These two blocks are the entire symbol inventory. The second block reuses 6 as 9 when rotated.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-cyan-300/35 bg-cyan-500/12 p-5 elevated-md hover-lift">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">Set A = {`{0,1,2,3,4,5}`}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SET_A.map((digit) => (
                  <DigitCube key={`set-A-${digit}`} digit={digit} sourceSet="A" size="sm" />
                ))}
              </div>
            </article>
            <article className="rounded-2xl border border-violet-300/35 bg-violet-500/12 p-5 elevated-md hover-lift">
              <p className="text-xs uppercase tracking-[0.14em] text-violet-200">Set B = {`{0,1,2,6,7,8}`}</p>
              <div className="mt-3 flex flex-wrap gap-2">
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
          <QuickNav onSelectDay={setSelectedDay} />
          <FilterControls activeFilter={filterType} onFilterChange={setFilterType} />
          <DateGrid
            dates={filteredDates}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            mappingsByDay={mappingsByDay}
            isAnimated={isAnimated}
          />
          <CombinationViewer day={selectedDay} mappings={mappingsByDay[selectedDay] ?? []} />
          <Legend />
        </section>

        <ProofSection />
        <PracticalitySection />
      </main>

      <Footer />
      <ScrollToTop />
      <KeyboardShortcuts 
        onNavigate={handleNavigate}
        onToggleAnimation={() => setIsAnimated(!isAnimated)}
      />
    </div>
  );
}
