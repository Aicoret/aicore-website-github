type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title?: string;
  items: FAQItem[];
};

export function FAQSection({ title = "Frequently Asked Questions", items }: FAQSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-8">{title}</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item) => (
            <div key={item.question} className="rounded-2xl border border-slate-300 bg-slate-50 shadow-sm p-6">
              <h3 className="font-bold text-[#0F172A] mb-3">{item.question}</h3>
              <p className="text-[#475569] text-sm leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
