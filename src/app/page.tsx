import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const mockImages = await db.query.images.findMany();

  console.log("mockImages", mockImages);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.key} className="w-48">
            <Link href={`/image/${image.key}`}>
              <img src={image.url} alt={image.name} />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
