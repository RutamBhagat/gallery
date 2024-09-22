import { Button } from "./ui/button";
import DownloadButton from "./download_button";
import ShareButton from "./share_button";
import { TImagesSelect } from "~/server/db/schema";
import { Trash2 } from "lucide-react";
import { deleteImage } from "~/server/queries/images";

type Props = {
  image: TImagesSelect;
};

function ImageClientActions({ image }: Props) {
  return (
    <div className="space-y-2">
      <DownloadButton image={image} />
      <ShareButton image={image} />
      <form
        action={async () => {
          "use server";

          await deleteImage(image.id);
        }}
      >
        <Button className="w-full" variant="destructive" type="submit">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </form>
    </div>
  );
}

export default ImageClientActions;
