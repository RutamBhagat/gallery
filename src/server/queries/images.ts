import "server-only";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { images } from "../db/schema";

export async function getMyImages(): Promise<(typeof images.$inferInsert)[]> {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.uploadedAt),
  });
}
