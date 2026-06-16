import { useState } from "react";
import { useForm } from "react-hook-form";
import { usePageMeta } from "@/lib/use-page-meta";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Clock, CheckCircle2, Building2, MapPin, MessageCircle, Linkedin, Download } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { FAQSection } from "@/components/faq-section";
import { StructuredData } from "@/components/structured-data";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { contactInfo } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";
import { pageContext, postPublicJson } from "@/lib/public-api";
import { faqPageSchema, localBusinessSchema } from "@/lib/seo";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  organization: z.string().min(1, "Organization is required"),
  enquiryType: z.string().min(1, "Please select an enquiry type"),
  description: z.string().min(10, "Please describe your project or need (min 10 characters)"),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  contactMethod: z.string().min(1, "Please select a preferred contact method"),
  honeypot: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type PublicIntakeAcceptedResponse = {
  data?: {
    intakeReference?: string;
  };
  intakeReference?: string;
};

const contactFaqs = [
  {
    question: "How quickly does AICORE respond to enquiries?",
    answer: `AICORE typically responds ${contactInfo.responseTime.toLowerCase()} after receiving a project, product demo, academy, partnership, or general enquiry.`,
  },
  {
    question: "What information should I include in my enquiry?",
    answer: "Describe the workflow, system, device, data, or business problem you want to improve. Include current tools, users, timeline, and any technical requirements or limits if you know them.",
  },
  {
    question: "Can we talk through the idea before committing to a project?",
    answer: "Yes. AICORE can review your idea or operational challenge, suggest a practical next step, and outline the likely scope before a formal project begins.",
  },
  {
    question: "Does AICORE support clients outside Lagos?",
    answer: "Yes. AICORE works with clients across Nigeria and beyond, with offices in Lagos and Osogbo and remote collaboration for software, AI, automation, and IoT projects.",
  },
];

const enquiryTypeMap: Record<string, string> = {
  "start-project": "service",
  consultation: "service",
  demo: "product",
  academy: "academy",
  partnership: "partnership",
  general: "general",
};

