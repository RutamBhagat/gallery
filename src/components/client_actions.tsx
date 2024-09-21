"use client";

import { Copy, Download, Loader2, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {
  image: {
    name: string;
    url: string;
  };
};

function ClientActions({ image }: Props) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = image.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        className="w-full"
        variant="outline"
        onClick={handleDownload}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Download className="mr-2 h-4 w-4" />
        )}
        {loading ? "Downloading..." : "Download"}
      </Button>
      <Button className="w-full" variant="outline" onClick={handleCopy}>
        {copied ? (
          <Copy className="mr-2 h-4 w-4" />
        ) : (
          <Share2 className="mr-2 h-4 w-4" />
        )}
        {copied ? "Copied" : "Share"}
      </Button>
    </div>
  );
}

export default ClientActions;
