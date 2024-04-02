// app/page.tsx
import TestPaymentCard from "./components/TestPaymentCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-center text-4xl font-bold my-10">Pricing </h1>
        <TestPaymentCard />
      </div>
    </main>
  );
}
