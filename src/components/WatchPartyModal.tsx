"use client";

import { useState } from "react";
import { Users, Copy, Check, X } from "lucide-react";
import Modal from "@/components/ui/Modal";

interface WatchPartyModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    title: string;
    slug: string;
    type: string;
    _id: any;
  } | null;
}

export default function WatchPartyModal({ isOpen, onClose, content }: WatchPartyModalProps) {
  const [copied, setCopied] = useState(false);

  if (!content) return null;

  const watchPartyUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/watchparty/${content.slug || content._id}`
    : `/watchparty/${content.slug || content._id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(watchPartyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = watchPartyUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Watch Party" className="max-w-md">
      <div className="space-y-4">
        <p className="text-gray-400 text-sm">
          Invite friends to watch "{content.title}" together!
        </p>

        <div className="bg-[#0d1117] p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-xs mb-2">Share this link:</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={watchPartyUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-[#161f2e] border border-gray-600 rounded text-white text-sm"
            />
            <button
              onClick={handleCopy}
              className={`p-2 rounded transition-all ${
                copied 
                  ? "bg-green-600 text-white" 
                  : "bg-[#00a8e1] hover:bg-[#00b9f1] text-white"
              }`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="bg-[#0d1117] p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#00a8e1] rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">How it works</p>
              <p className="text-gray-400 text-xs">Watch together with friends</p>
            </div>
          </div>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>1. Share the link with your friends</li>
            <li>2. Everyone opens the link at the same time</li>
            <li>3. Use video call (Zoom, Discord, etc.) to chat</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-[#222] hover:bg-[#333] text-white rounded-lg transition-all"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
