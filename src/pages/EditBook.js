import React, { useEffect } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
   const params = useParams();
   console.log("params", params);

   useEffect(() => {
      axios
         .get(`http://localhost:3004/books/${params.kitapId}`)
         .then((res) => {
            console.log(res);
         })
         .catch((err) => console.log(err));
   }, []);

   return (
      <div>
         <Header />
         <h1>edit book</h1>
      </div>
   );
};

export default EditBook;
