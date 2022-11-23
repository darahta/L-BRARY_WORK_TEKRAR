import React from "react";
import Header from "../components/Header";
import AddBookForm from "./AddBookForm";

const AddBook = () => {
   return (
      <div className="container my-5">
         <Header />
         <AddBookForm />
      </div>
   );
};

export default AddBook;
