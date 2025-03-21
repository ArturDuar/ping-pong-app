
import Link from "next/link";
import React from "react";

export function OpcionCard({icon, title, link}){
    
    return(
        <Link href={link}>
            <div className="card h-100 m-auto">           
            <div className="h-100">{icon}</div>
            <button className="card-button">{title}</button>
            </div>
        </Link>
    )
    
}