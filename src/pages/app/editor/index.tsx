import FilesTabBar from "@/components/editor-page-components/files-tab-bar";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Check, CloudUpload, Loader2, TriangleAlert } from "lucide-react";
import { useState } from "react";

export default function EditorPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <FilesTabBar />
      <SimpleEditor />
      <div className="w-full border-t h-8 flex items-center gap-2 px-2">
        <SyncComponent />
      </div>
    </div>
  );
}

const SyncComponent = () => {
  const [syncStatus, setSyncStatus] = useState("idle"); // 'idle', 'syncing', 'synced', 'error'

  const handleSync = async () => {
    setSyncStatus("syncing");
  };

  const getSyncContent = () => {
    switch (syncStatus) {
      case "syncing":
        return {
          icon: (
            <Loader2
              className="text-orange-400 animate-spin ease-out"
              size={15}
            />
          ),
          text: "Syncing...",
          onClick: handleSync,
        };
      case "synced":
        return {
          icon: <Check className="text-teal-500" size={15} />,
          text: "Synced",
          onClick: handleSync,
        };
      case "error":
        return {
          icon: <TriangleAlert className="text-red-500" size={15} />,
          text: "Unable to sync",
          onClick: handleSync,
        };
      default:
        return {
          icon: <CloudUpload className="text-primary" size={15} />,
          text: "Sync Now",
          onClick: handleSync,
        };
    }
  };

  const { icon, text, onClick } = getSyncContent();

  return (
    <button
      onClick={onClick}
      className="flex select-none cursor-pointer hover:bg-muted items-center text-xs gap-1 text-muted-foreground"
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};
