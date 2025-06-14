import { X } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo } from "react";

export default function FilesTabBar() {
  const handleTabChange = (value: string) => {
    console.log("Tab changed to:", value);
  };

  const tabs = useMemo(
    () =>
      [
        { tab: "Tab 1", value: "tab-1" },
        { tab: "Tab 2", value: "tab-2" },
        { tab: "Tab 3", value: "tab-3" },
      ].map(({ tab, value }) => (
        <TabsTrigger
          value={value}
          className="cursor-pointer data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border p-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e min-w-max"
        >
          <div className="flex items-center justify-between gap-2 w-full">
            <span className="text-left line-clamp-1 text-wrap max-w-[10rem]">
              {tab}
            </span>
            <X className="opacity-60" size={16} aria-hidden="true" />
          </div>
        </TabsTrigger>
      )),
    [],
  );

  return (
    <div className="w-full">
      <Tabs defaultValue="tab-1" onValueChange={handleTabChange}>
        <ScrollArea className="w-full border-b">
          <TabsList className="bg-background h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse">
            {tabs}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Tabs>
    </div>
  );
}
