import { T } from "@/text";
import { getclassification } from "@/services";
import { classification, TURNS } from "@/types";
import React, { useEffect, useState } from "react";

const BoardPage = () => {
  const [classification, setclassification] = useState<classification>();

  const fetchclassification = async () => {
    const response = await getclassification();

    if (response) {
      setclassification(response);
    }
  };

  useEffect(() => {
    fetchclassification();
  }, []);

  return (
    <div className="mx-auto p-2" style={{ maxWidth: "600px" }}>
      <div>
        <div className="w-100 d-flex justify-content-between p-3 fw-bold">
          <span>{T.PLAYER}</span>

          <span>{T.VICTORIES}</span>
        </div>
      </div>

      <div
        className="mx-auto w-100 d-flex flex-column rounded-4 overflow-hidden"
        style={{ gap: "2px" }}
      >
        <div className="d-flex justify-content-between bg-white p-3">
          <span>{TURNS.X}</span>

          <span className="text-l">{classification?.XMatches.length}</span>
        </div>

        <div className="d-flex justify-content-between bg-white p-3">
          <span>
            {TURNS.O} <span className="text-xs">(IA)</span>
          </span>

          <span className="text-l">{classification?.OMatches.length}</span>
        </div>

        <div className="d-flex justify-content-between bg-white p-3">
          <span>{T.DRAWS}</span>

          <span className="text-l">{classification?.drawMatches.length}</span>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
