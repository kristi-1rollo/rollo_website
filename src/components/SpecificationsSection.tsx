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
    <section id="specs" className="section section-dark-alt section-divider relative overflow-hidden scroll-mt-28">
      <div className="container-premium">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-4 uppercase text-white">
          Technical Specifications
        </h2>
        <p className="text-white/40 text-center mb-16 font-mono text-xs tracking-widest uppercase">
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

      {/* GLASSMORPHISM MODAL — stays dark for cinematic feel */}
      {selectedSpec && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedSpec(null)}
        >
          <div
            className="relative w-full max-w-lg p-8 bg-[#0B0F14]/95 border border-white/10 backdrop-blur-2xl shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSpec(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-[#99FF00] transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-6 mb-8">
              <div className="p-4 bg-[#99FF00]/10 border border-[#99FF00]/20 text-[#99FF00]">
                <selectedSpec.Icon size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-tighter text-white">
                  {selectedSpec.title}
                </h3>
                <p className="text-[#99FF00] font-mono text-sm tracking-widest uppercase">
                  {selectedSpec.content}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="h-px bg-white/10 w-full" />
              <p className="text-white/60 leading-relaxed">
                Detailed technical analysis for {selectedSpec.title.toLowerCase()} system deployment.
                Optimized for industrial environments and continuous autonomous operations.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white/5 border border-white/5">
                  <p className="font-mono text-[10px] text-white/40 uppercase mb-1">Status</p>
                  <p className="text-xs font-bold uppercase text-white">
                    {selectedSpec.status === 'completed' ? 'Fully Operational' : 'In Testing'}
                  </p>
                </div>
                <div className="p-4 bg-white/5 border border-white/5">
                  <p className="font-mono text-[10px] text-white/40 uppercase mb-1">System Integration</p>
                  <p className="text-xs font-bold uppercase text-white">V2.4 Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SpecificationsSection;
