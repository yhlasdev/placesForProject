import { createBrowserRouter } from "react-router-dom";
import PageWrapperNoAuth from "./PageWrapperNoAuth";
import PageWrapper from "./PageWrapper";

import Login from "../pages/Login";
import Home from "../pages/Home";
import DocumentPage from "../pages/DocumentPage";
import AdminDashboard from "../pages/AdminDashboard";

const NotFoundPage = () => <div className="p-8 text-center text-red-500 text-2xl">404 Not Found</div>;

const routes = createBrowserRouter(
  [
    {
      path: "/login",
      element: (
        <PageWrapperNoAuth>
          <Login />
        </PageWrapperNoAuth>
      ),
    },
    {
      path: "/",
      element: (
        <PageWrapper>
          <Home />
        </PageWrapper>
      ),
    },
    {
      path: "/documents/:guid",
      element: (
        <PageWrapper>
          <DocumentPage />
        </PageWrapper>
      ),
    },
    {
      path: "/admin",
      element: (
        <PageWrapper>
          <AdminDashboard />
        </PageWrapper>
      ),
    },
    {
      path: "*",
      element: (
        <PageWrapperNoAuth>
          <NotFoundPage />
        </PageWrapperNoAuth>
      ),
    },
  ],
  {
    basename: "/",
  },
);

export default routes;