"use client";

import { ImageUpIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";

import { IMAGE_UPLOAD_MAX_SIZE } from "@/src/lib/constants";
import { uploadImageAction } from "@/src/actions/upload/upload-image-action";
import { Button } from "@/src/components/Button";

export function ImageUploader() {
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChooseFile() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!fileInputRef.current) {
      setImgUrl("");
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput.files?.[0];

    if (!file) {
      setImgUrl("");
      return;
    }

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const readableMaxSize = IMAGE_UPLOAD_MAX_SIZE / 1024;
      toast.error(`Image too large. Max.: ${readableMaxSize}KB.`);

      fileInput.value = "";
      setImgUrl("");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = "";
        setImgUrl("");
        return;
      }

      setImgUrl(result.url);
      toast.success("Image sent sucessfully!");
    });

    fileInput.value = "";
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <Button
        onClick={handleChooseFile}
        type="button"
        className="self-start"
        disabled={isUploading}
      >
        <ImageUpIcon />
        Enviar uma imagem
      </Button>

      {!!imgUrl && (
        <div className="flex flex-col gap-4">
          <p>
            <b>URL:</b> {imgUrl}
          </p>

          <p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="rounded-lg" src={imgUrl} alt="Sent image" />
          </p>
        </div>
      )}

      <input
        onChange={handleChange}
        ref={fileInputRef}
        className="hidden"
        name="file"
        type="file"
        accept="image/*"
        disabled={isUploading}
      />
    </div>
  );
}
