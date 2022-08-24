import DOMAIN from './constants';
// export default class Api {
//   constructor({ baseUrl, headers }) {
//     this._headers = headers;
//     this._baseUrl = baseUrl;
//     // тело конструктора
//   }

class Api {
  constructor(domain) {
    this._domain = domain;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getProfile(token) {
    return fetch(`${this._domain}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  getInitialCards(token) {
    return fetch(`${this._domain}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  editProfile({ name, about, token }) {
    return fetch(`${this._domain}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  addCard({ name, link, token}) {
    return fetch(`${this._domain}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id, token) {
    return fetch(`${this._domain}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  deleteLike(id, token) {
    return fetch(`${this._domain}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  addLike(id, token) {
    return fetch(`${this._domain}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  updateAvatar(avatar, token) {
    return fetch(`${this._domain}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id);
    } else {
      return this.deleteLike(id);
    }
  }
}

// export const api = new Api({
//   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-40",
//   headers: {
//     authorization: "67913aac-b670-497b-b2dd-e50632dce1ee",
//     "Content-Type": "application/json",
//   },
// });//


export const api = new Api(DOMAIN);
// export default api;

// export const api = new Api(DOMAIN);
