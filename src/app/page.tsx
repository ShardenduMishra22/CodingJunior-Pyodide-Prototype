"use client"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="space-y-4">
        <button
          onClick={() => router.push('/Editor')}
          className="w-48 py-2 px-4 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
        >
          Go to Editor
        </button>
        <button
          onClick={() => router.push('/Turtle')}
          className="w-48 py-2 px-4 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 transition"
        >
          Go to Turtle
        </button>
      </div>
    </div>
  )
}
