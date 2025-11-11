import React, { use, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";


const AddBook = () => {
   const { user } = useContext(AuthContext);
   
  return (
    <div>
      Add Books
 
    </div>
  );
};

export default AddBook;
