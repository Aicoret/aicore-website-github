const HeroSystemDiagram = () => (
  <svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx="240" cy="210" r="48" fill="#1E5BFF" opacity="0.15" />
    <circle cx="240" cy="210" r="36" fill="#1E5BFF" opacity="0.25" />
    <circle cx="240" cy="210" r="24" fill="#1E5BFF" />
    <text x="240" y="210" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="9" fontWeight="700">AICORE</text>
    <circle cx="240" cy="210" r="52" stroke="#1E5BFF" strokeWidth="1" opacity="0.3" strokeDasharray="4 4">
      <animateTransform attributeName="transform" type="rotate" from="0 240 210" to="360 240 210" dur="20s" repeatCount="indefinite" />
    </circle>
    <g>
      <line x1="240" y1="110" x2="240" y2="210" stroke="#00D4FF" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2s" repeatCount="indefinite" />
      </line>
      <circle r="2.5" fill="#00D4FF" opacity="0.9" filter="url(#glow)">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M240,110 L240,210" />
      </circle>
      <circle cx="240" cy="60" r="28" fill="#00D4FF" opacity="0.12" />
      <circle cx="240" cy="60" r="20" fill="#0D1B2E" stroke="#00D4FF" strokeWidth="1.5" />
      <text x="240" y="58" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">AI Tools</text>
      <text x="240" y="68" textAnchor="middle" fill="#00D4FF" fontSize="5.5">LLM / NLP</text>
    </g>
    <g>
      <line x1="330" y1="152" x2="240" y2="210" stroke="#1E5BFF" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2.3s" repeatCount="indefinite" />
      </line>
      <circle r="2.5" fill="#1E5BFF" opacity="0.9" filter="url(#glow)">
        <animateMotion dur="2.9s" repeatCount="indefinite" path="M330,152 L240,210" />
      </circle>
      <circle cx="380" cy="100" r="28" fill="#1E5BFF" opacity="0.12" />
      <circle cx="380" cy="100" r="20" fill="#0D1B2E" stroke="#1E5BFF" strokeWidth="1.5" />
      <text x="380" y="98" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">SaaS</text>
      <text x="380" y="108" textAnchor="middle" fill="#1E5BFF" fontSize="5.5">Dashboards</text>
    </g>
    <g>
      <line x1="362" y1="210" x2="240" y2="210" stroke="#00D4FF" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2.6s" repeatCount="indefinite" />
      </line>
      <circle r="2.5" fill="#00D4FF" opacity="0.9" filter="url(#glow)">
        <animateMotion dur="3.3s" repeatCount="indefinite" path="M362,210 L240,210" />
      </circle>
      <circle cx="420" cy="210" r="28" fill="#00D4FF" opacity="0.12" />
      <circle cx="420" cy="210" r="20" fill="#0D1B2E" stroke="#00D4FF" strokeWidth="1.5" />
      <text x="420" y="208" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">IoT</text>
      <text x="420" y="218" textAnchor="middle" fill="#00D4FF" fontSize="5.5">Gateways</text>
    </g>
    <g>
      <line x1="330" y1="268" x2="240" y2="210" stroke="#1E5BFF" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2.9s" repeatCount="indefinite" />
      </line>
      <circle r="2.5" fill="#1E5BFF" opacity="0.9" filter="url(#glow)">
        <animateMotion dur="3.7s" repeatCount="indefinite" path="M330,268 L240,210" />
      </circle>
      <circle cx="380" cy="320" r="28" fill="#1E5BFF" opacity="0.12" />
      <circle cx="380" cy="320" r="20" fill="#0D1B2E" stroke="#1E5BFF" strokeWidth="1.5" />
      <text x="380" y="318" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">Mobile</text>
      <text x="380" y="328" textAnchor="middle" fill="#1E5BFF" fontSize="5.5">Applications</text>
    </g>
    <g>
      <line x1="240" y1="310" x2="240" y2="210" stroke="#00B894" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="3.2s" repeatCount="indefinite" />
      </line>
      <circle r="2.5" fill="#00B894" opacity="0.9" filter="url(#glow)">
        <animateMotion dur="4.1s" repeatCount="indefinite" path="M240,310 L240,210" />
      </circle>
      <circle cx="240" cy="360" r="28" fill="#00B894" opacity="0.12" />
      <circle cx="240" cy="360" r="20" fill="#0D1B2E" stroke="#00B894" strokeWidth="1.5" />
      <text x="240" y="358" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">Robotics</text>
      <text x="240" y="368" textAnchor="middle" fill="#00B894" fontSize="5.5">Control</text>
    </g>
    <g>
      <line x1="150" y1="268" x2="240" y2="210" stroke="#F59E0B" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="3.5s" repeatCount="indefinite" />
      </line>
      <circle r="2.5" fill="#F59E0B" opacity="0.9" filter="url(#glow)">
        <animateMotion dur="4.5s" repeatCount="indefinite" path="M150,268 L240,210" />
      </circle>
      <circle cx="100" cy="320" r="28" fill="#F59E0B" opacity="0.12" />
      <circle cx="100" cy="320" r="20" fill="#0D1B2E" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="100" y="318" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">Energy</text>
      <text x="100" y="328" textAnchor="middle" fill="#F59E0B" fontSize="5.5">Monitoring</text>
    </g>
    <g>
      <line x1="118" y1="210" x2="240" y2="210" stroke="#00D4FF" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="3.8s" repeatCount="indefinite" />
      </line>
      <circle r="2.5" fill="#00D4FF" opacity="0.9" filter="url(#glow)">
        <animateMotion dur="4.9s" repeatCount="indefinite" path="M118,210 L240,210" />
      </circle>
      <circle cx="60" cy="210" r="28" fill="#00D4FF" opacity="0.12" />
      <circle cx="60" cy="210" r="20" fill="#0D1B2E" stroke="#00D4FF" strokeWidth="1.5" />
      <text x="60" y="208" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">Embedded</text>
      <text x="60" y="218" textAnchor="middle" fill="#00D4FF" fontSize="5.5">Firmware</text>
    </g>
    <g>
      <line x1="150" y1="152" x2="240" y2="210" stroke="#00B894" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="4.1s" repeatCount="indefinite" />
      </line>
      <circle r="2.5" fill="#00B894" opacity="0.9" filter="url(#glow)">
        <animateMotion dur="5.3s" repeatCount="indefinite" path="M150,152 L240,210" />
      </circle>
      <circle cx="100" cy="100" r="28" fill="#00B894" opacity="0.12" />
      <circle cx="100" cy="100" r="20" fill="#0D1B2E" stroke="#00B894" strokeWidth="1.5" />
      <text x="100" y="98" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">Automation</text>
      <text x="100" y="108" textAnchor="middle" fill="#00B894" fontSize="5.5">Workflows</text>
    </g>
  </svg>
);

