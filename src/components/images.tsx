import Link from "next/link";
import React from "react";
import { db } from "~/server/db";

async function Images() {
  const mockImages = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.uploadedAt),
  });

  console.log("mockImages", mockImages);
  return (
    <div className="flex flex-wrap gap-4">
      {[...mockImages, ...mockImages, ...mockImages, ...mockImages].map(
        (image) => (
          <div key={image.key} className="w-48">
            <Link href={`/image/${image.key}`}>
              <img src={image.url} alt={image.name} />
            </Link>
          </div>
        ),
      )}
    </div>
  );
}

export default Images;
