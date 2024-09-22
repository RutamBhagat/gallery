import "server-only";

import { TImagesSelect, images } from "../db/schema";
import { and, eq } from "drizzle-orm";

import analyticsServerClient from "../analytics/posthog_analytics";
import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getMyImages(): Promise<TImagesSelect[]> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.uploadedAt),
  });
}

export async function getImage(id: number): Promise<TImagesSelect | null> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) {
    return null;
  }

  if (image?.userId !== user.userId) throw new Error("Unauthorized");
  return image;
}

export async function deleteImage(id: number): Promise<void> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete_image",
    properties: {
      imageId: id,
    },
  });

  revalidatePath("/");
  redirect("/");
}
