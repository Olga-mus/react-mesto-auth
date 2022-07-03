import React from "react";

function PopupWithForm(props) {
  const popupVisible = props.isOpen ? 'popup_opened' : ''; //видимость попапов
    return (
     
        // <div className="popup popup_input-window" id="popup_edit-profile">
        // <div className="popup popup_input-window "  id={`popup__${props.name}`}>
        <div className={`popup popup_input-window ${popupVisible}`}  id={`popup__${props.name}`}>
        <div className="popup__container">
          {/* <button className="popup__close-button"></button> */}
          <button onClick={props.onClose} className="popup__close-button" ></button>
          {/* <form id="form__edit-profile" className="popup__form" name="edit_profile" noValidate> */}
          {/* <form id={`form__${props.name}`} className="popup__form" name="edit_profile" noValidate> */}
          <form id={`form__${props.name}`} className="popup__form" name={props.name} noValidate>
          {/* <form id="form__edit-profile" className="popup__form" name={props.name} noValidate> */}
            {/* <h3 className="popup__title">Редактировать профиль</h3> */}
            <h3 className="popup__title">{props.title}</h3>
           
            {props.children}
           
            {/* <button id="submit_edit-profile" type="submit" className="popup__save-button">Сохранить</button> */}
            {/* <button id="submit_edit-profile" type="submit" className="popup__save-button">{props.button}</button> */}
            <button id={`submit__${props.name}`} type="submit" className="popup__save-button">{props.button}</button>
          </form>
        </div>
      </div>


        
    )   
}

export default PopupWithForm;