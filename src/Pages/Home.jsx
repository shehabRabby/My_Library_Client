import React from "react";
import { useLoaderData } from "react-router";
import LatestBooks from "../Components/LatestBooks";

const Home = () => {
  const data = useLoaderData();
  return (
    <div>
      
      <LatestBooks data={data}></LatestBooks>

    </div>
  );
};

export default Home;
