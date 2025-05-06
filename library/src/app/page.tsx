import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Book Library</h1>
      <p className="text-lg mb-8">
        Manage your book collection easily. Browse, add, update, or delete
        books.
      </p>
      <Image
        src="/book.jpg" // Placeholder - replace with an actual relevant image
        alt="Library Banner"
        width={600}
        height={300}
        priority
        className="rounded shadow-lg"
        // Add placeholder image or remove if not available
        style={{ display: "none" }} // Hide if no image available yet
      />
      {/* You can add more introductory elements here */}
    </div>
  );
}
