import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import { createBrowserRouter } from "react-router-dom";

export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [],
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/blog",
    element: <Contact />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
];

export const router = createBrowserRouter(publicRoutes);
