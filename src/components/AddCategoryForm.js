import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddCategoryForm = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { categoriesState } = useSelector((state) => state);
   const [categoryName, setCategoryName] = useState("");

   useEffect(() => {
      document.title = "Kitaplık - Kategori Ekle";
   }, []);

   const handleSubmit = (event) => {
      event.preventDefault();

      if (categoryName === "") {
         alert("Kategori ismi boş bırakılamaz");
         return;
      }
      const hasCategory = categoriesState.categories.find(
         (item) => item.name.toLowerCase() === categoryName.toLowerCase()
      );
      if (hasCategory !== undefined) {
         alert("Bu kategori zaten kayıtlıdır");
         return;
      }

      const newCategory = {
         id: new Date().getTime(),
         name: categoryName[0].toUpperCase() + categoryName.substring(1),
      };

      axios
         .post("http://localhost:3004/categories", newCategory)
         .then((res) => {
            console.log(res.data);
            dispatch({ type: "ADD_CATEGORY", payload: newCategory });
            navigate("/categories");
         })
         .catch((err) => console.log(err));
   };
   return (
      <div className="container my-5">
         <form onSubmit={handleSubmit}>
            <div className="mb-3 text-center">
               <label for="exampleInputEmail1" className="form-label">
                  Kategori İsmi
               </label>
               <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={categoryName}
                  onChange={(event) => setCategoryName(event.target.value)}
               />
            </div>

            <div className="mb-3 d-flex justify-content-center">
               <button type="submit" className="btn btn-primary">
                  Kaydet
               </button>
            </div>
         </form>
      </div>
   );
};

export default AddCategoryForm;
