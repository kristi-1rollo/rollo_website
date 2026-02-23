const articles = [
  {
    tag: "Technology",
    title: "How Gyroscopic Stabilization Powers One-Wheel Patrol",
    excerpt:
      "An inside look at the self-balancing mechanics that let Rollo navigate uneven terrain in snow, mud, and darkness.",
    date: "Coming Soon",
  },
  {
    tag: "Security",
    title: "Why Autonomous Robots Outperform Traditional Guard Shifts",
    excerpt:
      "Breaking down the 24/7 uptime, cost savings, and consistency advantages of robotic patrol over human-only security.",
    date: "Coming Soon",
  },
  {
    tag: "Field Test",
    title: "Nordic Winter: Rollo in -20°C Conditions",
    excerpt:
      "Real data from our field tests across Estonia's harshest winter months, including battery performance and traction analysis.",
    date: "Coming Soon",
  },
  {
    tag: "AI & Vision",
    title: "360-Degree AI Vision: From Thermal to Low-Light",
    excerpt:
      "How Rollo's sensor stack combines thermal imaging, low-light cameras, and AI to detect threats in full darkness.",
    date: "Coming Soon",
  },
  {
    tag: "Industry",
    title: "Use Cases: Airports, Campuses, and Industrial Zones",
    excerpt:
      "Exploring the highest-value deployment scenarios for autonomous security robots across key industries.",
    date: "Coming Soon",
  },
  {
    tag: "Company",
    title: "Building a Robotics Team in Estonia",
    excerpt:
      "Our story of assembling a team with 3-15 years of shared robotics experience and the vision driving us forward.",
    date: "Coming Soon",
  },
];

const Blog = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
            Blog
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
            Insights & Updates
          </h1>
          <p className="text-base md:text-lg text-slate-300">
            Latest thinking on autonomous security, field test results, and the
            future of robotic patrol technology.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((a) => (
            <article
              key={a.title}
              className="h-full flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-full bg-[#B4FF33]/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-[#B4FF33] font-medium">
                  {a.tag}
                </span>
                <span className="text-[11px] text-slate-500">{a.date}</span>
              </div>

              <h2 className="text-lg font-semibold text-white mb-3 leading-snug">
                {a.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed flex-1">
                {a.excerpt}
              </p>

              <button
                className="mt-6 self-start text-sm font-medium text-[#B4FF33] hover:text-[#B4FF33]/80 transition"
                disabled
              >
                Read More &rarr;
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
