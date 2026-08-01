"use client";

import { useState, type FormEvent } from "react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Button, Heading } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * ContactForm — a real enquiry form with nowhere on the backend to send to
 * yet. Rather than a form that silently does nothing (or a fake "Thank you"
 * that sent no message anywhere), submitting builds a `mailto:` link from
 * the fields and hands off to the visitor's own email client — the same
 * mechanism every "Request Assessment" button on this site already relies on
 * (see `siteConfig.contactEmail`), just assembled from what they typed instead
 * of a fixed subject line. Genuinely functional today; swap this handler for
 * a real API route the moment one exists.
 */
const inputClass =
  "border-border bg-graphite/40 text-foreground placeholder:text-muted ease-engineered w-full rounded-md border px-4 py-3 text-sm transition-colors duration-300 focus:border-ion focus:bg-background focus:outline-none";

const labelClass = "text-label-sm font-mono";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = `Enquiry from ${name}`;
    const body = [
      message,
      "",
      "—",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="border-border bg-background rounded-[22px] border p-6 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.14)] lg:p-10">
      <RevealWrapper variant="blur">
        <Heading as="h3" size="h4" className="mb-6 uppercase">
          Send An Enquiry
        </Heading>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.1}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className={labelClass}>
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={inputClass}
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className={labelClass}>
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputClass}
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-phone" className={labelClass}>
              Phone <span className="normal-case opacity-60">(optional)</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={inputClass}
              placeholder="+65 XXXX XXXX"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className={labelClass}>
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={`${inputClass} resize-none`}
              placeholder="Tell us about your battery system, fleet, or enquiry."
            />
          </div>

          <Button type="submit" variant="primary" className="w-full sm:w-fit">
            Send Enquiry
          </Button>
        </form>
      </RevealWrapper>
    </div>
  );
}
