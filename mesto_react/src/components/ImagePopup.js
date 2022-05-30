import React from "react";
import logo from '../images/header-logo.svg'

function ImagePopup() {
    return (
        
        <div className="popup popup_image">
          <figure className="popup__info">
            <button className="popup__close-button"></button>
              <img className="popup__view" />
           <figcaption>
            <p className="popup__image-title"></p>
           </figcaption>
          </figure>
       </div>
     
     
    )   
}

export default ImagePopup;