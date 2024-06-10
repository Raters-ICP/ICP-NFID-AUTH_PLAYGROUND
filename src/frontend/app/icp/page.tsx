"use client";

import { Playground } from "./Playground";
import Link from "next/link";

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-24 p-24">
      <div className="flex flex-row gap-1">
        <div>ICP test playground or</div>
        <Link href={"/"} className="text-blue-500">
          NFID playground
        </Link>
      </div>
      <Playground />
    </main>
  );
}
