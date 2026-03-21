"use client";

import { useRef } from "react";
import { ImageUpIcon } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/src/components/Button";
import { MAX_UPLOAD_IMAGE_SIZE } from "@/src/lib/constants";

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange() {
    const fileInput = fileInputRef.current;
    if (!fileInput) return;

    const file = fileInput.files?.[0];
    if (!file) return;

    if (file.size > MAX_UPLOAD_IMAGE_SIZE) {
      const readableSize = (MAX_UPLOAD_IMAGE_SIZE / 1024).toFixed(2);
      toast.error(`File size exceeds the maximum limit of ${readableSize}KB.`);

      fileInput.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fileInput.value = "";
  }

  return (
    <div className="flex flex-col gap-2 py-4">
      <Button onClick={handleButtonClick} type="button" className="self-start">
        <ImageUpIcon />
        Enviar uma imagem
      </Button>

      <input
        ref={fileInputRef}
        className="hidden"
        name="file"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
