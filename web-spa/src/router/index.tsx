import { createHashRouter } from "react-router-dom";
import { RootLayout } from "@/pages/Root";
import { MainLayout } from "@/pages/dates";
import { Templates } from "@/pages/templates";
import { TemplateCreate } from "@/pages/templates/create";
import { TemplateDetail } from "@/pages/templates/detail";
export const router = createHashRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: MainLayout,
      },
      {
        path: "templates",
        Component: Templates,
      },
      {
        path: "templates/create",
        Component: TemplateCreate,
      },
      {
        path: "templates/:id",
        Component: TemplateDetail,
      },
    ],
  },
]);
