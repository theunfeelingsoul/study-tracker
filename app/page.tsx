import Navigation from "@/app/components/Navigation";

export default function Home() {
  return (
    <main className="w-full max-w-2xl mx-auto p-4">
      <Navigation />

      <h1 className="text-3xl font-bold mt-8">Kanji Study Tracker</h1>

      <p className="mt-4 text-gray-600">
        Welcome! Choose an option from the navigation above.
      </p>
    </main>
  );
}