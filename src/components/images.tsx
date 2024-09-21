import Link from "next/link";
import React from "react";
import { getMyImages } from "~/server/queries/images";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.key} className="w-48">
          <Link href={`/image/${image.key}`}>
            <img src={image.url} alt={image.name} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Images;
