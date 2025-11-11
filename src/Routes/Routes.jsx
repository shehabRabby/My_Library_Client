import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";
import AddBook from "../Pages/AddBook";
import AllBooks from "../Pages/AllBooks";
import MyBook from "../Pages/MyBook";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "../Context/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/add-books",
        element: (
          <PrivateRoute>
            <AddBook></AddBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-book",
        element: <AllBooks></AllBooks>,
        loader: () => fetch("http://localhost:3000/books"),
      },
      {
        path: "/my-books",
        element: (
          <PrivateRoute>
            <MyBook></MyBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/sign-in",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <Register></Register>,
      },
    ],
  },
]);
