export default function CTA() {
  return (
    <section id="contact" className="gradient-dark pt-10 pb-14 lg:pt-14 lg:pb-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Need an AI Employee, automation system, IoT product, or intelligent business platform?
        </h2>
        <p className="text-lg text-slate-400 mb-10">Let's help you design, build, and deploy it.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#contact" className="bg-brand hover:bg-brand-hover text-white font-semibold px-7 py-3.5 rounded-md transition text-sm">Start a Project</a>
          <a href="#contact" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-7 py-3.5 rounded-md transition text-sm">Book a Call</a>
          <a href="#solutions" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-7 py-3.5 rounded-md transition text-sm">Explore Solutions</a>
        </div>
      </div>
    </section>
  );
}
