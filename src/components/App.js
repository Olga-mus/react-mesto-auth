// import logo from './logo.svg';
// import avatar from '../images/profile-avatar.jpg';
import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import Card from "./Card";
import { useState } from "react";

function App() {
  const [isEditAvatarPopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditAvatarClick = () => {
    setIsEditProfilePopupOpen(true); //переменные состояния, отвечающие за видимость
  };

  const handleEditProfileClick = () => {
    setIsEditAvatarPopupOpen(true); //переменные состояния, отвечающие за видимость
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true); //переменные состояния, отвечающие за видимость
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  //закрытие попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

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
        title="Редактировать профиль"
        name="edit-profile"
        button="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__profile">
          <label className="popup__field">
            <input
              id="firstname"
              type="text"
              name="firstname"
              placeholder="Введите имя"
              className="popup__input popup__input_type_name"
              required
              minLength="2"
              maxLength="40"
            />
            <span className="firstname-error popup__error-message"></span>
          </label>
          <label className="popup__field">
            <input
              id="proffesion"
              type="text"
              name="proffesion"
              placeholder="Введите вид деятельности"
              className="popup__input popup__input_type_job"
              required
              minLength="2"
              maxLength="200"
            />
            <span className="proffesion-error popup__error-message"></span>
          </label>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        name="place"
        button="Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__profile">
          <label className="popup__field">
            <input
              id="card"
              type="text"
              name="name"
              placeholder="Название"
              className="popup__input popup__input_type_card"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="card-error popup__error-message"></span>
          </label>
          <label className="popup__field">
            <input
              id="link"
              type="url"
              name="link"
              placeholder="Ссылка на картинку"
              className="popup__input popup__input_type_link"
              required
            />
            <span className="link-error popup__error-message"></span>
          </label>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title="Вы уверены"
        name="delete-confirm"
        button="Да"
        onClose={closeAllPopups}
      ></PopupWithForm>

      <PopupWithForm
        title="Обновить аватар"
        name="edit-profile"
        button="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__profile">
          <label className="popup__field">
            <input
              id="avatar"
              type="url"
              name="avatar"
              placeholder="Ссылка на картинку"
              className="popup__input popup__input_type_link"
              required
            />
            <span className="avatar-error popup__error-message"></span>
          </label>
        </fieldset>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
    </div>
  );
}

export default App;

{
  /* <div className="popup popup_input-window" id="popup_edit-profile">
        <div className="popup__container">
          <button className="popup__close-button"></button>
          <form id="form__edit-profile" className="popup__form" name="edit_profile" noValidate>
            <h3 className="popup__title">Редактировать профиль</h3>
            <fieldset className="popup__profile">
              <label className="popup__field">
                <input id="firstname" type="text" name="firstname" placeholder="Введите имя" className="popup__input popup__input_type_name" required minLength="2" maxLength="40" />
                <span className="firstname-error popup__error-message"></span>
              </label>
              <label className="popup__field">
                <input id="proffesion" type="text" name="proffesion" placeholder="Введите вид деятельности" className="popup__input popup__input_type_job" required minLength="2" maxLength="200" />
                <span className="proffesion-error popup__error-message"></span>
              </label>
            </fieldset>
            <button id="submit_edit-profile" type="submit" className="popup__save-button">Сохранить</button>
          </form>
        </div>
      </div>



      <div className="popup popup_input-window" id="popup_place">
        <div className="popup__container">
          <button className="popup__close-button popup__close-button_place"></button>
          <form className="popup__form popup__form_place" name="add_place" noValidate>
            <h3 className="popup__title">Новое место</h3>
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
            <button type="submit" className="popup__save-button">Сохранить</button>
          </form>
        </div>
      </div>

      <div className="popup popup_input-window popup_delete-confirm">
        <div className="popup__container">
          <button className="popup__close-button popup__close-button_place"></button>
          <form className="popup__form popup__form_delete-confirm" name="delete-confirm" noValidate>
            <h3 className="popup__title popup__title_confirm">Вы уверены?</h3>
            <button type="submit" className="popup__save-button popup__save-button_confirm">Да</button>
          </form>
        </div>
      </div>


      <div className="popup popup_input-window popup_edit-avatar">
        <div className="popup__container">
          <button className="popup__close-button popup__close-button_place"></button>
          <form className="popup__form popup__form_place" name="update_avatar" noValidate>
            <h3 className="popup__title">Обновить аватар</h3>
            <fieldset className="popup__profile">
              <label className="popup__field">
                <input id="avatar" type="url" name="avatar" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" required />
                <span className="avatar-error popup__error-message"></span>
              </label>
            </fieldset>
            <button type="submit" className="popup__save-button">Сохранить</button>
          </form>
        </div>
      </div> */
}

{
  /* <div className="popup popup_image">
        <figure className="popup__info">
          <button className="popup__close-button"></button>
          <img className="popup__view" />
          <figcaption>
            <p className="popup__image-title"></p>
          </figcaption>
        </figure>
      </div>
    </div> */
}
