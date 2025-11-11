import React from "react";
import { useLoaderData } from "react-router";
import AllBooksTable from "../Components/AllBooksTable";

const AllBooks = () => {
  const data = useLoaderData();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-6">
        All Books
      </h2>
      <AllBooksTable books={data} />
    </div>
  );
};

export default AllBooks;
