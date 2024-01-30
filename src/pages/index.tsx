import Calculator from "@/components/calculator";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">YADEC!</h1>
        <h3 className="text-2xl mb-4">Yet Another Delivery Calculator</h3>
      </div>
      <Calculator />
    </main>
  )
}