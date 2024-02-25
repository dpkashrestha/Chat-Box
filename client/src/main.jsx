import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import AvatarSelector from "./components/AvatarSelector.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/setAvatar",
        element: <AvatarSelector />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
