import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import AddBook from "./pages/AddBook";
import Home from "./pages/Home";
import EditBook from "./pages/EditBook";
import { useDispatch } from "react-redux";
import axios from "axios";
import CategoriesList from "./pages/CategoriesList";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      //kategories
      dispatch({ type: "FETCH_CATEGORİES_START" });
      axios
         .get("http://localhost:3004/categories")
         .then((res) => {
            dispatch({ type: "FETCH_CATEGORİES_SUCCESS", payload: res.data });
         })
         .catch((err) => {
            dispatch({
               type: "FETCH_CATEGORİES_FAIL",
               payload: "Kategorileri çekerken bir hata oluştu",
            });
         });

      //books
      dispatch({ type: "FETCH_BOOKS_START" });
      axios
         .get("http://localhost:3004/books")
         .then((res) => {
            dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: res.data });
         })
         .catch({
            type: "FETCH_BOOKS_FAIL",
            payload: "Kitapları çekerken hata oluştu",
         });
   }, []);

   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="edit-book/:kitapId" element={<EditBook />} />
            <Route path="categories" element={<CategoriesList />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route
               path="/edit-category/:categoryId"
               element={<EditCategory />}
            />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