export default function Contact() {
  usePageMeta(
    "Contact AICORE — Start a Project",
    "Tell AICORE about your AI, automation, IoT, or software project. We respond within 24 hours.",
    "/contact",
  );
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [intakeReference, setIntakeReference] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      enquiryType: "",
      description: "",
      budgetRange: "",
      timeline: "",
      contactMethod: "email",
      honeypot: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await postPublicJson<PublicIntakeAcceptedResponse>(
        "/api/v1/public/contact-submissions",
        {
          ...values,
          enquiryType: enquiryTypeMap[values.enquiryType] ?? "general",
          ...pageContext("contact-form"),
        },
        { idempotencyScope: "Website:ContactSubmission" },
      );
      setIntakeReference(response.data?.intakeReference ?? response.intakeReference ?? "");
      trackEvent("public_form_submitted", { form: "contact", status: "accepted" });
      setSubmitted(true);
    } catch {
      trackEvent("public_form_submit_failed", { form: "contact" });
      setSubmitError("Could not submit your enquiry. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <StructuredData id="contact" data={[localBusinessSchema(), faqPageSchema(contactFaqs)]} />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "linear-gradient(135deg, #07111F 0%, #0A1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-4">Contact</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 max-w-2xl leading-tight">
            Start a Project
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-xl leading-relaxed">
            Tell us what you want to build, automate, monitor, or improve. We will review your request and recommend the next step.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-2xl border border-[#00B894]/30 p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00B894]/15 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} className="text-[#00B894]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Enquiry Received</h2>
                  <p className="text-[#64748B] leading-relaxed max-w-md mx-auto">
                    Thank you for reaching out. We'll review your enquiry and get back to you within one business day to recommend the right next step.
                  </p>
                  {intakeReference ? (
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                      Reference: <span className="text-[#0F172A]">{intakeReference}</span>
                    </p>
                  ) : null}
                  <button
                    onClick={() => { setSubmitted(false); setIntakeReference(""); form.reset(); }}
                    className="mt-8 px-6 py-2.5 rounded-xl font-semibold text-white bg-[#1E5BFF] text-sm hover:bg-[#1a50e0] transition-all"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Enquiry Form</h2>
                  <p className="text-[#64748B] text-sm mb-8">All fields marked with * are required.</p>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#0F172A] text-sm font-semibold">Full Name *</FormLabel>
                            <FormControl><Input data-testid="input-name" placeholder="Your full name" {...field} className="border-slate-200 focus:border-[#1E5BFF]" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#0F172A] text-sm font-semibold">Email Address *</FormLabel>
                            <FormControl><Input data-testid="input-email" type="email" placeholder="you@company.com" {...field} className="border-slate-200 focus:border-[#1E5BFF]" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#0F172A] text-sm font-semibold">Phone Number</FormLabel>
                            <FormControl><Input data-testid="input-phone" placeholder="+234 000 000 0000" {...field} className="border-slate-200" /></FormControl>
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="organization" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#0F172A] text-sm font-semibold">Organization *</FormLabel>
                            <FormControl><Input data-testid="input-organization" placeholder="Company or institution name" {...field} className="border-slate-200 focus:border-[#1E5BFF]" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="enquiryType" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#0F172A] text-sm font-semibold">Enquiry Type *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-enquiry-type" className="border-slate-200">
                                <SelectValue placeholder="Select enquiry type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="start-project">Start a project</SelectItem>
                              <SelectItem value="consultation">Book a project call</SelectItem>
                              <SelectItem value="demo">Request product demo</SelectItem>
                              <SelectItem value="academy">Academy / training enquiry</SelectItem>
                              <SelectItem value="partnership">Partnership enquiry</SelectItem>
                              <SelectItem value="general">General enquiry</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#0F172A] text-sm font-semibold">Project / Need Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              data-testid="textarea-description"
                              placeholder="Describe what you want to build, automate, monitor, or improve. Include details about your current process, the problem you're solving, and any technical context."
                              rows={5}
                              {...field}
                              className="border-slate-200 focus:border-[#1E5BFF] resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <div className="grid sm:grid-cols-2 gap-5">
                        <FormField control={form.control} name="budgetRange" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#0F172A] text-sm font-semibold">Budget Range (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-budget" className="border-slate-200">
                                  <SelectValue placeholder="Select budget range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="under-5k">Under $5,000</SelectItem>
                                <SelectItem value="5k-20k">$5,000 – $20,000</SelectItem>
                                <SelectItem value="20k-100k">$20,000 – $100,000</SelectItem>
                                <SelectItem value="100k-plus">$100,000+</SelectItem>
                                <SelectItem value="not-sure">Not sure yet</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="timeline" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#0F172A] text-sm font-semibold">Timeline (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-timeline" className="border-slate-200">
                                  <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="asap">ASAP</SelectItem>
                                <SelectItem value="1-3-months">1–3 months</SelectItem>
                                <SelectItem value="3-6-months">3–6 months</SelectItem>
                                <SelectItem value="6-12-months">6–12 months</SelectItem>
                                <SelectItem value="flexible">Flexible</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="contactMethod" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#0F172A] text-sm font-semibold">Preferred Contact Method *</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-wrap gap-5 mt-2" data-testid="radio-contact-method">
                              {[{ value: "email", label: "Email" }, { value: "phone", label: "Phone" }, { value: "whatsapp", label: "WhatsApp" }].map((opt) => (
                                <div key={opt.value} className="flex items-center gap-2">
                                  <RadioGroupItem value={opt.value} id={`contact-${opt.value}`} data-testid={`radio-${opt.value}`} />
                                  <Label htmlFor={`contact-${opt.value}`} className="text-[#475569] text-sm cursor-pointer">{opt.label}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      {/* Honeypot — hidden from real users, traps bots */}
                      <input
                        type="text"
                        tabIndex={-1}
                        aria-hidden="true"
                        autoComplete="off"
                        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
                        {...form.register("honeypot")}
                      />

	                      <Button
	                        type="submit"
	                        data-testid="btn-submit-enquiry"
	                        disabled={isSubmitting}
	                        className="w-full py-3.5 text-base font-semibold rounded-xl text-white"
	                        style={{ background: "#1E5BFF" }}
	                      >
	                        {isSubmitting ? "Submitting..." : "Submit Enquiry"}
	                      </Button>
                        {submitError && (
                          <p className="text-sm text-red-600 text-center" role="alert">
                            {submitError}
                          </p>
                        )}
	                    </form>
	                  </Form>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Contact Details */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6">
                <h3 className="font-bold text-[#0F172A] mb-5">Contact Details</h3>
                <div className="space-y-4">
                  <a href={`mailto:${contactInfo.email}`} className="flex items-start gap-3 group">
                    <Mail size={16} className="text-[#1E5BFF] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[#0F172A] text-sm font-medium">Email</p>
                      <p className="text-[#1E5BFF] text-sm group-hover:underline">{contactInfo.email}</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-[#1E5BFF] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[#0F172A] text-sm font-medium">Phone / WhatsApp</p>
                      {contactInfo.phones.map((p) => (
                        <a key={p.number} href={`tel:${p.number}`} className="block text-[#64748B] text-sm hover:text-[#0F172A] transition-colors">
                          {p.display}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 size={16} className="text-[#1E5BFF] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[#0F172A] text-sm font-medium">Company</p>
                      <p className="text-[#64748B] text-sm">AICORE Technologies Limited</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-[#1E5BFF] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[#0F172A] text-sm font-medium">Response Time</p>
                      <p className="text-[#64748B] text-sm">{contactInfo.responseTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offices */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6">
                <h3 className="font-bold text-[#0F172A] mb-4">Office Locations</h3>
                <div className="space-y-4">
                  {contactInfo.offices.map((o) => (
                    <div key={o.city} className="flex items-start gap-3">
                      <MapPin size={15} className="text-[#1E5BFF] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[#0F172A] text-sm font-semibold">{o.city} Office</p>
                        <p className="text-[#64748B] text-xs leading-relaxed mt-0.5">{o.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connect section */}
              <div className="rounded-2xl p-6" style={{ background: "#07111F" }}>
                <h3 className="font-bold text-white mb-4">Connect With Us</h3>
                <div className="space-y-3">
                  <a
                    href={contactInfo.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:opacity-90"
                    style={{ background: "#25D366" }}
                  >
                    <MessageCircle size={17} className="text-white flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm font-semibold leading-none">WhatsApp</p>
                      <p className="text-green-100 text-xs mt-0.5">Chat with us directly</p>
                    </div>
                  </a>
                  <a
                    href={contactInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-[#0A66C2]/40 transition-all"
                  >
                    <Linkedin size={17} className="text-[#0A66C2] flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm font-semibold leading-none">LinkedIn</p>
                      <p className="text-[#64748B] text-xs mt-0.5">AICORE Technologies Limited</p>
                    </div>
                  </a>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-[#1E5BFF]/40 transition-all"
                  >
                    <Mail size={17} className="text-[#1E5BFF] flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm font-semibold leading-none">Email</p>
                      <p className="text-[#64748B] text-xs mt-0.5">{contactInfo.email}</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Company Profile Download */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6">
                <h3 className="font-bold text-[#0F172A] mb-3 text-sm">Company Profile</h3>
                <p className="text-[#475569] text-xs leading-relaxed mb-4">
                  Download our company profile for a full overview of our services, products, and track record.
                </p>
                <a
                  href="/company-profile"
                  data-testid="btn-download-profile-contact"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90 w-full justify-center"
                  style={{ background: "#1E5BFF" }}
                >
                  <Download size={13} aria-hidden="true" />
                  Download Company Profile
                </a>
              </div>

              {/* What happens next */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6">
                <h3 className="font-bold text-[#0F172A] mb-4 text-sm">What Happens Next?</h3>
                <div className="space-y-3">
                  {[
                    "We review your enquiry within 1 business day",
                    "A technical team member contacts you to discuss scope",
                    "We recommend the right solution for your needs",
                    "We propose a clear scope, timeline, and next steps",
                  ].map((item, i) => (
                    <div key={item} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#1E5BFF]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#1E5BFF] text-xs font-bold">{i + 1}</span>
                      </div>
                      <p className="text-[#64748B] text-xs leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={contactFaqs} />

      <Footer />
    </div>
  );
}
