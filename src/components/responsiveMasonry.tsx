"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import Image from "next/image";
import { TImagesSelect } from "~/server/db/schema";

type Props = {
  imageArray: TImagesSelect[];
};

function ResponsiveMasonryGrid({ imageArray }: Props) {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3, 1200: 4, 1600: 5 }}
    >
      <Masonry gutter="4px">
        {imageArray.map((image) => (
          <Image
            key={image.key}
            src={image.url}
            alt={image.name}
            width={400}
            height={400}
            style={{ objectFit: "contain" }}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default ResponsiveMasonryGrid;
