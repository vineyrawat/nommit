import { createBrowserRouter } from "react-router-dom";
import InitPage from "./pages/init";
import LoginPage from "./pages/login";
import MainPage from "./pages/app";
import EditorPage from "./pages/app/editor";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: InitPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/app",
    Component: MainPage,
    children: [
      {
        path: "",
        Component: EditorPage,
      },
      {
        path: "editor",
        Component: EditorPage,
      },
    ],
  },
]);
