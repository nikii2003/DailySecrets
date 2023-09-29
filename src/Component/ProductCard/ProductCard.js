import React from "react";
import "./ProductCard.css";

export const ProcuctCard =({ProductName})=>{
    return(
   <div className="product-card">
   {ProductName}
   </div>
    )
}