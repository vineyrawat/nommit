import FileSidebar from "@/components/file-sidebar";
import { Outlet } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="flex h-screen">
      <FileSidebar />
      <div className="w-full h-full flex-1 flex">
        <Outlet />
      </div>
    </div>
  );
}
