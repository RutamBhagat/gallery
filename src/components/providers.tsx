import { CSPostHogProvider } from "~/app/_analytics/provider";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(ourFileRouter)}
      />
      <ClerkProvider>
        <CSPostHogProvider>{children}</CSPostHogProvider>
      </ClerkProvider>
    </>
  );
}

export default Providers;
