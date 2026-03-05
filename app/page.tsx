"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">
      <section className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-10 shadow-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-400">
          Gifted
        </p>
        <h1 className="text-4xl font-semibold leading-tight">
          Secure workspace access for approved users
        </h1>
        <p className="mt-4 text-lg text-zinc-300">
          Sign in with your provider. New accounts are created as pending until
          approved by an admin.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/api/auth/signin?callbackUrl=%2Fdashboard"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            Continue to Sign In
          </Link>
        </div>
      </section>
    </main>
  );
}
