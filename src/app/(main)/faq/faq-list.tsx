import { ChevronDown } from "lucide-react";

import { Container } from "@/components/ui";

/**
 * FAQ content — adapted from TEAM AUTOPRO's real, live FAQ page (NEO
 * Energy's parent business). Adapted, not copy-pasted: answers naming a
 * specific TeamAuto-branded program (a named app, a specific emergency
 * phone line, a specific numbered "engine protection plan") route to NEO's
 * own confirmed channels instead — see `siteConfig.whatsappNumber` — rather
 * than publish a number or program that isn't actually NEO's. The last
 * entry is NEO-specific, not from the source FAQ, since EV battery work is
 * NEO's own core business the source page doesn't cover.
 */
const FAQS: { question: string; answer: string }[] = [
  {
    question: "What services do you offer?",
    answer:
      "EV battery engineering and technology — component-level repair, maintenance, diagnostics, and full battery systems — plus general workshop services: accident repairs, vehicle inspection, insurance claims, spray painting, aircon repair, wheel alignment, brake repair, car batteries, tyres, and fleet management.",
  },
  {
    question: "What are your operating hours?",
    answer:
      "Monday to Friday, 9:30 AM to 6:00 PM, and Saturday 9:30 AM to 5:00 PM. Closed on Sundays and public holidays.",
  },
  {
    question: "Do I need an appointment?",
    answer: "Walk-ins are welcome, but we recommend booking an appointment ahead to cut down your wait time.",
  },
  {
    question: "How do I book a service?",
    answer: "Message us on WhatsApp, or send an enquiry through our Contact page — whichever's easier for you.",
  },
  {
    question: "What should I bring for my appointment?",
    answer:
      "Your vehicle, any relevant documents (service history or warranty paperwork), and a note of the specific issues you've noticed.",
  },
  {
    question: "Is there a warranty on repairs?",
    answer:
      "Spare parts used in our repairs come with a standard 6-month warranty. Ask our team about extended protection plans available on qualifying service packages.",
  },
  {
    question: "Will I get an estimate before work begins?",
    answer: "Yes — we provide a detailed estimate before starting any work.",
  },
  {
    question: "Do you offer roadside assistance?",
    answer: "Yes — message us on WhatsApp any time and we'll coordinate getting to you.",
  },
  {
    question: "What's your returns/refund policy?",
    answer:
      "We don't offer returns or refunds on parts, but a faulty item will be exchanged one-to-one.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "Cash, credit and debit cards, and mobile payments.",
  },
  {
    question: "My check-engine light is on — what should I do?",
    answer:
      "Book an appointment soon rather than waiting — our technicians will run a diagnostic and recommend what's actually needed.",
  },
  {
    question: "How often should I change my engine oil?",
    answer:
      "Generally every 8,000–10,000 km, though it depends on your vehicle and driving conditions. Check your owner's manual or ask our technicians.",
  },
  {
    question: "Do you offer pre-purchase or pre-inspection checks?",
    answer:
      "Yes — a Pre-Purchase Vehicle Inspection before you buy a used vehicle, and an LTA Pre-Vehicle Inspection before your official LTA inspection.",
  },
  {
    question: "What's your cancellation policy?",
    answer: "Let us know at least 24 hours in advance if you need to cancel or reschedule.",
  },
  {
    question: "Do you have any ongoing promotions?",
    answer: "Yes, regularly — check our Promo page for what's currently live.",
  },
  {
    question: "I'm not sure what's wrong with my vehicle — what should I do?",
    answer: "Book an appointment for a diagnostic scan and we'll identify it from there.",
  },
  {
    question: "Do you work on EV batteries specifically, not just general auto repair?",
    answer:
      "Yes — that's our core specialisation. Component-level repair, cell- and pack-level diagnostics, and full battery systems, tested against GB 38031-2020 and manufacturer tolerances. See our Services menu for the full breakdown.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-border border-b py-5">
      <summary className="ease-engineered flex cursor-pointer list-none items-center justify-between gap-4 font-mono text-sm font-semibold tracking-[0.02em] text-foreground uppercase [&::-webkit-details-marker]:hidden">
        {question}
        <ChevronDown
          aria-hidden="true"
          className="ease-engineered h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-180"
        />
      </summary>
      <p className="font-body text-muted mt-4 text-sm leading-relaxed">{answer}</p>
    </details>
  );
}

export function FaqList() {
  return (
    <section className="bg-void relative py-16 lg:py-24">
      <Container size="narrow">
        {FAQS.map((faq) => (
          <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </Container>
    </section>
  );
}
