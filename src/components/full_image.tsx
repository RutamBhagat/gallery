import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Download, Share2 } from "lucide-react";

import { Button } from "./ui/button";
import Image from "next/image";
import React from "react";
import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries/images";

type Props = {
  id: string;
};

async function FullImage({ id }: Props) {
  const idAsNumber = parseInt(id);
  if (isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(idAsNumber);
  const uploaderInfo = await clerkClient.users.getUser(image.userId!);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 p-6 lg:flex-row">
      <div className="flex-1">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Image
              className="h-auto max-h-[80vh] w-full object-contain"
              src={image.url}
              alt={image.name}
              width={2000}
              height={2000}
            />
          </CardContent>
        </Card>
      </div>

      <div className="w-full lg:w-1/3">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{image.name}</CardTitle>
            <CardDescription>Uploaded by</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={uploaderInfo.imageUrl} />
                <AvatarFallback>
                  {uploaderInfo.firstName?.[0]}
                  {uploaderInfo.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {uploaderInfo.firstName} {uploaderInfo.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {uploaderInfo.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full" variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button className="w-full" variant="outline">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FullImage;
