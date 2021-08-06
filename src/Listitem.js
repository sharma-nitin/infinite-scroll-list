import React from "react";
import "./Listitem.css";

function ListItem({ data }) {
  return (
    <div>
        {data.map((item) => (
          <div className='listitem' key={item.id}>
           <p> {item.id} : {item.title}</p>
           <span> {'-'} {item.body}</span>
          </div>
      ))}
    </div>
  );
}

export default ListItem;
