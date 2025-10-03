'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Algo salió mal</h2>
        <p className="text-gray-500 mt-2">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}
