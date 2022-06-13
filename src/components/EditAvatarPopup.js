import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar:
        avatarRef.current
          .value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-profile"
      button="Сохранить"
      onSubmit={handleSubmit}
      // isOpen={isEditAvatarPopupOpen}
      // onClose={closeAllPopups}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <fieldset className="popup__profile">
        <label className="popup__field">
          <input
            ref={avatarRef}
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
  );
}

export default EditAvatarPopup;
