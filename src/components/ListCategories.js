import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Delete from "../components/delete.svg";
import Pencil from "../components/pencil.svg";
import Modal from "./Modal";
import axios from "axios";

const ListCategories = () => {
   const dispatch = useDispatch();
   const { categoriesState, booksState } = useSelector((state) => state);
   const [showDeleteModal, setDeleteShowModal] = useState(false);
   const [silinecekCategory, setSilinecekCategory] = useState(null);
   const [silinecekCategoryName, setSilinecekCategoryName] = useState("");

   useEffect(() => {
      document.title = "Kitaplık - Kategoriler";
   }, []);

   const categorySil = (id) => {
      axios
         .delete(`http://localhost:3004/categories/${id} `)
         .then((res) => {
            console.log(res.data);
            dispatch({ type: "DELETE_CATEGORY", payload: id });
            const booksHasCategory = booksState.books.filter(
               (item) => item.categoryId == id
            );
            console.log("bookshascategoyr", booksHasCategory);
            booksHasCategory.map((item) =>
               dispatch({ type: "DELETE_BOOK", payload: item.id })
            );
         })
         .catch((err) => console.log(err));
   };

   if (categoriesState.success !== true) {
      return <Loading />;
   }

   return (
      <div className="container my-5">
         <div className="my-3 d-flex justify-content-end ">
            <Link to="/add-category" className="btn btn-primary">
               Kategori Ekle
            </Link>
         </div>
         <table className="table">
            <thead>
               <tr className="text-center">
                  <th scope="col">Kategori Ekle</th>

                  <th scope="col">İşlem</th>
               </tr>
            </thead>
            <tbody>
               {categoriesState.categories.map((category) => {
                  return (
                     <tr className="text-center" key={category.id}>
                        <td>{category.name}</td>

                        <td>
                           <div className="btn-group">
                              <div
                                 type="button"
                                 className="mx-2 btn-sm"
                                 onClick={() => {
                                    setDeleteShowModal(true);
                                    setSilinecekCategory(category.id);
                                    setSilinecekCategoryName(category.name);
                                    // KitapSil(book.id);
                                 }}
                              >
                                 {<img src={Delete} />}
                              </div>
                              <Link
                                 to={`/edit-category/${category.id}`}
                                 className="btn btn-sm"
                              >
                                 {<img src={Pencil} />}
                              </Link>
                           </div>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
         {showDeleteModal === true && (
            <Modal
               aciklama={"silmek istediğinize emin misiniz?"}
               title={silinecekCategoryName}
               onConfirm={() => categorySil(silinecekCategory)}
               onCancel={() => setDeleteShowModal(false)}
            />
         )}
      </div>
   );
};

export default ListCategories;
