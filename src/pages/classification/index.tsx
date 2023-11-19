import { T } from "@/text";
import { getclassification } from "@/services";
import { classification, TURNS } from "@/types";
import React, { useEffect, useState } from "react";
import { ClassificationRow } from "@/components/classification/ClassificationRow";

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

  if (!classification) return <></>;
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
        <ClassificationRow
          player={TURNS.X}
          victories={classification.XMatches.length}
        />

        <ClassificationRow
          player={`${TURNS.O} (IA)`}
          victories={classification.OMatches.length}
        />

        <ClassificationRow
          player={T.DRAWS}
          victories={classification.drawMatches.length}
        />
      </div>
    </div>
  );
};

export default BoardPage;
