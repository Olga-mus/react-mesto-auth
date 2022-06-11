// import logo from './logo.svg';
// import avatar from '../images/profile-avatar.jpg';
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
// import EditAvatarPopup from "./EditAvatarPopup";
// import Card from "./Card";
import { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {api} from "../utils/Api";


function App() {
  const [isEditAvatarPopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setNewCards] = useState([]);
  
  const [currentUser , setCurrentUser ] = useState({});

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setNewCards(res)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [])


  React.useEffect(() => {
    api.getProfile()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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

  // function handleCardLike(card) {
  //   // Снова проверяем, есть ли уже лайк на этой карточке
  //   const isLiked = card.likes.some(i => i._id === currentUser._id);
    
  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
  //     setNewCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  //   });
  // }

  // function handleCardDelete(card) {
  // }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
      setNewCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setNewCards((cards) => cards.filter((c) => c._id !== card._id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateUser(user){
    api.editProfile(user.name,user.about)
    .then ((res)=>{
        setCurrentUser(res);
        closeAllPopups();
    })
    .catch(err=>console.log(err))

    function handleUpdateAvatar({avatar}) {
      api.updateAvatar(avatar)
        .then((res) => {
          setCurrentUser(res)
          closeAllPopups()
        })
        .catch((err) => {
          console.log(err)
        })
    
}

  
  

  //закрытие попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>

    <div className="page__container">
      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />

      <Footer />

      <EditProfilePopup 
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
       />

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

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar} 
        />

{/* <PopupWithForm
    title="Обновить аватар"
    name="edit-profile"
    button="Сохранить"
    // isOpen={isEditAvatarPopupOpen}
    // onClose={closeAllPopups}
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
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
  </PopupWithForm> */}

      <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
    </div>
    </CurrentUserContext.Provider>
  );
}
}
export default App;




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
    // }

    // {
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
    // }
    