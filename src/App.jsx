import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Error,
  HomeLayout,
  Item,
  Landing,
  Login,
  Register,
  SingleItem,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "items",
        element: <Item />,
      },
      {
        path: "items/:itemId",
        element: <SingleItem />,
      },

      { path: "about", element: <About /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
