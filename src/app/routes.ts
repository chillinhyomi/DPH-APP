import { createElement } from "react";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { AppLayout } from "./layouts/AppLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectWorkspacePage } from "./pages/ProjectWorkspacePage";
import { JoinPage } from "./pages/JoinPage";
import { ViewPage } from "./pages/ViewPage";
import { SchedulePage } from "./pages/SchedulePage";
import { NoticesPage } from "./pages/NoticesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { FormationsPage } from "./pages/FormationsPage";
import { TimelinePage } from "./pages/TimelinePage";
import { FilesPage } from "./pages/FilesPage";
import { MembersPage } from "./pages/MembersPage";
import { SettingsPage } from "./pages/SettingsPage";
import { AccountSettingsPage } from "./pages/AccountSettingsPage";
import { HelpPage } from "./pages/HelpPage";
import { LoginActivityPage } from "./pages/LoginActivityPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsOfServicePage } from "./pages/TermsOfServicePage";
import { QnAPage } from "./pages/QnAPage";
import { QnAPostPage } from "./pages/QnAPostPage";
import { QnACreatePage } from "./pages/QnACreatePage";
import { QnAEditPage } from "./pages/QnAEditPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

const ProtectedAppLayout = () => createElement(ProtectedRoute, null, createElement(AppLayout));
const ProtectedProjectWorkspacePage = () => createElement(ProtectedRoute, null, createElement(ProjectWorkspacePage));
const ProtectedViewPage = () => createElement(ProtectedRoute, null, createElement(ViewPage));

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: LandingPage },
      {
        Component: AuthLayout,
        children: [
          { path: "/login", Component: LoginPage },
          { path: "/register", Component: RegisterPage },
        ],
      },
      {
        Component: ProtectedAppLayout,
        children: [
          { path: "/home", Component: HomePage },
          { path: "/dashboard", Component: DashboardPage },
          { path: "/projects", Component: ProjectsPage },
          { path: "/formations", Component: FormationsPage },
          { path: "/timeline", Component: TimelinePage },
          { path: "/files", Component: FilesPage },
          { path: "/notices", Component: NoticesPage },
          { path: "/members", Component: MembersPage },
          { path: "/settings", Component: SettingsPage },
          { path: "/schedule", Component: SchedulePage },
          { path: "/join", Component: JoinPage },
          { path: "/profile", Component: ProfilePage },
          { path: "/account-settings", Component: AccountSettingsPage },
          { path: "/help", Component: HelpPage },
          { path: "/login-activity", Component: LoginActivityPage },
          { path: "/privacy-policy", Component: PrivacyPolicyPage },
          { path: "/terms-of-service", Component: TermsOfServicePage },
          { path: "/qna", Component: QnAPage },
          { path: "/qna/create", Component: QnACreatePage },
          { path: "/qna/:postId", Component: QnAPostPage },
          { path: "/qna/:postId/edit", Component: QnAEditPage },
        ],
      },
      { path: "/project/:id", Component: ProtectedProjectWorkspacePage },
      { path: "/view/:id", Component: ProtectedViewPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
