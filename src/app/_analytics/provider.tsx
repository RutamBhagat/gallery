// app/providers.js
"use client";

import { useAuth, useUser } from "@clerk/nextjs";

import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
  });
}

type Props = {
  children: React.ReactNode;
};

export function CSPostHogProvider({ children }: Props) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export function PostHogAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const userInfo = useUser();
  useEffect(() => {
    if (userInfo.user) {
      posthog.identify(userInfo.user.id, {
        email: userInfo.user.emailAddresses[0]?.emailAddress,
        name: userInfo.user.firstName,
      });
    } else if (!auth.isSignedIn) {
      posthog.reset();
    }
  }, [auth, userInfo]);
  return children;
}
