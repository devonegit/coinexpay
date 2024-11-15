import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();
import {
  HomeLayout,
  Landing,
  Error,
  Register,
  Login,
  MailConfirmation,
  Dashboard,
  AutoFaucet,
  ManualFaucet,
  ShortLinks,
  PTC,
  DailyTasks,
  ReferEarn,
  FAQ,
  Support,
  CreateWithdrawal,
  HistoryWithdrawal,
  EditCoin,
  EditTask,
  AdminSupport,
  AdminClaims,
  AdminWithdrawal,
  Admin_UserDashboard,
  ResetPassword,
  Profile,
  UpdateMailConfirmation,
  AdminUsers
} from "./pages";
import { DashboardLayout, ProtectedRoute } from "./components";
import { loader as DashboardLayoutLoader } from "./components/layout/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "register/mail-confirmation/:token",
        element: <MailConfirmation />,
      },
      {
        path: "user/mail-confirmation/:token/:id",
        element: <UpdateMailConfirmation />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: DashboardLayoutLoader,

        children: [
          {
            index: true,
            element: (
              <ProtectedRoute requiredRoles={["user", "admin"]}>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "manual-faucet",
            element: (
              <ProtectedRoute requiredRoles={["user"]}>
                <ManualFaucet />
              </ProtectedRoute>
            ),
          },
          {
            path: "auto-faucet",
            element: (
              <ProtectedRoute requiredRoles={["user"]}>
                <AutoFaucet />
              </ProtectedRoute>
            )
          },
          {
            path: "short-links",
            element: (
              <ProtectedRoute requiredRoles={["user"]}>
                <ShortLinks />
              </ProtectedRoute>
            )
          },
          {
            path: "ptc",
            element:  (
              <ProtectedRoute requiredRoles={["user"]}>
                <PTC />
              </ProtectedRoute>
            ),
          },
          {
            path: "daily-tasks",
            element: (
              <ProtectedRoute requiredRoles={["user"]}>
                <DailyTasks />
              </ProtectedRoute>
            ),
          },
          {
            path: "affiliate",
            element: (
              <ProtectedRoute requiredRoles={["user"]}>
                <ReferEarn />
              </ProtectedRoute>
            ),
          },
          {
            path: "withdraw/create",
            element: (
              <ProtectedRoute requiredRoles={["user"]}>
                <CreateWithdrawal />
              </ProtectedRoute>
            ),
          },
          {
            path: "withdraw/history",
            element: (
              <ProtectedRoute requiredRoles={["user"]}>
                <HistoryWithdrawal />
              </ProtectedRoute>
            ),
          },
          {
            path: "support",
            element: (
              <ProtectedRoute requiredRoles={["user"]}>
                <Support />
              </ProtectedRoute>
            ),
          },
          {
            path: "reset-password",
            element: (
              <ProtectedRoute requiredRoles={["user"]}>
                <ResetPassword />
              </ProtectedRoute>
            ),
          },
          {
            path: "profile",
            element: (
              <ProtectedRoute requiredRoles={["user"]}>
                <Profile />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin-support",
            element: (
              <ProtectedRoute requiredRoles={["admin"]}>
                <AdminSupport />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin-claims",
            element: (
              <ProtectedRoute requiredRoles={["admin"]}>
                <AdminClaims />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin-users",
            element: (
              <ProtectedRoute requiredRoles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin-withdrawals",
            element: (
              <ProtectedRoute requiredRoles={["admin"]}>
                <AdminWithdrawal />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin/user-dashboard/:userId",
            element: (
              <ProtectedRoute requiredRoles={["admin"]}>
                <Admin_UserDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "frequently-asked-questions",
            element: (
              <ProtectedRoute requiredRoles={["user"]}>
                <FAQ />
              </ProtectedRoute>
            ),
          },
          {
            path: "coin-details",
            element: (
              <ProtectedRoute requiredRoles={["admin"]}>
                <EditCoin />
              </ProtectedRoute>
            ),
          },
          {
            path: "task-details",
            element: (
              <ProtectedRoute requiredRoles={["admin"]}>
                <EditTask />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
    </QueryClientProvider>
  );
};
export default App;
