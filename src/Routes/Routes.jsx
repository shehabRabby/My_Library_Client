import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/DashboardLayout";
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
import Support from "../Pages/Support";
import DashboardHome from "../Pages/DashboardHome";

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
        path: "about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "support-us",
        element: <Support></Support>,
      },
      {
        path: "book-details/:id",
        element: <BookDetails></BookDetails>,
      },
      {
        path: "all-book",
        element: <AllBooks></AllBooks>,
        loader: () => fetch("https://my-library-orpin.vercel.app/books"),
      },
      {
        path: "sign-in",
        element: <Login></Login>,
      },
      {
        path: "sign-up",
        element: <Register></Register>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true, 
        element: <DashboardHome />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "add-books",
        element: <AddBook />,
      },
      {
        path: "my-books",
        element: <MyBook />,
      },
      {
        path: "update-books/:id",
        element: <UpdateBooks />,
        loader: ({ params }) =>
          fetch(`https://my-library-orpin.vercel.app/books/${params.id}`),
      },
    ],
  },
]);