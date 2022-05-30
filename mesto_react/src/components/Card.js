import React from "react";


function Card({card}) {
    console.log({card});
    return (
        
      <div className="element">
<figure className="element__card">
  {/* <img src="./images/elements-karachaevsk.jpg" alt="Карачаевск" className="element__image"/> */}
  <img src={card.link} alt={card.name} className="element__image"/>
  <figcaption>
    {/* <h2 className="element__title">Карачаевск</h2> */}
    <h2 className="element__title">{card.name}</h2>
  </figcaption>
</figure>
<button className="element__button-like">
</button>
<button className="element__button-delete">
  {/* <img className="element__delete" src="<%=require('./images/element-delete.svg')%>" alt="Удалить"/> */}
  <img className="element__delete" style={{ backgroundImage: `url(${card})` }}alt="Удалить"/>
</button>
<span className="element__like-count">{card.likes.length}</span>
</div>
     
     
    )   
}

export default Card;