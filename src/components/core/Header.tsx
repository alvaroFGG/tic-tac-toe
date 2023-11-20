import React from "react";
import { T } from "@/text";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-100 d-flex flex-column align-items-center justify-content-center p-3">
      <h1 className="fw-bold heading-s">🔵 {T.TIC_TAC_TOE} ❌</h1>

      <div className="d-flex gap-2">
        <Link
          href="/"
          className={`text-decoration-none px-2 py-1 ${
            pathname === "/" && "bg-white rounded-2"
          }`}
        >
          {T.HOME}
        </Link>

        <Link
          href="/classification"
          className={`text-decoration-none px-2 py-1 ${
            pathname === "/classification" && "bg-white rounded-2"
          }`}
        >
          {T.CLASSIFICATION}
        </Link>
      </div>
    </header>
  );
};
