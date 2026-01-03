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
import BookDetails from "../Pages/BookDetails";
import UpdateBooks from "../Pages/UpdateBooks";
import ErrorPage from "../Pages/ErrorPage";
import MyProfile from "../Pages/MyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () => fetch("https://my-library-orpin.vercel.app/latest-books"),
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/my-profile",
        element: <MyProfile></MyProfile>,
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
        path: "/book-details/:id",
        element: (
            <BookDetails></BookDetails>
        ),
      },
      {
        path: "/all-book",
        element: <AllBooks></AllBooks>,
        loader: () => fetch("https://my-library-orpin.vercel.app/books"),
      },
      {
        path: "/update-books/:id",
        element: (
          <PrivateRoute>
            <UpdateBooks></UpdateBooks>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://my-library-orpin.vercel.app/books/${params.id}`),
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
