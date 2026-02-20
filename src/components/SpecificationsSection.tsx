import { useState } from "react";
import { Ruler, Weight, Zap, Battery, Eye, Plug, Calendar, X } from "lucide-react";
import RadialOrbitalTimeline, { TimelineItem } from "./RadialOrbitalTimeline";
import rollo2 from "@/assets/rollo2.png";

const timelineData: TimelineItem[] = [
  { id: 1, title: "Dimensions", content: "60 x 60 x 140 cm", Icon: Ruler, status: "completed" },
  { id: 2, title: "Weight", content: "35 kg", Icon: Weight, status: "completed" },
  { id: 3, title: "Speed", content: "Up to 10 km/h", Icon: Zap, status: "completed" },
  { id: 4, title: "Battery", content: "Up to 8 hours", Icon: Battery, status: "completed" },
  { id: 5, title: "Sensors", content: "Motion & object detection", Icon: Eye, status: "completed" },
  { id: 6, title: "Charging", content: "Automatic recharging", Icon: Plug, status: "completed" },
  { id: 7, title: "Availability", content: "Pilot projects from 2025", Icon: Calendar, status: "pending" },
];

const SpecificationsSection = () => {
  const [selectedSpec, setSelectedSpec] = useState<TimelineItem | null>(null);

  return (
    <section id="specs" className="section relative overflow-hidden scroll-mt-28">
      <div className="container-premium">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 text-center mb-4 font-medium">
          Engineering
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-center mb-4 uppercase text-white">
          Technical Specifications
        </h2>
        <p className="text-slate-500 text-center mb-16 font-mono text-xs tracking-widest uppercase">
          Built for real-world deployment
        </p>

        <div onClick={(e) => {
          const target = e.target as HTMLElement;
          const card = target.closest('[data-spec-id]');
          if (card) {
            const id = Number(card.getAttribute('data-spec-id'));
            const spec = timelineData.find(item => item.id === id);
            if (spec) setSelectedSpec(spec);
          }
        }}>
          <RadialOrbitalTimeline
            timelineData={timelineData}
            centerImage={rollo2}
          />
        </div>
      </div>

      {/* Detail modal */}
      {selectedSpec && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedSpec(null)}
        >
          <div
            className="relative w-full max-w-lg p-10 bg-[#050505]/95 backdrop-blur-2xl shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSpec(null)}
              className="absolute top-5 right-5 text-slate-600 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-2">
              System Specification
            </p>

            <h3 className="text-3xl font-bold uppercase tracking-tighter text-white mb-1">
              {selectedSpec.title}
            </h3>

            <p className="text-[#B4FF33] font-mono text-sm tracking-widest uppercase mb-8">
              {selectedSpec.content}
            </p>

            <div className="h-px bg-white/[0.06] w-full mb-8" />

            <p className="text-slate-400 leading-relaxed text-sm mb-8">
              Detailed technical analysis for {selectedSpec.title.toLowerCase()} system deployment.
              Optimized for industrial environments and continuous autonomous operations.
            </p>

            <div className="flex gap-12">
              <div>
                <p className="font-mono text-[10px] text-slate-600 uppercase mb-1">Status</p>
                <p className="text-xs font-bold uppercase text-white">
                  {selectedSpec.status === 'completed' ? 'Operational' : 'In Testing'}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-slate-600 uppercase mb-1">Integration</p>
                <p className="text-xs font-bold uppercase text-white">V2.4 Verified</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SpecificationsSection;
