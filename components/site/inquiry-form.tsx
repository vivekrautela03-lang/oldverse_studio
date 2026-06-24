"use client";

import { startTransition, useState } from "react";

import { Button } from "@/components/ui/button";
import { budgetOptions, projectTypes } from "@/lib/data";
import { cn } from "@/lib/utils";

const initialForm = {
  name: "",
  email: "",
  projectType: projectTypes[0],
  budget: budgetOptions[0],
  message: ""
};

type InquiryFormState = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

type StatusState =
  | {
      type: "success" | "error";
      message: string;
    }
  | null;

export function InquiryForm() {
  const [formData, setFormData] = useState<InquiryFormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<StatusState>(null);

  const fieldClasses =
    "w-full rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-cream outline-none transition focus:border-white/25 focus:bg-white/10 focus:ring-2 focus:ring-white/10";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to send your inquiry right now.");
      }

      startTransition(() => {
        setStatus({
          type: "success",
          message: data.message ?? "Your inquiry has been sent successfully."
        });
        setFormData(initialForm);
      });
    } catch (error) {
      startTransition(() => {
        setStatus({
          type: "error",
          message: error instanceof Error ? error.message : "Something went wrong while sending your inquiry."
        });
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-[2rem] border border-white/10 p-6 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.32em] text-cream/55">Name</span>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={(event) => setFormData((state) => ({ ...state, name: event.target.value }))}
            className={fieldClasses}
            placeholder="Your name"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.32em] text-cream/55">Email</span>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={(event) => setFormData((state) => ({ ...state, email: event.target.value }))}
            className={fieldClasses}
            placeholder="you@example.com"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.32em] text-cream/55">Project Type</span>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={(event) => setFormData((state) => ({ ...state, projectType: event.target.value }))}
            className={fieldClasses}
          >
            {projectTypes.map((projectType) => (
              <option key={projectType} value={projectType} className="bg-[#211916]">
                {projectType}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.32em] text-cream/55">Budget</span>
          <select
            name="budget"
            value={formData.budget}
            onChange={(event) => setFormData((state) => ({ ...state, budget: event.target.value }))}
            className={fieldClasses}
          >
            {budgetOptions.map((budget) => (
              <option key={budget} value={budget} className="bg-[#211916]">
                {budget}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block space-y-2">
        <span className="text-xs uppercase tracking-[0.32em] text-cream/55">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          value={formData.message}
          onChange={(event) => setFormData((state) => ({ ...state, message: event.target.value }))}
          className={cn(fieldClasses, "resize-none")}
          placeholder="Tell us about your story, format, timelines, and creative direction."
        />
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-7 text-cream/60">We typically reply within 24 to 48 hours.</p>
        <Button type="submit" disabled={submitting} className="w-full justify-center sm:w-auto disabled:cursor-not-allowed disabled:opacity-70">
          {submitting ? "Sending..." : "Send Inquiry"}
        </Button>
      </div>

      {status ? (
        <div
          className={cn(
            "mt-5 rounded-[1.25rem] border px-4 py-3 text-sm",
            status.type === "success"
              ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
              : "border-rose-300/20 bg-rose-300/10 text-rose-100"
          )}
        >
          {status.message}
        </div>
      ) : null}
    </form>
  );
}
