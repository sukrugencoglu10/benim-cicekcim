"use client";

import { useState } from "react";
import { ArrowRight } from "./Icons";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div>
      <h3 className="font-serif text-2xl font-semibold text-ink">BÜLTEN!</h3>
      <p className="mt-2 text-sm text-muted">
        Bültenimize kaydolun, ilk siparişinizde %15 indirim kazanın.
      </p>

      {done ? (
        <p className="mt-4 rounded-md bg-brand-soft px-4 py-3 text-sm text-brand-dark">
          Teşekkürler! Kaydınız alındı. 🌸
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setDone(true);
          }}
          className="mt-4 flex overflow-hidden rounded-full border border-line bg-white"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta adresiniz"
            className="w-full bg-transparent px-4 py-3 text-sm text-ink outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            aria-label="Kaydol"
            className="flex w-14 shrink-0 items-center justify-center bg-brand text-white transition-colors hover:bg-brand-dark"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
