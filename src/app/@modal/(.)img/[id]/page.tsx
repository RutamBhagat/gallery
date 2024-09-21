import Image from "next/image";
import { Modal } from "~/components/modal";
import { getImage } from "~/server/queries/images";

type Props = {
  params: { id: string };
};

export default async function PhotoModal({ params: { id: photoId } }: Props) {
  const idAsNumber = parseInt(photoId);
  if (isNaN(idAsNumber)) throw new Error("Invalid photo id");
  const image = await getImage(idAsNumber);

  return (
    <Modal>
      <Image
        className="max-h-dvh max-w-7xl flex-grow"
        src={image.url}
        alt={image.name}
        width={1000}
        height={1000}
        style={{ objectFit: "contain" }}
      />
    </Modal>
  );
}
