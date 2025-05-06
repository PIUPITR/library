"use client";

import { useState, FormEvent } from "react";

export default function ContactsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    if (!feedback.trim()) {
      setError("Feedback message cannot be empty.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          feedback: feedback.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit feedback.");
      }

      setSuccess("Thank you for your feedback!");
      setName("");
      setEmail("");
      setFeedback("");
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">
        Contact us & feedback
      </h1>
      <p className="mb-6 text-gray-300">
        We would love to hear from you! Whether you have a question, suggestion,
        or just want to share your thoughts about our library website, please
        use the form below.
      </p>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-lg bg-gray-800 p-8 rounded-lg shadow-xl"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-200"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-base bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-200"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-base bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-200"
          >
            Feedback <span className="text-red-400">*</span>
          </label>
          <textarea
            id="feedback"
            name="feedback"
            rows={5}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            className="input-base bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Your feedback, suggestions, or questions..."
          ></textarea>
        </div>

        {error && (
          <p className="text-red-400 text-sm p-3 bg-red-900/50 rounded-md">
            Error: {error}
          </p>
        )}
        {success && (
          <p className="text-green-400 text-sm p-3 bg-green-900/50 rounded-md">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white no-underline transition-colors ${
            submitting
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          }`}
        >
          {submitting ? "Submitting..." : "Send Feedback"}
        </button>
      </form>
    </div>
  );
}
