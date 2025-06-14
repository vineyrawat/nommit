import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import {
  Command,
  FileIcon,
  FilePlus,
  FolderIcon,
  FolderOpenIcon,
  FolderPlus,
  GripVertical,
} from "lucide-react";

import { Tree, TreeItem, TreeItemLabel } from "@/components/tree";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Item {
  name: string;
  children?: string[];
}

const items: Record<string, Item> = {
  company: {
    name: "Company",
    children: ["engineering", "marketing", "operations"],
  },
  engineering: {
    name: "Engineering",
    children: ["frontend", "backend", "platform-team"],
  },
  frontend: { name: "Frontend", children: ["design-system", "web-platform"] },
  "design-system": {
    name: "Design System",
    children: ["components", "tokens", "guidelines"],
  },
  components: { name: "Components", children: ["tokens", "infrastructure"] },
  tokens: { name: "Tokens" },
  guidelines: { name: "Guidelines" },
  "web-platform": { name: "Web Platform" },
  backend: { name: "Backend", children: ["apis", "infrastructure"] },
  apis: { name: "APIs" },
  infrastructure: { name: "Infrastructure" },
  "platform-team": { name: "Platform Team" },
  marketing: { name: "Marketing", children: ["content", "seo"] },
  content: { name: "Content" },
  seo: { name: "SEO" },
  operations: { name: "Operations", children: ["hr", "finance"] },
  hr: { name: "HR" },
  finance: { name: "Finance" },
};

const indent = 20;

export default function FileSidebar() {
  const defaultWidth = 250;
  const minWidth = 180;
  const maxWidth = 600;

  const tree = useTree<Item>({
    initialState: {
      expandedItems: ["engineering", "frontend", "design-system"],
    },
    indent,
    rootItemId: "company",
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    dataLoader: {
      getItem: (itemId) => items[itemId],
      getChildren: (itemId) => items[itemId].children ?? [],
    },
    features: [syncDataLoaderFeature, hotkeysCoreFeature],
  });

  const [sidebarWidth, setSidebarWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(defaultWidth);

  // Handle mouse down on the resize handle
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = sidebarWidth;
  };

  // Handle mouse move for resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startXRef.current;
      const newWidth = Math.max(
        minWidth,
        Math.min(maxWidth, startWidthRef.current + deltaX),
      );

      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, minWidth, maxWidth]);

  return (
    <div
      ref={sidebarRef}
      style={{ width: `${sidebarWidth}px` }}
      className={cn(
        "min-w-[14rem] border-r flex relative overflow-y-auto flex-col overflow-x-hidden p-1 h-screen",
        isResizing && "select-none",
      )}
    >
      <Tree
        className="relative before:absolute before:inset-0 before:-ms-1 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
        indent={indent}
        tree={tree}
      >
        {tree.getItems().map((item) => {
          return (
            <TreeItem className="cursor-pointer" key={item.getId()} item={item}>
              <TreeItemLabel className="before:bg-background relative before:absolute before:inset-x-0 before:-inset-y-0.5 before:-z-10">
                <span className="flex items-center gap-2">
                  {item.isFolder() ? (
                    item.isExpanded() ? (
                      <FolderOpenIcon className="text-muted-foreground pointer-events-none size-4" />
                    ) : (
                      <FolderIcon className="text-muted-foreground pointer-events-none size-4" />
                    )
                  ) : (
                    <FileIcon className="text-muted-foreground pointer-events-none size-4" />
                  )}
                  {item.getItemName()}
                </span>
              </TreeItemLabel>
            </TreeItem>
          );
        })}
      </Tree>
      <GlobalContextMenu />
      {/* Resize handle */}

      <div
        className={cn(
          "absolute z-10 top-0 right-0 h-full w-1 cursor-ew-resize group",
          isResizing && "bg-blue-500",
        )}
        onMouseDown={handleMouseDown}
      >
        <div
          className={cn(
            "absolute top-1/2 right-0 -translate-y-1/2 flex items-center justify-center h-8 w-4 bg-slate-200 dark:bg-slate-800 rounded-l opacity-0 group-hover:opacity-100",
            isResizing && "opacity-100 bg-blue-500 dark:bg-blue-500",
          )}
        >
          <GripVertical className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        </div>
      </div>
    </div>
  );
}

function GlobalContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex-1" />
      <ContextMenuContent className="p-0 appearance-none shadow-sm min-w-52">
        <ContextMenuItem className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilePlus />
            New File
          </div>
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderPlus />
            New Folder
          </div>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
