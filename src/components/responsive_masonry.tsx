"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { SkeletonCard } from "./skeleton_card";
import { TImagesSelect } from "~/server/db/schema";
import dynamic from "next/dynamic";

const ResponsiveMasonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry),
  { ssr: false },
);
const Masonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.default),
  { ssr: false },
);

type Props = {
  imageArray: TImagesSelect[];
};

function ResponsiveMasonryGrid({ imageArray }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3, 1200: 4, 1600: 5 }}
    >
      <Masonry gutter="4px">{renderContent({ isMounted, imageArray })}</Masonry>
    </ResponsiveMasonry>
  );
}

const renderContent = ({
  isMounted,
  imageArray,
}: {
  isMounted: boolean;
  imageArray: TImagesSelect[];
}) => {
  if (!isMounted) {
    // Render skeleton cards while loading
    return Array.from({ length: imageArray.length }).map((_, index) => (
      <SkeletonCard key={`skeleton-${index}`} />
    ));
  }

  return imageArray.map((image) => (
    <Link key={image.key} href={`/img/${image.id}`}>
      <Image
        src={image.url}
        alt={image.name}
        width={400}
        height={400}
        style={{ objectFit: "contain" }}
      />
    </Link>
  ));
};

export default ResponsiveMasonryGrid;
