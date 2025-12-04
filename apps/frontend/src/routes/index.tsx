import { RouteObject } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { CreateAdPage } from "../pages/CreateAdPage";
import { EditAdPage } from "../pages/EditAdPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/create",
    element: <CreateAdPage />,
  },
  {
    path: "/edit",
    element: <EditAdPage />,
  },
];
