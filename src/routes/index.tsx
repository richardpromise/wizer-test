import React, { Suspense } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";
import ErrorBoundary from "../components/error-boundary";
import NotFound from "../components/404";

// Main Layout Component
const MainLayout = ({ children }: any) => {
  return (
    <div className="bg-neutral-50">{children ? children : <Outlet />}</div>
  );
};

// Lazy imports
const Dashboard = React.lazy(() => import("../layout"));
const Comments = React.lazy(() => import("../modules/comments"));
const Users = React.lazy(() => import("../modules/users"));
const UserDetails = React.lazy(() => import("../modules/users/user-details"));
const CommentDetails = React.lazy(
  () => import("../modules/comments/comment-in-detail")
);

// Loader Component
const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <FallingLines color="#8159f3" width="100" visible={true} />
  </div>
);

export default function Server() {
  const server = createBrowserRouter([
    {
      element: (
        <ErrorBoundary>
          <MainLayout />
        </ErrorBoundary>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<Loader />}>
              <Dashboard />
            </Suspense>
          ),
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<Loader />}>
                  <Comments />
                </Suspense>
              ),
            },
            {
              path: "/comment/:id",
              element: (
                <Suspense fallback={<Loader />}>
                  <CommentDetails />
                </Suspense>
              ),
            },
            {
              path: "users",
              element: (
                <Suspense fallback={<Loader />}>
                  <Users />
                </Suspense>
              ),
            },
            {
              path: "/users/:id",
              element: (
                <Suspense fallback={<Loader />}>
                  <UserDetails />
                </Suspense>
              ),
            },
            {
              path: "*",
              element: <NotFound />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={server} />;
}
