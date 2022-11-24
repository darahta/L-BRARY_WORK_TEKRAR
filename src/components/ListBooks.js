import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import components from "../components/delete.svg";
import pencil from "../components/pencil.svg";
import Modal from "./Modal";
import { useSelector } from "react-redux";

const ListBooks = (props) => {
   const { categoriesState } = useSelector((state) => state);
   console.log("listbooks", categoriesState);
   const [books, setBooks] = useState(null);
   // const [categories, setCategories] = useState(null);
   const [didUpdate, setDidUpdate] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [silinecekKitap, setSilinecekKitap] = useState(null);
   const [silinecekKitapIsmi, setSilinecekKitapIsmi] = useState("");

   useEffect(() => {
      axios
         .get("http://localhost:3004/books")
         .then((resBook) => {
            console.log(resBook.data);
            setBooks(resBook.data);
            // axios
            //    .get("http://localhost:3004/categories")
            //    .then((resCat) => {
            //       setCategories(resCat.data);
            //    })
            //    .catch((err) => console.log("categories err", err));
         })

         .catch((err) => console.log("book err", err));
   }, [didUpdate]);

   const KitapSil = (id) => {
      console.log(id);
      axios
         .delete(`http://localhost:3004/books/${id}`)
         .then((res) => {
            setDidUpdate(!didUpdate);
            setShowModal(false);
         })
         .catch((err) => console.log(err));
   };

   if (books === null || categoriesState.success !== true) {
      return (
         <div>
            <Loading />
         </div>
      );
   }

   return (
      <div className="container my-5">
         <div className="my-3 d-flex justify-content-end ">
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
               {books.map((book) => {
                  const category = categoriesState.categories.find(
                     (cat) => cat.id === book.categoryId
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
                                 <img src={components} />
                              </div>
                              <Link
                                 to={`edit-book/${book.id}`}
                                 className="btn-sm"
                              >
                                 <img src={pencil} />
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
