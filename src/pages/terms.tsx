import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { usePageMeta } from "@/lib/use-page-meta";

const EFFECTIVE_DATE = "1 January 2025";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-[#0F172A] mb-4">{title}</h2>
      <div className="text-[#475569] text-sm leading-7 space-y-3">{children}</div>
    </div>
  );
}

export default function Terms() {
  usePageMeta(
    "Terms of Service",
    "AICORE Technologies Limited terms of service — the rules and conditions governing use of our website.",
    "/terms",
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-14" style={{ background: "#F8FAFC" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#1E5BFF] text-xs font-bold tracking-widest uppercase mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-[#07111F] mb-4">Terms of Service</h1>
          <p className="text-[#64748B] text-sm">Effective date: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using the AICORE Technologies website at aicoret.com (the "Site"), you agree to be
              bound by these Terms of Service. If you do not agree to these terms, please do not use the Site.
            </p>
            <p>
              These terms apply to all visitors, users, and anyone else who accesses the Site. AICORE Technologies
              Limited reserves the right to update these terms at any time. Continued use of the Site after
              changes constitutes acceptance.
            </p>
          </Section>

          <Section title="2. Use of Website">
            <p>You may use the Site for lawful purposes only. You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Site in any way that violates applicable Nigerian or international law or regulation.</li>
              <li>Transmit any unsolicited or unauthorised advertising or promotional material (spam).</li>
              <li>Attempt to gain unauthorised access to any part of the Site or its related systems.</li>
              <li>Use automated tools to scrape, crawl, or extract data from the Site without prior written consent.</li>
              <li>Impersonate AICORE, its employees, or any other person or entity.</li>
              <li>Transmit any material that is defamatory, offensive, or otherwise objectionable.</li>
            </ul>
          </Section>

          <Section title="3. Intellectual Property">
            <p>
              All content on this Site — including text, graphics, logos, icons, images, audio clips, digital
              downloads, code, and software — is the property of AICORE Technologies Limited or its content
              suppliers and is protected by Nigerian and international intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit
              any content from this Site without the express written consent of AICORE Technologies Limited.
            </p>
            <p>
              The AICORE name, logo, and all related product and service names, design marks, and slogans are
              trademarks of AICORE Technologies Limited. Nothing on the Site grants you any right to use any
              trademark, service mark, or trade name of AICORE.
            </p>
          </Section>

          <Section title="4. Disclaimer of Warranties">
            <p>
              The Site and its content are provided on an "as is" and "as available" basis without any warranties
              of any kind, either express or implied. AICORE Technologies Limited makes no warranties regarding:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The accuracy, completeness, or currency of any content on the Site.</li>
              <li>The uninterrupted or error-free operation of the Site.</li>
              <li>The absence of viruses or other harmful components.</li>
              <li>The suitability of the Site for any particular purpose.</li>
            </ul>
            <p>
              Product and service descriptions on the Site are provided for general informational purposes only
              and do not constitute a binding offer or contract.
            </p>
          </Section>

          <Section title="5. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, AICORE Technologies Limited and its directors, employees,
              agents, and affiliates shall not be liable for any direct, indirect, incidental, special,
              consequential, or punitive damages arising from your use of, or inability to use, the Site or
              its content — even if advised of the possibility of such damages.
            </p>
            <p>
              Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability for
              consequential damages. In such jurisdictions, AICORE's liability is limited to the maximum extent
              permitted by law.
            </p>
          </Section>

          <Section title="6. Third-Party Links">
            <p>
              The Site may contain links to third-party websites for your convenience and information. These links
              do not signify endorsement of those sites or their content. AICORE Technologies Limited has no
              control over, and assumes no responsibility for, third-party sites or their privacy practices.
            </p>
          </Section>

          <Section title="7. Governing Law">
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the Federal
              Republic of Nigeria, without regard to conflict of law principles. Any dispute arising under or
              in connection with these terms shall be subject to the exclusive jurisdiction of the courts of
              Lagos State, Nigeria.
            </p>
          </Section>

          <Section title="8. Changes to Terms">
            <p>
              AICORE Technologies Limited reserves the right to modify these Terms of Service at any time.
              Changes will be posted on this page with an updated effective date. Your continued use of the
              Site after any changes constitutes acceptance of the new terms.
            </p>
          </Section>

          <Section title="9. Contact">
            <p>For questions about these Terms of Service, please contact:</p>
            <ul className="list-none space-y-1">
              <li><strong className="text-[#0F172A]">Email:</strong> <a href="mailto:support@aicoret.com" className="text-[#1E5BFF] hover:underline">support@aicoret.com</a></li>
              <li><strong className="text-[#0F172A]">Phone:</strong> +234 701 072 9722</li>
              <li><strong className="text-[#0F172A]">Post:</strong> AICORE Technologies Limited, 117 Alhaji Amoo Street, Lagos, Nigeria</li>
            </ul>
          </Section>

          <div className="mt-10 pt-8 border-t border-slate-200 flex gap-4">
            <Link href="/privacy">
              <button className="px-6 py-3 rounded-xl font-semibold text-sm border border-slate-200 text-slate-600 hover:border-[#1E5BFF]/40 hover:text-[#1E5BFF] transition-all">
                Privacy Policy
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90" style={{ background: "#1E5BFF" }}>
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
