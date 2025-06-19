import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";

import { createBrowserRouter, RouterProvider } from "react-router";

import Movies from "./pages/Movies.tsx";
import MovieDetail from "./pages/MovieDetail.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./components/layouts/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Movies />,
      },
      {
        path: "/movies/:movieId",
        element: <MovieDetail />,
      },
    ],
  },
]);

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
