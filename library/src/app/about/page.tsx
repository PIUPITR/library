"use client"; // Required for react-bootstrap components

export default function AboutPage() {
  return (
    <div>
      {/* Using Tailwind for heading */}
      <h1 className="text-3xl font-bold mb-4 text-white">About Our Library</h1>

      {/* Using Tailwind for paragraph styling */}
      <p className="mb-4 text-white">
        Welcome to our library online portal. Here you can browse our collection
        of books, find information about our services, and discover new reads.
        Our mission is to provide easy access to knowledge and foster a love for
        reading within the community.
      </p>
    </div>
  );
}
