import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Components/pages/LandingPage";
import AdminPage from "./Components/pages/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
