import { useEffect, useState } from "react";
import { Maximize2, Minus, Square, X } from "lucide-react";
import NommitDark from "@/assets/nommit-dark.svg";
import { cn } from "@/lib/utils";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/core";

// when using `"withGlobalTauri": true`, you may use
// const { getCurrentWindow } = window.__TAURI__.window;

interface TitleBarProps {
  className?: string;
}

export function TitleBar({
  // title = "My Desktop App",
  className,
}: TitleBarProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleClose = async () => {
    await invoke("exit_app");
  };

  const handleMinimize = async () => {
    const app = getCurrentWindow();
    await app.minimize();
  };

  const handleMaximize = async () => {
    const appWindow = getCurrentWindow();
    await appWindow.toggleMaximize();
    const maximised = await appWindow.isMaximized();
    setIsMaximized(maximised);
  };

  useEffect(() => {
    const appWindow = getCurrentWindow();
    appWindow.isMaximized().then(setIsMaximized);
  }, []);

  return (
    <div
      data-tauri-drag-region
      className={cn(
        "flex h-8 w-full items-center justify-between border-b bg-gradient-to-r",
        className
      )}
    >
      <div className="flex items-center gap-2 ml-3">
        <img src={NommitDark} alt="Nommit" className="h-5" />
        {/* <span className="text-sm font-medium">{title}</span> */}
      </div>
      <div className="flex items-center">
        <button
          onClick={handleMinimize}
          className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label="Minimize"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          onClick={handleMaximize}
          className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? (
            <Square className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </button>
        <button
          onClick={handleClose}
          className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-red-500 hover:text-white dark:text-gray-400 dark:hover:bg-red-500 dark:hover:text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
