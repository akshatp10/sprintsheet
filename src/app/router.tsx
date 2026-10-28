import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import AppLayout from './layout/AppLayout';

// Sidebars
import WorkspaceSidebar from '@/components/sidebar/WorkspaceSidebar';
import ProjectsSidebar from '@/components/sidebar/ProjectsSidebar';
import SidebarBottom from '@/components/sidebar/SidebarBottom';

// Topbars
import WorkspaceTopbar from '@/components/topbar/WorkspaceTopbar';
import ProjectsTopbar from '@/components/topbar/ProjectsTopbar';
import CyclesTopbar from '@/components/topbar/CyclesTopbar';
import AllTaskTopbar from '@/components/topbar/AllTaskTopbar';
import DashboardTopbar from '@/components/topbar/DashboardTopbar';

// Pages
import { TestPage } from '@/pages/testPage';
import AllProjectsPage from '@/pages/AllProjectsPage';
import TaskViewPage from '@/pages/TaskViewPage';
import CyclesDetailsPage from '@/pages/CyclesDetailsPage';
import AllTaskPage from '@/pages/AllTaskPage';
import SignInPage from '@/pages/auths/SigninPage';
import SignUpPage from '@/pages/auths/SignUpPage';
import DashboardPage from '@/pages/DashboardPage';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public auth routes */}
      <Route path="/auth/login" element={<SignInPage />} />
      <Route path="/auth/register" element={<SignUpPage />} />

      {/* Protect every other route */}
      <Route element={<ProtectedRoute />}>
        {/* Workspace routes */}
        <Route
          element={
            <AppLayout
              dynamicSidebar={<WorkspaceSidebar />}
              dynamicTopBar={<WorkspaceTopbar />}
              usersPanel={<SidebarBottom />}
            />
          }
        >
          <Route path="/" element={<AllProjectsPage />} />
          <Route path="/test" element={<TestPage />} />
        </Route>

        {/* Project routes */}
        <Route
          element={
            <AppLayout
              dynamicSidebar={<ProjectsSidebar />}
              dynamicTopBar={<ProjectsTopbar />}
              usersPanel={<SidebarBottom />}
            />
          }
        >
          <Route path="/project/:projectid/board" element={<TaskViewPage />} />
        </Route>

        {/* All task routes */}
        <Route
          element={
            <AppLayout
              dynamicSidebar={<ProjectsSidebar />}
              dynamicTopBar={<AllTaskTopbar />}
              usersPanel={<SidebarBottom />}
            />
          }
        >
          <Route path="/project/:projectid/tasks" element={<AllTaskPage />} />
        </Route>

        {/* Cycle routes */}
        <Route
          element={
            <AppLayout
              dynamicSidebar={<ProjectsSidebar />}
              dynamicTopBar={<CyclesTopbar />}
              usersPanel={<SidebarBottom />}
            />
          }
        >
          <Route path="/project/:projectid/cycles" element={<CyclesDetailsPage />} />
        </Route>

        {/* Dashboard routes */}
        <Route
          element={
            <AppLayout
              dynamicSidebar={<ProjectsSidebar />}
              dynamicTopBar={<DashboardTopbar />}
              usersPanel={<SidebarBottom />}
            />
          }
        >
          <Route path="/project/:projectid" element={<DashboardPage />} />
        </Route>
      </Route>
    </>,
  ),
);
