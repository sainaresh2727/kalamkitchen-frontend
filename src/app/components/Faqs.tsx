"use client";

import { useState } from "react";

const faqs = [
  {
    id: 1,
    category: "General",
    question:
      "Are Kalam Kitchen Equipments reliable kitchen equipment manufacturers in Chennai?",
    answer:
      "Yes, we are among the trusted kitchen equipment manufacturers in Chennai, offering high-quality commercial kitchen equipment designed for durability, hygiene, and efficient food service operations. Our products meet industry standards and are trusted by hundreds of businesses across Tamil Nadu and beyond.",
  },
  {
    id: 2,
    category: "General",
    question:
      "Do you provide hotel kitchen equipment manufacturing services in Chennai?",
    answer:
      "Yes, we are experienced hotel kitchen equipment manufacturers in Chennai, supplying customized cooking, refrigeration, storage, and stainless steel fabrication solutions for hotels, restaurants, and catering businesses. Every solution is tailored to the client's operational needs and kitchen layout.",
  },
  {
    id: 3,
    category: "Installation",
    question: "What equipment is needed in a commercial kitchen?",
    answer:
      "Each commercial kitchen needs hand-washing stations, dishwashing equipment, an ice machine, a refrigerator, and a freezer. Obviously, numerous businesses will require more than that — cooking ranges, induction stoves, exhaust hoods, prep tables, and storage systems are also essential. We help you identify exactly what your kitchen needs based on your menu and volume.",
  },
  {
    id: 4,
    category: "Installation",
    question:
      "Where should you begin when selecting commercial kitchen equipment?",
    answer:
      "First, you have to decide your exact space details as well as your business's unique requirements. In smaller establishments, you can make the most of the kitchen by using all vertical space and investing in easy-to-move equipment. Keep in mind you will also need ample room for workers to move around safely and efficiently.",
  },
  {
    id: 5,
    category: "Pricing",
    question: "How might you save money on commercial kitchen equipment?",
    answer:
      "Start by deciding your exact space details and your business's specific requirements. In smaller establishments, maximize the kitchen by using vertical space and investing in versatile, easy-to-move gear. Choosing energy-efficient induction and electric systems can significantly reduce long-term operational costs. We also offer bulk pricing and flexible EMI options for larger projects.",
  },
];

const categories = ["All", "General", "Installation", "Pricing", "Service"];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  General: {
    bg: "bg-[#27A8A3]/10",
    text: "text-[#1E8E8A]",
    border: "border-[#27A8A3]/30",
  },
  Installation: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  Pricing: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
  },
  Service: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
};

export default function Faqs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState<number | null>(1);

  const filtered =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  const toggle = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <section className="bg-gradient-to-b from-white to-[#f0fafa] py-16 md:py-24 relative overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(39,168,163,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(39,168,163,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#27A8A3]/05 blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#4FD1CC]/05 blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10 container mx-auto px-4  flex flex-col gap-10">

        {/* ── Header ── */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#27A8A3]/10 border border-[#27A8A3]/25 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#27A8A3] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#27A8A3]">
              FAQ
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0d2828]">
            Got{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, #27A8A3 0%, #4FD1CC 50%, #1E8E8A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Questions?
            </span>{" "}
            We've Got Answers.
          </h2>

          <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">
            Everything you need to know about our kitchen equipment, installation process, warranties, and after-sales support.
          </p>
        </div>

        {/* ── Category filter tabs ── */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#27A8A3] to-[#1E8E8A] text-white border-transparent shadow-[0_8px_20px_rgba(39,168,163,0.3)]"
                  : "bg-white text-[#7aa8a8] border-[#d0eeee] hover:border-[#27A8A3] hover:text-[#27A8A3]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── FAQ accordion ── */}
        <div className="flex flex-col gap-3">
          {filtered.map((faq, index) => {
            const isOpen = openId === faq.id;
            const colors = categoryColors[faq.category];

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#27A8A3]/40 shadow-[0_12px_40px_rgba(39,168,163,0.12)]"
                    : "border-[#27A8A3]/12 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:border-[#27A8A3]/30 hover:shadow-[0_8px_24px_rgba(39,168,163,0.08)]"
                }`}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-start gap-4 px-6 py-5 text-left group"
                >
                  {/* Number */}
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                      isOpen
                        ? "bg-gradient-to-br from-[#27A8A3] to-[#1E8E8A] text-white"
                        : "bg-[#f5fbfb] text-[#27A8A3] border border-[#d0eeee] group-hover:bg-[#27A8A3]/10"
                    }`}
                  >
                    {String(faq.id).padStart(2, "0")}
                  </span>

                  <div className="flex-1 flex flex-col gap-1.5">
                    {/* Category badge */}
                    <span
                      className={`self-start text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {faq.category}
                    </span>
                    <p className={`text-sm md:text-base font-semibold leading-snug transition-colors duration-200 ${isOpen ? "text-[#27A8A3]" : "text-[#0d2828] group-hover:text-[#27A8A3]"}`}>
                      {faq.question}
                    </p>
                  </div>

                  {/* Chevron */}
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 mt-5 ${
                      isOpen
                        ? "bg-[#27A8A3]/10 text-[#27A8A3] rotate-180"
                        : "bg-[#f5fbfb] text-[#7aa8a8] border border-[#d0eeee] group-hover:border-[#27A8A3]/40 group-hover:text-[#27A8A3]"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 flex gap-4">
                    {/* Left teal line */}
                    <div className="flex-shrink-0 w-8 flex justify-center">
                      <div className="w-[2px] h-full rounded-full bg-gradient-to-b from-[#27A8A3] to-[#4FD1CC]/30" />
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="bg-gradient-to-br from-[#0d3232] to-[#0e3e3c] rounded-3xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#4FD1CC]/08 pointer-events-none" />
          <div className="absolute -bottom-6 left-1/3 w-24 h-24 rounded-full bg-[#27A8A3]/06 pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold text-white">
              Still have questions?
            </h3>
            <p className="text-sm text-white/50 max-w-sm">
              Our team is ready to help. Get in touch and we'll respond within 4 hours.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:+"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[#4FD1CC] border border-[#4FD1CC]/30 hover:bg-[#4FD1CC]/10 transition-all duration-200"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M13.5 10.5v2a1 1 0 01-1.09.997 14.85 14.85 0 01-6.474-2.303A14.63 14.63 0 012.303 7.56 14.85 14.85 0 01.003 1.09 1 1 0 011 0h2a1 1 0 011 .86 9.61 9.61 0 00.524 2.103 1 1 0 01-.225 1.055L3.245 5.06a10.9 10.9 0 004.698 4.697l1.042-1.054a1 1 0 011.055-.225c.68.25 1.389.42 2.103.525a1 1 0 01.857 1.017z" fill="currentColor" />
              </svg>
              Call Us
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#27A8A3] to-[#1E8E8A] shadow-[0_8px_20px_rgba(39,168,163,0.35)] hover:shadow-[0_12px_28px_rgba(39,168,163,0.5)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Send a Message
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
