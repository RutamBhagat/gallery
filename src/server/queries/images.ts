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
