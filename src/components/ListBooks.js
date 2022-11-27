import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Delete from "../components/delete.svg";
import Pencil from "../components/pencil.svg";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";

const ListBooks = (props) => {
   const dispatch = useDispatch();
   const { categoriesState, booksState } = useSelector((state) => state);
   console.log("listbooks", categoriesState);
   console.log("booksState", booksState);
   const [filterBbooks, setFilterBooks] = useState(null);
   // const [categories, setCategories] = useState(null);
   const [didUpdate, setDidUpdate] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [silinecekKitap, setSilinecekKitap] = useState(null);
   const [silinecekKitapIsmi, setSilinecekKitapIsmi] = useState("");
   const [searchText, setSearchText] = useState("");

   useEffect(() => {
      const filteder = booksState.books.filter((item) =>
         item.name.toLowerCase().includes(searchText)
      );
      setFilterBooks(filteder);
   }, [searchText]);

   const KitapSil = (id) => {
      console.log(id);
      axios
         .delete(`http://localhost:3004/books/${id}`)
         .then((res) => {
            setDidUpdate(!didUpdate);
            setShowModal(false);
            dispatch({ type: "DELETE_BOOK", payload: id });
         })
         .catch((err) => console.log(err));
   };

   if (
      booksState.success !== true ||
      categoriesState.success !== true ||
      filterBbooks === null
   ) {
      return (
         <div>
            <Loading />
         </div>
      );
   }

   return (
      <div className="container my-5">
         <div className="my-3 d-flex justify-content-between ">
            <div className="w-50">
               <input
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Aranacak kitap listesi"
                  type="text"
                  className="form-control w-100"
               />
            </div>
            <Link to="/add-book" className="btn btn-primary">
               Kitap Ekle
            </Link>
         </div>
         <table className="table">
            <thead>
               <tr className="text-center">
                  <th scope="col">Kitap Adı</th>
                  <th scope="col">Yazar</th>
                  <th scope="col">Kategori</th>
                  <th scope="col">ISBN</th>
                  <th scope="col">İşlem</th>
               </tr>
            </thead>
            <tbody>
               {filterBbooks.map((book) => {
                  const category = categoriesState.categories.find(
                     (cat) => cat.id == book.categoryId
                  );
                  return (
                     <tr className="text-center" key={book.id}>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{category.name}</td>
                        <td>{book.isbn === "" ? "-" : book.isbn}</td>
                        <td>
                           <div className="btn-group">
                              <div
                                 type="button"
                                 className="mx-2 btn-sm"
                                 onClick={() => {
                                    setShowModal(true);
                                    setSilinecekKitap(book.id);
                                    setSilinecekKitapIsmi(book.name);
                                    // KitapSil(book.id);
                                 }}
                              >
                                 <img src={Delete} />
                              </div>
                              <Link
                                 to={`edit-book/${book.id}`}
                                 className="btn-sm"
                              >
                                 <img src={Pencil} />
                              </Link>
                           </div>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
         {showModal === true && (
            <Modal
               aciklama={"silmek istediğinize emin misiniz?"}
               title={silinecekKitapIsmi}
               onConfirm={() => KitapSil(silinecekKitap)}
               onCancel={() => setShowModal(false)}
            />
         )}
      </div>
   );
};

export default ListBooks;