export default function Hero() {
  return (
    <section className="hero-bg-custom pt-28 pb-20 lg:pb-28 relative overflow-hidden">
      <div className="hero-accent-glow glow-center" />
      <div className="hero-accent-glow glow-top-right" />
      <div className="hero-accent-glow grid-overlay opacity-[0.03]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 items-center">
          <div className="min-w-0">
            <div className="inline-flex max-w-full items-start gap-2 rounded-full border border-[#1E5BFF]/30 bg-[#1E5BFF]/10 px-3 py-1.5 mb-8">
              <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00D4FF] animate-pulse" />
              <span className="min-w-0 whitespace-normal break-words text-[#00D4FF] text-xs font-semibold tracking-wide uppercase">AI · AI Employees · Automation · IoT · Intelligent Systems</span>
            </div>
            <h1 className="max-w-[710px] break-words font-extrabold text-white tracking-tight leading-[1.05] lg:leading-[1.1] mb-6 text-[clamp(2.05rem,11vw,3.15rem)] sm:text-[clamp(2.25rem,7vw,3.15rem)]">
              Building Intelligent Software,
              <br className="hidden lg:block" />
              <span className="gradient-text">AI Employees</span>
              <span className="text-white mx-1"> & </span>
              <br className="hidden lg:block" />
              <span className="gradient-text">Automation Systems.</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              AICORE Technologies builds AI platforms, AI Employees, IoT systems, automation software and intelligent dashboards for organisations that want to operate smarter.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 mb-6">
              <a href="#ai-employees" className="bg-brand hover:bg-brand-hover text-white font-semibold px-3 py-3 sm:px-6 rounded-md transition text-center text-xs sm:text-sm">Explore AI Employees</a>
              <a href="/contact" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-3 py-3 sm:px-6 rounded-md transition text-center text-xs sm:text-sm">Discuss a Project</a>
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:hidden">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">System stack</p>
              <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-semibold text-slate-300">
                {["Physical", "Data", "AI", "Workflow", "Decision"].map((item, index) => (
                  <div key={item} className="min-w-0">
                    <span className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
                      {index + 1}
                    </span>
                    <span className="block truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative w-full max-w-lg mx-auto">
              <HeroSystemDiagram />
            </div>
          </div>
        </div>
        {/* Core Solutions Overview */}
        <div className="mt-16 max-w-5xl mx-auto">
          {/* <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">Our Core Solutions</h2>
            <p className="text-sm text-slate-400 leading-relaxed">AI, automation, and connected hardware for smarter operations.</p>
          </div> */}
          <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Our Core Solutions
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            AI, automation, and connected hardware for smarter operations.
          </p>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Solution 1 */}
            <a href="/solutions/process-and-business-automation" className="block">
            <div className="card-dark rounded-xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-brand/10 flex items-center justify-center text-brand shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-white pt-1.5">Custom Automation Software</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-3">Business process tools that reduce manual work, automate follow-up, and improve operational speed across teams.</p>
              <span className="text-xs font-semibold text-brand inline-flex items-center gap-1">See Automation Services <span>→</span></span>
            </div>
            </a>
            {/* Solution 2 */}
            <a href="/solutions/ai-systems-and-tools" className="block">
            <div className="card-dark rounded-xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-brand/10 flex items-center justify-center text-brand shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-white pt-1.5">AI Employees & Platforms</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-3">Role-based AI Employees for customer support, sales follow-up, reporting, scheduling, training, and operations.</p>
              <span className="text-xs font-semibold text-brand inline-flex items-center gap-1">Explore AI Employees <span>→</span></span>
            </div>
            </a>
            {/* Solution 3 */}
            <a href="/solutions/embedded-iot-edge-ai" className="block">
            <div className="card-dark rounded-xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-brand/10 flex items-center justify-center text-[#00D4FF] shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-white pt-1.5">IoT & Embedded Systems</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-3">Connected hardware, sensors, dashboards, and monitoring systems for real-world operations and facilities.</p>
              <span className="text-xs font-semibold text-brand inline-flex items-center gap-1">View IoT Solutions <span>→</span></span>
            </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
