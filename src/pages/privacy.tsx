import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { usePageMeta } from "@/lib/use-page-meta";

const LAST_UPDATED = "14 May 2025";
const EFFECTIVE_DATE = "1 January 2025";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-[#0F172A] mb-4">{title}</h2>
      <div className="text-[#475569] text-sm leading-7 space-y-3">{children}</div>
    </div>
  );
}

export default function Privacy() {
  usePageMeta(
    "Privacy Policy",
    "AICORE Technologies Limited privacy policy — how we collect, use, and protect your data in accordance with the Nigeria Data Protection Act 2023.",
    "/privacy",
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-14" style={{ background: "#F8FAFC" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#1E5BFF] text-xs font-bold tracking-widest uppercase mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-[#07111F] mb-4">Privacy Policy</h1>
          <p className="text-[#64748B] text-sm">
            Last updated: {LAST_UPDATED} &nbsp;·&nbsp; Effective: {EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <Section title="1. Who We Are">
            <p>
              AICORE Technologies Limited ("AICORE", "we", "us", or "our") is a technology company registered in
              Nigeria, operating at 117 Alhaji Amoo Street, Lagos, Nigeria. We build AI tools, automation platforms,
              IoT systems, robotics solutions, and SaaS products.
            </p>
            <p>
              For any privacy-related enquiries, contact us at{" "}
              <a href="mailto:support@aicoret.com" className="text-[#1E5BFF] hover:underline">
                support@aicoret.com
              </a>.
            </p>
          </Section>

          <Section title="2. What Data We Collect">
            <p>We collect the following categories of personal data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-[#0F172A]">Contact form data:</strong> name, email address, phone number,
                company name, and the content of your enquiry when you submit a form on this site.
              </li>
              <li>
                <strong className="text-[#0F172A]">Cookies:</strong> essential cookies required for site function;
                optional analytics cookies if you consent. See Section 6 for details.
              </li>
              <li>
                <strong className="text-[#0F172A]">Analytics data:</strong> with your consent, anonymised usage data
                such as pages visited, time on page, and referral source.
              </li>
              <li>
                <strong className="text-[#0F172A]">AI chatbot interactions:</strong> text you submit to the on-site
                AI assistant. This data is processed in real time and is not stored beyond your session.
              </li>
            </ul>
            <p>We do not collect payment card details, biometric data, or government identification numbers on this website.</p>
          </Section>

          <Section title="3. How We Use Your Data">
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to enquiries, project requests, and support messages you send us.</li>
              <li>To improve our website, content, and services using aggregated analytics (analytics consent required).</li>
              <li>To send newsletters or product updates if you have opted in (you may unsubscribe at any time).</li>
              <li>To comply with applicable laws and regulations, including the Nigeria Data Protection Act 2023.</li>
            </ul>
            <p>We do not sell, rent, or trade your personal data to any third party for their marketing purposes.</p>
          </Section>

          <Section title="4. Data Storage &amp; Security">
            <p>
              Your data is stored securely on Replit infrastructure (United States) with PostgreSQL. AICORE implements
              appropriate technical and organisational measures to protect your personal data against unauthorised access,
              loss, or disclosure.
            </p>
            <p>
              Contact form submissions are retained for up to 24 months for the purpose of managing our client
              relationship. You may request deletion at any time (see Section 5).
            </p>
          </Section>

          <Section title="5. Your Rights (NDPA 2023)">
            <p>Under the Nigeria Data Protection Act 2023 (NDPA), you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-[#0F172A]">Access:</strong> request a copy of the personal data we hold about you.</li>
              <li><strong className="text-[#0F172A]">Correction:</strong> request correction of inaccurate or incomplete data.</li>
              <li><strong className="text-[#0F172A]">Deletion:</strong> request that we delete your personal data, subject to legal obligations.</li>
              <li><strong className="text-[#0F172A]">Withdraw consent:</strong> withdraw consent for analytics or marketing at any time without affecting prior processing.</li>
              <li><strong className="text-[#0F172A]">Object:</strong> object to processing where we rely on legitimate interest as the legal basis.</li>
            </ul>
            <p>
              To exercise any of these rights, email{" "}
              <a href="mailto:support@aicoret.com" className="text-[#1E5BFF] hover:underline">
                support@aicoret.com
              </a>{" "}
              with the subject line "Data Rights Request". We will respond within 30 days.
            </p>
          </Section>

          <Section title="6. Cookies">
            <p>We use three categories of cookies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-[#0F172A]">Essential cookies (always active):</strong> required for core site
                functionality such as session management. These cannot be disabled.
              </li>
              <li>
                <strong className="text-[#0F172A]">Analytics cookies (optional):</strong> help us understand how
                visitors use the site. Only enabled if you accept analytics in the cookie banner.
              </li>
              <li>
                <strong className="text-[#0F172A]">Marketing cookies (optional):</strong> used for retargeting and
                advertising. Only enabled if you explicitly accept marketing cookies.
              </li>
            </ul>
            <p>
              You can manage your cookie preferences at any time by clearing your browser's local storage for
              this site, or by contacting us.
            </p>
          </Section>

          <Section title="7. Third-Party Services">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-[#0F172A]">OpenAI:</strong> the on-site AI assistant uses the OpenAI API.
                Messages you send are processed by OpenAI subject to their{" "}
                <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#1E5BFF] hover:underline">
                  Privacy Policy
                </a>. AICORE does not store your chatbot messages beyond the current session.
              </li>
              <li>
                <strong className="text-[#0F172A]">Google Fonts:</strong> this site loads fonts from Google's CDN,
                which may log your IP address. See{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1E5BFF] hover:underline">
                  Google's Privacy Policy
                </a>.
              </li>
              <li>
                <strong className="text-[#0F172A]">Replit:</strong> our hosting provider. See{" "}
                <a href="https://replit.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1E5BFF] hover:underline">
                  Replit's Privacy Policy
                </a>.
              </li>
            </ul>
          </Section>

          <Section title="8. NDPA Compliance">
            <p>
              AICORE Technologies Limited is committed to full compliance with the Nigeria Data Protection Act 2023
              (NDPA) and its predecessor, the Nigeria Data Protection Regulation 2019 (NDPR). We conduct periodic
              data protection impact assessments and have appointed a data protection focal point.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we will update the "Last updated"
              date at the top of this page. Continued use of the site after changes constitutes acceptance of
              the updated policy. For material changes, we will provide notice via the site.
            </p>
          </Section>

          <Section title="10. Contact Us">
            <p>For any questions about this Privacy Policy or your personal data:</p>
            <ul className="list-none space-y-1">
              <li><strong className="text-[#0F172A]">Email:</strong> <a href="mailto:support@aicoret.com" className="text-[#1E5BFF] hover:underline">support@aicoret.com</a></li>
              <li><strong className="text-[#0F172A]">Phone:</strong> +234 701 072 9722</li>
              <li><strong className="text-[#0F172A]">Post:</strong> AICORE Technologies Limited, 117 Alhaji Amoo Street, Lagos, Nigeria</li>
            </ul>
          </Section>

          <div className="mt-10 pt-8 border-t border-slate-200">
            <Link href="/contact">
              <button className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90" style={{ background: "#1E5BFF" }}>
                Contact Us About Your Data
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
