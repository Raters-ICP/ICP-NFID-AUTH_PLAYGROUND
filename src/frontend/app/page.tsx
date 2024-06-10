"use client";
import Link from "next/link";
import { Playground } from "./Playground";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-24 p-24">
      <div className="flex flex-row gap-1">
        <div>NFID test playground or</div>
        <Link href={"/icp"} className="text-blue-500">
          ICP playground
        </Link>
      </div>
      <Playground />
    </main>
  );
}
