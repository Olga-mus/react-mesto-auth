// import logo from './logo.svg';
// import avatar from '../images/profile-avatar.jpg';
import React from "react";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import PopupWithForm from './PopupWithForm';
import Card from './Card';
import {useState} from "react";


function App() {

  const [isEditAvatarPopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);










const handleEditAvatarClick = () => {
  setIsEditProfilePopupOpen(true); //переменные состояния, отвечающие за видимость
}

const handleEditProfileClick = () =>{
  setIsEditAvatarPopupOpen(true)//переменные состояния, отвечающие за видимость
}

const handleAddPlaceClick = () =>{
  setIsAddPlacePopupOpen(true)//переменные состояния, отвечающие за видимость
}

const handleCardClick = (card) => {
  setSelectedCard(card)
}



//закрытие попапов
const closeAllPopups = () => {
  setIsEditProfilePopupOpen(false);
  setIsEditAvatarPopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setSelectedCard(null);
}

  return (
    <div className="page__container">

      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}


        />

      <Footer />

      <PopupWithForm
        title = "Редактировать профиль"
        name = "edit-profile"
        button = "Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        >
          <fieldset className="popup_profile">

          <label className="popup__field">
             <input id="firstname" type="text" name="firstname" placeholder="Введите имя" className="popup__input popup__input_type_name" required minLength="2" maxLength="40" />
              <span className="firstname-error popup__error-message"></span>
                </label><label className="popup__field">
                  <input id="proffesion" type="text" name="proffesion" placeholder="Введите вид деятельности" className="popup__input popup__input_type_job" required minLength="2" maxLength="200" />
              <span className="proffesion-error popup__error-message"></span>
          </label>
          </fieldset>

        </PopupWithForm>

       <PopupWithForm
        title = "Новое место"
        name = "place"
        button = "Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        >

            <fieldset className="popup__profile">
              <label className="popup__field">
                <input id="card" type="text" name="name" placeholder="Название" className="popup__input popup__input_type_card" required minLength="2" maxLength="30" />
                <span className="card-error popup__error-message"></span>
              </label>
              <label className="popup__field">
                <input id="link" type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" required />
                <span className="link-error popup__error-message"></span>
              </label>
            </fieldset>
        </PopupWithForm>

      {/* <PopupWithForm
        title = "Вы уверены"
        name = "delete-confirm"
        button = "Да"
        onClose={closeAllPopups}
        ></PopupWithForm> */}

      <PopupWithForm
       title = "Обновить аватар"
       name = "edit-profile"
       button = "Сохранить"
       isOpen={isEditAvatarPopupOpen}
       onClose={closeAllPopups}
       >
          <fieldset className="popup__profile">
              <label className="popup__field">
                <input id="avatar" type="url" name="avatar" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" required />
                <span className="avatar-error popup__error-message"></span>
              </label>
          </fieldset>

      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      >
      </ImagePopup>



    </div>

  );
}

export default App;


   
