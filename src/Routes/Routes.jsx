import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";
import AddBook from "../Pages/AddBook";
import AllBooks from "../Pages/AllBooks";
import MyBook from "../Pages/MyBook";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

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
        element: <AddBook></AddBook>,
      },
      {
        path: "/all-book",
        element: <AllBooks></AllBooks>,
      },
      {
        path: "/my-books",
        element: <MyBook></MyBook>,
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
