import { TitleBar } from '@/components/ui/titlebar';
import { Outlet } from 'react-router-dom';

export default function MainPage() {
  return (
    <div className="flex flex-col h-screen">
      <TitleBar />
      <div className="w-full h-full flex-1 flex">
        <Outlet />
      </div>
    </div>
  );
}
