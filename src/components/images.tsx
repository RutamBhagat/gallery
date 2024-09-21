import React from "react";
import ResponsiveMasonryGrid from "./responsiveMasonry";
import { getMyImages } from "~/server/queries/images";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <ResponsiveMasonryGrid imageArray={images} />
    </div>
  );
}

export default Images;
