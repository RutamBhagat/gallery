"use client";

import { Copy, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import { TImagesSelect } from "~/server/db/schema";

type Props = {
  image: TImagesSelect;
};

function ShareButton({ image }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = async () => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(window.location.href);
    } else {
      document.execCommand("copy", true, window.location.href);
    }
    setCopied(true);
  };

  return (
    <Button className="w-full" variant="outline" onClick={handleCopy}>
      {copied ? (
        <Copy className="mr-2 h-4 w-4" />
      ) : (
        <Share2 className="mr-2 h-4 w-4" />
      )}
      {copied ? "Copied" : "Share"}
    </Button>
  );
}

export default ShareButton;
