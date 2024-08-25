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
  Login,
  Lost,
  Profile,
  Register,
  SingleItem,
} from "./pages";
import { loader as landingLoader } from "./pages/Landing";
import { loader as foundLoader } from "./pages/Found";
import { loader as singleLoader } from "./pages/SingleItem";
import { loader as profileLoader } from "./pages/Profile";
import { loader as lostLoader } from "./pages/Lost";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { store } from "./store";
import { toast } from "react-toastify";
import MyList, { myListLoader } from "./components/MyList";
import UserItem, { myLoader } from "./pages/UserItem";

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
      },
      {
        path: "list/my-list",
        element: <MyList />,
        loader: myListLoader,
      },
      {
        path: "items/:itemId",
        element: <SingleItem />,
        loader: singleLoader,
      },
      {
        path: "list/my-list/:itemId",
        element: <UserItem />,
        loader: myLoader,
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
