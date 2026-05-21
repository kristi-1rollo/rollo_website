import { useNavigate } from "react-router-dom";

const EuFunding = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-16">
      <section className="max-w-5xl lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-16 md:py-24">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
        >
          Back
        </button>
        <div className="-mx-5 md:mx-0 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10 space-y-8">
          <div className="-mx-5 md:mx-0 rounded-xl border border-white/10 bg-black/20 p-5 md:p-7">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-8 items-center">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                  Funding and Publicity
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  European Union co-funding
                </h1>
                <p className="text-white/85 leading-relaxed">
                  Rollo Robotics O&Uuml; is implementing a development project
                  co-funded by the European Union.
                </p>
                <p className="text-sm text-slate-300">
                  Funding is administered in Estonia by EIS.
                </p>
              </div>
              <img
                src="/logos/nextgeneration-eu-funded.jpg"
                alt="Funded by the European Union - NextGenerationEU"
                className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain md:justify-self-end"
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-slate-400">Project</p>
              <p className="text-white font-semibold mt-1">ROLLO</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-slate-400">Applicant</p>
              <p className="text-white font-semibold mt-1">
                Rollo Robotics O&Uuml; (registry code 17320003)
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 sm:col-span-2">
              <p className="text-slate-400">Eligible period</p>
              <p className="text-white font-semibold mt-1">
                4 October 2025 - 3 October 2028
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Project summary</h2>
              <p className="text-slate-300 leading-relaxed">
                ROLLO is an autonomous, electric, single-wheel robot designed to
                reduce reliance on human labour in sectors facing increasing
                labour shortages and cost pressure. The project includes applied
                research and advances development to the next stage by creating
                a reliable control system for a full-scale prototype.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">
                Project objective
              </h2>
              <p className="text-slate-300 leading-relaxed">
                The objective of the project is to carry out applied research
                and advance development to the next stage by developing an
                intelligent control system for a full-scale prototype. The
                system must ensure the robot's stability and precise motion even
                in challenging operating conditions (including ramps and
                gradients, uneven terrain, wind, different surface materials,
                and higher speeds).
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Project outcome</h2>
              <p className="text-slate-300 leading-relaxed">
                As a result of the project, a validated control system and
                technical solution will be delivered for a full-scale prototype.
                This will enable stable and precise operation in challenging
                environments and provide a foundation for further testing and
                pilot deployments.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Funding amount</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-slate-400">Total project cost</p>
                <p className="text-white font-semibold mt-1">&euro;2,741,283</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-slate-400">Grant (maximum)</p>
                <p className="text-white font-semibold mt-1">
                  &euro;1,527,534.10
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-slate-400">Co-financing (minimum)</p>
                <p className="text-white font-semibold mt-1">
                  &euro;1,213,748.90
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EuFunding;
