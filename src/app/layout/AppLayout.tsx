import React from 'react'
import { Outlet } from 'react-router-dom'

interface AppLayoutProps {
    dynamicSidebar: React.ReactNode
    dynamicTopBar: React.ReactNode
    usersPanel: React.ReactNode
}

const AppLayout = ({ dynamicSidebar, dynamicTopBar, usersPanel }: AppLayoutProps) => {
    return (
        <div className="grid h-screen w-screen grid-cols-[224px_1fr] bg-surface">
            <aside className="grid h-full grid-rows-[1fr_auto] border-r border-lines-hairline bg-surface-sunken p-3">
                <nav className="overflow-y-auto">{dynamicSidebar}</nav>
                <div className="">
                    {usersPanel}
                </div>
            </aside>

            <div className="grid h-full min-w-0 grid-rows-[56px_1fr] bg-surface-page">
                {/* Separation between topbar and main content */}
                <div
                    className="flex min-w-0 items-center border-b border-lines-hairline px-4"
                >
                    {dynamicTopBar}
                </div>
                <main className="min-h-0 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AppLayout
