import React from "react";

import { Outlet } from "react-router-dom";

interface AppLayoutProps {
    dynamicSidebar: React.ReactNode;
    dynamicTopBar: React.ReactNode;
    usersPanel: React.ReactNode;
}

const AppLayout = ({
    dynamicSidebar,
    dynamicTopBar,
    usersPanel,
}: AppLayoutProps) => {
    return (
        <div className="grid h-dvh w-dvw grid-cols-[minmax(min-content,280px)_1fr] bg-surface text-ink">
            <aside className="grid h-dvh min-h-0 min-w-fit grid-rows-[1fr_auto] border-r border-lines-hairline bg-surface-sunken p-3">
                <nav className="min-h-0 overflow-y-auto">
                    {dynamicSidebar}
                </nav>

                <div>
                    {usersPanel}
                </div>
            </aside>

            <div className="grid h-dvh min-h-0 min-w-fit grid-rows-[56px_1fr] bg-surface-page">
                <div className="flex min-h-0 min-w-0 overflow-y-auto items-center border-b border-lines-hairline px-4">
                    {dynamicTopBar}
                </div>

                <main className="min-h-0 min-w-0 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;