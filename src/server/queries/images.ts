import "server-only";

import { TImagesSelect } from "../db/schema";
import { auth } from "@clerk/nextjs/server";
import { db } from "../db";

export async function getMyImages(): Promise<TImagesSelect[]> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.uploadedAt),
  });
}

export async function getImage(id: number): Promise<TImagesSelect> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");
  return image as TImagesSelect;
}
