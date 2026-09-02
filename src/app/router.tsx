import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import AppLayout from "./layout/AppLayout";

// Importing Sidebars and Topbars Components
import WorkspaceSidebar from "@/components/sidebar/WorkspaceSidebar";
import WorkspaceTopbar from "@/components/topbar/WorkspaceTopbar";
import ProjectsTopbar from "@/components/topbar/ProjectsTopbar";
import ProjectsSidebar from "@/components/sidebar/ProjectsSidebar";


// Importing pages
import { TestPage } from "@/pages/testPage";
import SidebarBottom from "@/components/sidebar/SidebarBottom";
import AllProjectsPage from "@/pages/AllProjectsPage";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Workspace routes */}
            <Route
                element={<AppLayout
                    dynamicSidebar={<WorkspaceSidebar />}
                    dynamicTopBar={<WorkspaceTopbar />}
                    usersPanel={<SidebarBottom />}
                />}
            >
                <Route path="/" element={<AllProjectsPage />} />
                <Route path="/test" element={<TestPage />} />
            </Route>

            {/* Project Routes */}
            <Route
                element={<AppLayout
                    dynamicSidebar={<ProjectsSidebar />}
                    dynamicTopBar={<ProjectsTopbar />}
                    usersPanel={<SidebarBottom />}
                />}
            >
                <Route path="/project/:projectid" element={<TestPage />} />
                <Route path="/project/:projectid/board" element={<TestPage />} />
                <Route path="/project/:projectid/tasks" element={<TestPage />} />
                <Route path="/project/:projectid/cycles" element={<TestPage />} />
            </Route>
        </>
    )
);