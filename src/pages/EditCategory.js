import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditCategory = () => {
   const navigate = useNavigate();
   const params = useParams();
   const dispatch = useDispatch();
   const [category, setCategory] = useState(null);
   const [allCategories, setAllCategories] = useState(null);
   const [newCategoryName, setNewCategoryName] = useState("");

   useEffect(() => {
      axios
         .get(`http://localhost:3004/categories`)
         .then((res) => {
            // console.log("paramscategory", res.data);
            setAllCategories(res.data);
            const myCategory = res.data.find(
               (item) => item.id == params.categoryId
            );
            setCategory(myCategory);
            setNewCategoryName(myCategory.name);
         })
         .catch((err) => console.log(err));
   }, []);

   const handleEdit = (event) => {
      event.preventDefault();
      if (newCategoryName === "") {
         alert("Kategori ismi boş bırakılamaz");
         return;
      }
      const hasCategory = allCategories.find(
         (item) =>
            item.name.toLowerCase() === newCategoryName.toLocaleLowerCase()
      );
      console.log("hascategoy", hasCategory);
      if (hasCategory !== undefined) {
         alert("Bu kategori ismi zaten mevcut");
         return;
      }
      const newCategory = {
         ...category,
         name: newCategoryName,
      };
      axios
         .put(`http://localhost:3004/categories/${category.id}`, newCategory)
         .then((res) => {
            console.log(res.data);
            dispatch({ type: "EDIT_CATEGORY", payload: newCategory });
            navigate("/Categories");
         })
         .catch((err) => console.log(err));
   };

   if (allCategories === null) {
      return <h>Loading</h>;
   }

   return (
      <div>
         <Header />
         <div className="container my-5">
            <form onSubmit={handleEdit}>
               <div className="mb-3 text-center">
                  <label for="exampleInputEmail1" className="form-label">
                     Kategori İsmi
                  </label>
                  <input
                     type="text"
                     className="form-control"
                     id="exampleInputEmail1"
                     value={newCategoryName}
                     onChange={(event) =>
                        setNewCategoryName(event.target.value)
                     }
                  />
               </div>

               <div className="mb-3 d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                     Kaydet
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};
export default EditCategory;
