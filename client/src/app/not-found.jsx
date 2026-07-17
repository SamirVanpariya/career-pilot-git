"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0000] px-6">
      <div className="max-w-xl text-center">
        {/* 404 */}
        <h1 className="text-8xl font-extrabold tracking-tight text-white md:text-9xl">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-6 text-3xl font-bold text-white">Page Not Found</h2>

        {/* Description */}
        <p className="mt-4 text-lg leading-8 text-slate-400">
          Sorry, the page you're looking for doesn't exist, has been moved, or
          the URL might be incorrect.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-xl border border-slate-700 px-6 py-3 font-medium text-slate-300 transition-all duration-300 hover:border-slate-500 hover:bg-slate-800"
          >
            Go Back
          </button>
        </div>

        {/* Decorative circle */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      </div>
    </main>
  );
}
