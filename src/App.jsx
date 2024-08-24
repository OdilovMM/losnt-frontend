import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import {
  Error,
  Found,
  Help,
  HomeLayout,
  Item,
  Landing,
  List,
  Login,
  Lost,
  Profile,
  Register,
  SingleItem,
} from "./pages";
import { loader as landingLoader } from "./pages/Landing";
import { action as foundAction, loader as foundLoader } from "./pages/Found";
import { loader as singleLoader } from "./pages/SingleItem";
import { loader as profileLoader } from "./pages/Profile";
import { loader as lostLoader } from "./pages/Lost";
import { combinedListLoader } from "./pages/List";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { store } from "./store";
import { toast } from "react-toastify";

const combinedLoader = async ({ request, params }) => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn("Iltimos, akkauntingizga kiring");
    return redirect("/");
  }

  const [landingData, foundData] = await Promise.all([
    landingLoader({ request, params }),
    foundLoader({ request, params, context: { store } }),
  ]);

  return { landingData, foundData };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
      },
      {
        path: "items",
        element: <Item />,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader(store),
      },
      {
        path: "lost",
        element: <Lost />,
        loader: lostLoader(store),
      },
      {
        path: "found",
        element: <Found />,
        loader: combinedLoader,
        action: foundAction,
      },
      {
        path: "list",
        element: <List />,
        loader: combinedListLoader,
      },
      {
        path: "items/:itemId",
        element: <SingleItem />,
        loader: singleLoader,
      },

      { path: "help", element: <Help /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
