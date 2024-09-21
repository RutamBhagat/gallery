import FullImage from "~/components/full_image";

type Props = {
  params: { id: string };
};

export default async function PhotoModal({ params: { id: photoId } }: Props) {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <FullImage id={photoId} />
    </div>
  );
}
