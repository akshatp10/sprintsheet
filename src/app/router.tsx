import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import { TestPage } from "@/pages/testPage";
import WorkspaceSidebar from "@/components/sidebar/WorkspaceSidebar";
import WorkspaceTopbar from "@/components/topbar/WorkspaceTopbar";
import UserPanelSidebar from "@/components/sidebar/UserPanelSidebar";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Workspace routes */}
            <Route
                element={<AppLayout
                    dynamicSidebar={<WorkspaceSidebar />}
                    dynamicTopBar={<WorkspaceTopbar />}
                    usersPanel={<UserPanelSidebar />}
                />}
            >
                <Route path="/" element={"Home/Project Page"} />
                <Route path="/test" element={<TestPage />} />
            </Route>
        </>
    )
);