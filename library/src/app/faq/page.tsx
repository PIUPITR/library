import React from "react";

const faqData = [
  {
    question: "How do I register at the library?",
    answer:
      "To register at the library, fill out the registration form on the website or contact the library administrator.",
  },
  {
    question: "How can I find a specific book?",
    answer:
      "Use the catalog search or ask a library staff member for assistance.",
  },
  {
    question: "Can I extend the return period for a book?",
    answer:
      "Yes, you can extend the return period through your personal account or by calling the library.",
  },
  {
    question: "What should I do if I lose a book?",
    answer:
      "Inform a library staff member about the loss and follow their instructions.",
  },
];

export default function FAQPage() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Frequently Asked Questions (FAQ)
      </h1>
      <ul className="space-y-4">
        {faqData.map((item, idx) => (
          <li key={idx} className="border rounded-lg p-4 bg-white shadow">
            <p className="font-semibold text-lg mb-2">{item.question}</p>
            <p className="text-gray-700">{item.answer}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
