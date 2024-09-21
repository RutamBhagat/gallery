import { db } from "../db";
import { images } from "../db/schema";
import { mockImages } from "../mock/mockImages";

const main = async () => {
  console.log("Seed start");

  try {
    for (const image of mockImages) {
      await db.insert(images).values(image);
    }

    console.log("Seed done");
  } catch (error) {
    console.error("Error seeding database:", error);
  }

  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
