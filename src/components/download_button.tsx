"use client";

import { Download, Loader2 } from "lucide-react";

import { Button } from "./ui/button";
import { TImagesSelect } from "~/server/db/schema";
import { useState } from "react";

type Props = {
  image: TImagesSelect;
};

function DownloadButton({ image }: Props) {
  const [loading, setLoading] = useState(false);

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
  );
}

export default DownloadButton;
