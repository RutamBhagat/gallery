import { SignedIn, SignedOut } from "@clerk/nextjs";

import Images from "~/components/images";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Unauthorized
          </h1>
          <p className="mt-3 text-xl text-muted-foreground">
            Please sign in to view the gallery.
          </p>
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
