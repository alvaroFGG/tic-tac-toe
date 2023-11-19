import React from "react";
import { T } from "@/text";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="w-100 d-flex flex-column align-items-center justify-content-center p-3">
      <h1 className="fw-bold heading-s">🔵 {T.TIC_TAC_TOE} ❌</h1>

      <div className="d-flex gap-2">
        <Link
          href="/"
          className={`text-decoration-none px-2 py-1 ${
            router.asPath === "/" && "bg-white rounded-2"
          }`}
        >
          {T.HOME}
        </Link>
        <Link
          href="/classification"
          className={`text-decoration-none px-2 py-1 ${
            router.asPath === "/classification" && "bg-white rounded-2"
          }`}
        >
          {T.CLASSIFICATION}
        </Link>
      </div>
    </header>
  );
};
