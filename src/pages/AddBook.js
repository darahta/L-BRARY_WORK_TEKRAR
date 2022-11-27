import React, { useEffect } from "react";
import Header from "../components/Header";
import AddBookForm from "./AddBookForm";

const AddBook = () => {
   useEffect(() => {
      document.title = "Kitaplık - Kitap Ekle";
   }, []);
   return (
      <div>
         <Header />
         <AddBookForm />
      </div>
   );
};

export default AddBook;
