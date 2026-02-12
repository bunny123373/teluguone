"use client";

import { AlertTriangle } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { IContent } from "@/models/Content";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: IContent | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  content,
  onConfirm,
  isLoading,
}: DeleteConfirmModalProps) {
  if (!content) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete">
      <div className="text-center py-4">
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-text mb-2">
          Delete &quot;{content.title}&quot;?
        </h3>
        <p className="text-muted text-sm mb-6">
          This action cannot be undone. This will permanently delete the{" "}
          {content.type} and all its data.
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
