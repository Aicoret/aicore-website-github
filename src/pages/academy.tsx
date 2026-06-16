import { useState } from "react";
import { Link } from "wouter";
import { GraduationCap, Brain, Bot, Cpu, Code2, Zap, Users, CheckCircle } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { usePageMeta } from "@/lib/use-page-meta";
import EnrollmentModal from "@/components/enrollment-modal";

const tracks = [
  { icon: Brain, title: "AI & Automation", slug: "ai-automation", desc: "Hands-on training in AI tools, automation workflows, and intelligent system design. Learn to build, deploy, and manage AI-powered solutions.", duration: "4–8 weeks", level: "Beginner to Advanced", color: "#1E5BFF" },
  { icon: Bot, title: "Robotics & STEM", slug: "robotics-stem", desc: "Practical robotics programs for schools and training institutions using real hardware kits — from basic automation to autonomous systems.", duration: "6–12 weeks", level: "Beginner to Intermediate", color: "#00B894" },
  { icon: Cpu, title: "Embedded Systems & IoT", slug: "embedded-iot", desc: "Embedded programming, microcontroller development, sensor integration, and IoT system architecture from hardware to cloud.", duration: "6–10 weeks", level: "Intermediate to Advanced", color: "#00D4FF" },
  { icon: Code2, title: "Software Development", slug: "software-development", desc: "Full-stack web and mobile application development using modern frameworks, API design, and cloud deployment best practices.", duration: "8–12 weeks", level: "Beginner to Advanced", color: "#1E5BFF" },
  { icon: Zap, title: "Smart Energy Systems", slug: "smart-energy", desc: "Energy monitoring, solar system design, battery management, and IoT-connected energy management for modern energy professionals.", duration: "4–6 weeks", level: "Intermediate", color: "#F59E0B" },
  { icon: Users, title: "Corporate Technical Training", slug: "corporate-training", desc: "Custom upskilling programs for engineering and operations teams — delivered on-site or online, built around your industry and systems.", duration: "Custom", level: "All levels", color: "#00B894" },
];

const howItWorks = [
  { n: "01", title: "Choose Your Track", desc: "Select from six technical tracks or request a custom corporate program." },
  { n: "02", title: "Enroll & Onboard", desc: "Complete your enrollment, receive your hardware kit (where applicable), and join the cohort." },
  { n: "03", title: "Learn & Build", desc: "Work through structured modules combining theory, labs, and real project work." },
  { n: "04", title: "Graduate & Apply", desc: "Complete your capstone project, receive your certificate, and apply your skills immediately." },
];

export default function Academy() {
  usePageMeta(
    "AICORE Academy — Practical Technology Training",
    "Hands-on technical training covering AI, robotics, IoT, embedded systems, software development, smart energy, and corporate upskilling.",
    "/academy",
  );

  const [enrollTrack, setEnrollTrack] = useState<{ title: string; slug: string } | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <Header />

      {/* Hero */}
      <section
        className="pt-28 pb-20"
        style={{ background: "linear-gradient(135deg, #1A1200 0%, #07111F 60%, #0A1628 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 mb-6">
            <GraduationCap size={14} className="text-[#F59E0B]" aria-hidden="true" />
            <span className="text-[#F59E0B] text-xs font-semibold tracking-wide uppercase">AICORE Academy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight max-w-3xl">
            Practical Technology Training for the Next Generation of Builders
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl mb-10">
            Hands-on technical programs for students, professionals, and corporate teams — combining theory, practical labs, and real project delivery in AI, automation, robotics, embedded systems, and more.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <span
                data-testid="btn-academy-enquire"
                className="inline-block px-7 py-3.5 rounded-xl font-semibold text-[#07111F] transition-all hover:opacity-90 cursor-pointer"
                style={{ background: "linear-gradient(135deg, #F59E0B, #FBBF24)" }}
              >
                Enquire About Training
              </span>
            </Link>
            <a href="#tracks">
              <span className="inline-block px-7 py-3.5 rounded-xl font-semibold text-white border border-white/15 hover:border-white/30 transition-all cursor-pointer">
                View Training Tracks
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Training Tracks */}
      <section className="py-20" id="tracks">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">Training Tracks</h2>
            <p className="text-[#475569] text-lg max-w-2xl mx-auto">Six focused programs built around the technologies that matter most in modern intelligent systems.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.title}
                  className="bg-white rounded-2xl border border-slate-300 shadow-sm p-7 hover:border-brand/40 hover:shadow-lg transition-all group flex flex-col"
                  data-testid={`card-track-${track.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: track.color + "15" }}>
                    <Icon size={22} style={{ color: track.color }} aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-lg mb-3">{track.title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed mb-5 flex-1">{track.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600">
                      Duration: {track.duration}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600">
                      {track.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEnrollTrack({ title: track.title, slug: track.slug })}
                      className="flex-1 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: track.color }}
                      data-testid={`btn-enroll-${track.slug}`}
                    >
                      Enroll Now
                    </button>
                    <Link href="/contact">
                      <span className="text-[#1E5BFF] text-xs font-semibold cursor-pointer hover:underline">
                        Enquire →
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Academy Works */}
      <section className="py-20" style={{ background: "#07111F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">How Academy Works</h2>
            <p className="text-[#64748B] text-lg max-w-xl mx-auto">A straightforward path from enrollment to certification.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <div key={step.n} className="text-center p-6" data-testid={`step-academy-${step.n}`}>
                <div className="w-14 h-14 rounded-full border-2 border-[#F59E0B] flex items-center justify-center mx-auto mb-5">
                  <span className="text-[#F59E0B] font-bold text-lg">{step.n}</span>
                </div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Academy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Why Train with AICORE Academy?</h2>
              <div className="space-y-4">
                {[
                  "Curriculum designed by practitioners who build real intelligent systems",
                  "Hands-on labs with actual hardware — not just simulations",
                  "Projects that mirror real-world industry challenges",
                  "Corporate programs built around your team's specific stack and goals",
                  "Training available on-site, online, or as blended delivery",
                  "Post-training support and access to AICORE's technical community",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle size={17} className="text-[#F59E0B] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <p className="text-[#475569] text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-8" style={{ background: "linear-gradient(135deg, #1A1200, #07111F)" }}>
              <h3 className="text-xl font-bold text-white mb-4">For Schools &amp; Institutions</h3>
              <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                AICORE Academy offers structured STEM and robotics programs purpose-built for secondary schools, polytechnics, and vocational training centers — complete with hardware kits, lesson plans, and instructor support.
              </p>
              <h3 className="text-xl font-bold text-white mb-4">For Corporate Teams</h3>
              <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                We design custom technical training programs for engineering, operations, and technical teams — covering AI integration, automation, IoT, and embedded systems specific to your industry.
              </p>
              <Link href="/contact">
                <span
                  data-testid="btn-academy-cta"
                  className="inline-block px-6 py-3 rounded-xl font-semibold text-[#07111F] transition-all cursor-pointer hover:opacity-90"
                  style={{ background: "#F59E0B" }}
                >
                  Enquire About Training
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Enrollment Modal */}
      {enrollTrack && (
        <EnrollmentModal
          trackTitle={enrollTrack.title}
          trackSlug={enrollTrack.slug}
          onClose={() => setEnrollTrack(null)}
        />
      )}
    </div>
  );
}
