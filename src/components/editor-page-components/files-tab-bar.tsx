import { X } from 'lucide-react';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SimpleEditor } from '../tiptap-templates/simple/simple-editor';
import React from 'react';

export default function FilesTabBar() {
  const [tabId, setTabId] = React.useState<string>('tab-1');

  return (
    <div className="w-full h-12">
      <Tabs defaultValue="tab-1" onValueChange={setTabId}>
        <ScrollArea>
          <TabsList className="bg-background mb-3 h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse">
            <TabsTrigger
              value="tab-1"
              className="data-[state=active]:bg-muted w-max data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
            >
              Weekly plan
              <X
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
            </TabsTrigger>
            <TabsTrigger
              value="tab-2"
              className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
            >
              Finance Planning
              <X
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
            </TabsTrigger>
            <TabsTrigger
              value="tab-3"
              className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
            >
              Users
              <X
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="tab-1" forceMount hidden={tabId == 'tab-1'}>
          <SimpleEditor />
        </TabsContent>
        <TabsContent value="tab-2" forceMount hidden={tabId == 'tab-2'}>
          <SimpleEditor />
        </TabsContent>
        <TabsContent value="tab-3" forceMount hidden={tabId == 'tab-3'}>
          <SimpleEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
