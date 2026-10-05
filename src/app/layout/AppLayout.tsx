import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';

interface AppLayoutProps {
  dynamicSidebar: React.ReactNode;
  dynamicTopBar: React.ReactNode;
  usersPanel: React.ReactNode;
}

const AppLayout = ({ dynamicSidebar, dynamicTopBar, usersPanel }: AppLayoutProps) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss={false}
      />

      <div className="grid h-dvh w-dvw grid-cols-[18rem_minmax(0,1fr)] bg-surface text-ink">
        <aside className="grid h-dvh min-h-0 min-w-0 grid-rows-[1fr_auto] overflow-hidden border-r border-lines-hairline bg-surface-sunken p-3">
          <nav className="min-h-0 min-w-0 overflow-y-auto">{dynamicSidebar}</nav>

          <div className="min-w-0">{usersPanel}</div>
        </aside>

        <div className="grid h-dvh min-h-0 min-w-0 grid-rows-[3.5rem_minmax(0,1fr)] bg-surface-page">
          <div className="flex min-h-0 min-w-0 items-center border-b border-lines-hairline px-4">
            {dynamicTopBar}
          </div>

          <main className="min-h-0 min-w-0 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
