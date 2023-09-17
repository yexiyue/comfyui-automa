import { createHashRouter } from "react-router-dom";
import { RootLayout } from "@/pages/Root";
import { MainLayout } from "@/pages/dates";
import { Templates } from "@/pages/templates";
import { TemplateCreate } from "@/pages/templates/create";
import { TemplateDetail } from "@/pages/templates/detail";
import { DatesCreate } from "@/pages/dates/create";
import { Home } from "@/pages/Home";
import DateList from "@/pages/dates/[id]/list";
import DateMeta from "@/pages/dates/[id]/meta";
import DateSetting from "@/pages/dates/[id]/setting";
import DateImage from "@/pages/dates/[id]/image";
import { Automa } from "@/pages/automa";
import { About } from "@/pages/about";
import { Setting } from "@/pages/setting";
import { ComfyUIPage } from "@/pages/comfyui";
import { Comfyui } from "@/pages/comfyui/Comfyui";
import { ComfyuiCreate } from "@/pages/comfyui/Create";
import ComfyuiWorkflow from "@/pages/comfyui/workflow";

export const router = createHashRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: MainLayout,
        children: [
          {
            path: "/",
            Component: Home,
          },
          {
            path: "create",
            Component: DatesCreate,
          },
          {
            path: "dates/:id/list",
            Component: DateList,
          },
          {
            path: "dates/:id/meta",
            Component: DateMeta,
          },
          {
            path: "dates/:id/setting",
            Component: DateSetting,
          },
          {
            path: "dates/:id/image",
            Component: DateImage,
          },
        ],
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
      {
        path: "automa",
        Component: Automa,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "setting",
        Component: Setting,
      },
      {
        path: "comfyui",
        Component: ComfyUIPage,
      },
      {
        path: "comfyui/server",
        Component: Comfyui,
      },
      {
        path: "/comfyui/create",
        Component: ComfyuiCreate,
      },
      {
        path: "/comfyui/:id",
        Component: ComfyuiWorkflow,
      },
    ],
  },
]);
