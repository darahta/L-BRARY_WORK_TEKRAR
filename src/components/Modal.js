import React from "react";

const Modal = (props) => {
   const { onCancel, onConfirm, title, aciklama } = props;

   return (
      <div
         onClick={onCancel}
         style={{
            position: "absolute",
            top: "0",
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "default",
         }}
      >
         <div
            style={{
               width: "500px",
               padding: "20px",
               background: "white",
               borderRadius: "5px",
            }}
         >
            <h4 className="text-center">{title}</h4>
            <p className="text-center">{aciklama}</p>
            <div className="d-flex justify-content-center mt-2">
               <button
                  onClick={onCancel}
                  className="btn btn-outline-danger btn-sm mx-2"
               >
                  Kapat
               </button>
               <button
                  onClick={onConfirm}
                  className="btn btn-outline-primary btn-sm"
               >
                  Onayla
               </button>
            </div>
         </div>
      </div>
   );
};

export default Modal;
