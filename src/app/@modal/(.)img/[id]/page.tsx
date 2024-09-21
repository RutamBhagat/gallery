import FullImage from "~/components/full_image";
import { Modal } from "~/components/modal";

type Props = {
  params: { id: string };
};

export default async function PhotoModal({ params: { id: photoId } }: Props) {
  return (
    <Modal>
      <FullImage id={photoId} />
    </Modal>
  );
}
