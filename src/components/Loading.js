import React from "react";

const Loading = () => {
   return (
      <div
         style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <div
            style={{ width: "50px", height: "50px" }}
            class="spinner-border text-success"
            role="status"
         >
            <span class="visually-hidden">Loading...</span>
         </div>
      </div>
   );
};

export default Loading;
