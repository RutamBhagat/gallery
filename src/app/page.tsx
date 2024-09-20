import Link from "next/link";
import { mockImages } from "~/server/mock/selected-rows";

export const dynamic = "force-dynamic";

export default function HomePage() {
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
