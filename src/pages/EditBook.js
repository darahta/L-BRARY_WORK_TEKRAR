import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useSelector } from "react-redux";
const EditBook = () => {
   const { categoriesState } = useSelector((state) => state);
   const navigate = useNavigate();
   const params = useParams();
   console.log("params", params);

   const [bookname, setBookName] = useState("");
   const [author, setAuthor] = useState("");
   const [isbn, setIsbn] = useState("");
   const [category, setCategory] = useState("");
   //  const [categories, setCategories] = useState(null);
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      axios
         .get(`http://localhost:3004/books/${params.kitapId}`)
         .then((res) => {
            console.log(res.data);
            setBookName(res.data.name);
            setAuthor(res.data.author);
            setIsbn(res.data.isbn);
            setCategory(res.data.categoryId);
            // axios
            //    .get("http://localhost:3004/categories")
            //    .then((res) => {
            //       setCategories(res.data);
            //    })
            //    .catch((err) => console.log("categories err", err));
         })
         .catch((err) => console.log(err));
   }, []);

   const handleSubmit = (event) => {
      event.preventDefault();
      setShowModal(true);
   };
   const editBook = () => {
      if (bookname === "" || author === "" || category === "") {
         alert("Kitap adı, Yazar adı ve Kategoriler boş bırakılamaz");
         return;
      }
      const updateBook = {
         id: params.kitapId,
         name: bookname,
         author: author,
         categoryId: category,
         isbn: isbn,
      };
      axios
         .put(`http://localhost:3004/books/${params.kitapId}`, updateBook)
         .then((res) => {
            console.log(res);
            navigate("/");
            setShowModal(false);
         })
         .catch((err) => console.log(err));
   };
   if (categoriesState.success !== true) {
      return <Loading />;
   }
   return (
      <div>
         <Header />
         <div className="container my-5">
            <form onSubmit={handleSubmit}>
               <div className="row">
                  <div className="col">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Kitap Adı"
                        value={bookname}
                        onChange={(event) => setBookName(event.target.value)}
                     />
                  </div>
                  <div className="col">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Kitap Yazarı"
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                     />
                  </div>
               </div>
               <div className="row my-5">
                  <div className="col">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="ISBN"
                        value={isbn}
                        onChange={(event) => setIsbn(event.target.value)}
                     />
                  </div>
                  <div className="col">
                     <select
                        className="form-select"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                     >
                        <option value={""} selected>
                           Kategori Seçin
                        </option>
                        {categoriesState.categories.map((cat) => {
                           return (
                              <option key={cat.id} value={cat.id}>
                                 {cat.name}
                              </option>
                           );
                        })}
                     </select>
                  </div>
               </div>
               <div className="d-flex justify-content-center">
                  <button
                     onClick={() => navigate("/")}
                     type="button"
                     className="btn btn-outline-danger w-25 me-2"
                  >
                     Vazgeç
                  </button>
                  <button
                     type="submit"
                     className="btn btn-outline-primary w-25"
                  >
                     Kaydet
                  </button>
               </div>
            </form>
         </div>
         {showModal === true && (
            <Modal
               title="Kitap Güncelleme"
               aciklama={`${bookname} = Kitabını güncellemek için eminmisiniz`}
               onCancel={() => setShowModal(false)}
               onConfirm={() => editBook()}
            />
         )}
      </div>
   );
};

export default EditBook;
