"use client";

import clsx from "clsx";
import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

import { deletePostAction } from "@/src/actions/post/delete-post-action";
import { Dialog } from "@/src/components/Dialog";

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const handleConfirm = () => {
    toast.dismiss();
    startTransition(async () => {
      const result = await deletePostAction(id);
      closeDialog();

      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Post deleted successfully!");
    });
  };

  return (
    <>
      <button
        className={clsx(
          "text-red-500 cursor-pointer transition",
          "[&_svg]:w-4 [&_svg]:h-4",
          "hover:scale-120 hover:text-red-700",
          "disabled:text-slate-600 disabled:cursor-not-allowed",
        )}
        aria-label={`Delete post: ${title}`}
        title={`Delete post: ${title}`}
        onClick={openDialog}
        disabled={isPending}
      >
        <Trash2Icon />
      </button>

      <Dialog
        isVisible={dialogOpen}
        title="Delete post?"
        content={`Are you sure you want to delete the post: ${title}`}
        onCancel={closeDialog}
        onConfirm={handleConfirm}
        disabled={isPending}
      />
    </>
  );
}
