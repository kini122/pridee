import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  type: z.string().min(1, "Select an event type"),
  date: z.string().optional(),
  attendees: z.string().optional(),
  message: z.string().min(10, "Tell us a bit more about your event"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactFooter() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    reset();
  };

  return (
    <section
      id="contact"
      className="bg-black text-white py-[120px] px-[40px] snap-start"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[80px]">
        {/* Left info */}
        <div>
          <h2 className="text-[clamp(32px,4.5vw,56px)] font-serif tracking-[-0.04em] mb-8">
            Let's Start Planning
          </h2>
          <p className="text-white/80 text-[18px] leading-[1.7] max-w-[450px] mb-12">
            Ready to create an unforgettable event? Get in touch with our team
            to start your journey.
          </p>

          <ul className="space-y-8">
            {[
              { label: "Email", value: "hello@prideevents.com" },
              { label: "Phone", value: "+1 (555) 123-4567" },
              {
                label: "Address",
                value: "123 Event Plaza, Suite 100, New York, NY 10001",
              },
              { label: "Hours", value: "Monday - Friday, 9AM - 6PM EST" },
            ].map((c) => (
              <li key={c.label} className="flex items-start gap-4">
                <span className="w-12 h-12 rounded-full bg-white/10 grid place-items-center">
                  <span className="w-6 h-6 rounded-full border border-white/30" />
                </span>
                <div>
                  <div className="text-[14px] uppercase tracking-[1.4px] text-white/50">
                    {c.label}
                  </div>
                  <div className="text-[18px]">{c.value}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex gap-3">
            {["in", "ig", "x", "fb"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="w-11 h-11 rounded-full border border-white/20 grid place-items-center text-white/60 hover:bg-white hover:text-black transition"
              >
                <span className="w-5 h-5 rounded-sm bg-current" />
              </a>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 backdrop-blur-md">
          {!submitted ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Full Name" error={errors.name?.message}>
                  <input
                    {...register("name")}
                    required
                    className="w-full px-4 py-4 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email Address" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    required
                    className="w-full px-4 py-4 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Phone Number" error={errors.phone?.message}>
                  <input
                    {...register("phone")}
                    className="w-full px-4 py-4 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Optional"
                  />
                </Field>
                <Field label="Company Name" error={errors.company?.message}>
                  <input
                    {...register("company")}
                    className="w-full px-4 py-4 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Optional"
                  />
                </Field>
                <Field label="Event Type" error={errors.type?.message}>
                  <select
                    {...register("type")}
                    required
                    className="w-full px-4 py-4 bg-white/5 border border-white/15 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <option value="">Select type</option>
                    <option>Conference</option>
                    <option>Gala</option>
                    <option>Product Launch</option>
                    <option>Team Building</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field label="Event Date" error={errors.date?.message}>
                  <input
                    {...register("date")}
                    type="date"
                    className="w-full px-4 py-4 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </Field>
                <Field
                  label="Expected Attendees"
                  error={errors.attendees?.message}
                >
                  <input
                    {...register("attendees")}
                    className="w-full px-4 py-4 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="e.g. 300"
                  />
                </Field>
              </div>
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  {...register("message")}
                  rows={4}
                  required
                  className="w-full px-4 py-4 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Tell us about your event vision"
                />
              </Field>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 px-6 py-4 bg-white text-black rounded-md font-medium transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          ) : (
            <div className="text-center py-10">
              <div className="mx-auto w-16 h-16 rounded-full border-2 border-white grid place-items-center mb-6 animate-pulse">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="#fff"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-[22px]">
                Thank you! We'll be in touch within 24 hours.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-[120px] border-t border-white/10 pt-10">
        <div className="max-w-[1200px] mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-[32px] font-serif tracking-[-0.04em] mb-2">
              Pride Events
            </div>
            <p className="text-white/60 max-w-[280px]">
              Transforming visions into unforgettable corporate experiences
              since 2009.
            </p>
          </div>
          <div>
            <div className="text-[14px] uppercase tracking-[1.4px] text-white/50 mb-3">
              Quick Links
            </div>
            <ul className="space-y-3 text-white/70">
              {[
                ["About Us", "#about"],
                ["Our Services", "#services"],
                ["Portfolio", "#portfolio"],
                ["Testimonials", "#testimonials"],
                ["Our Process", "#process"],
                ["Contact Us", "#contact"],
                ["Careers", "#careers"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[14px] uppercase tracking-[1.4px] text-white/50 mb-3">
              Services
            </div>
            <ul className="space-y-3 text-white/70">
              {[
                "Corporate Conferences",
                "Gala Celebrations",
                "Product Launches",
                "Team Building",
                "Award Ceremonies",
                "Executive Retreats",
                "Virtual Events",
              ].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[14px] uppercase tracking-[1.4px] text-white/50 mb-3">
              Stay Updated
            </div>
            <p className="text-white/60 mb-3 text-[14px]">
              Subscribe to get event planning tips and industry insights.
            </p>
            <form className="flex flex-col gap-2 max-w-md">
              <input
                className="flex-1 px-3 py-3 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Your email"
              />
              <button className="w-full px-4 py-3 bg-white text-black rounded-md font-medium hover:scale-[1.05] transition-transform">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/50 text-[14px]">
          <div>© 2025 Pride Events. All rights reserved.</div>
          <div className="flex gap-6 flex-wrap">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Cookie Policy",
              "Accessibility",
            ].map((l) => (
              <a key={l} href="#" className="hover:text-white/80">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col mb-3">
      <label className="mb-2 text-[14px] uppercase tracking-[1.4px] text-white/60">
        {label}
      </label>
      {children}
      {error ? (
        <span className="mt-1 text-[14px] text-[rgba(255,100,100,1)]">
          {error}
        </span>
      ) : null}
    </div>
  );
}
