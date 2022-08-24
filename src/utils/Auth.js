import DOMAIN from './constants';
// class Auth {
//   constructor({ baseUrl, headers }) {
//     this._headers = headers;
//     this._baseUrl = baseUrl;
//   }

// class Auth {
//   constructor({ domain, headers }) {
//     this._domain = domain;
//     this._headers = headers;
//   }

  class Auth {
    constructor(domain) {
      this._domain = domain;
    }

  

  _handleError(res) {
    return res.ok ? res.json(): Promise.reject(res.status)
  }

  register(email, password) {
    // return fetch(`${this._baseUrl}/signup`, {
    return fetch(`${this._domain}/signup`, {
      method: 'POST',
      // headers: this._headers,
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
      .then(res => this._handleError(res))
  }

  authorize(email, password) {
    // return fetch(`${this._baseUrl}/signin`, {
    return fetch(`${this._domain}/signin`, {
      method: 'POST',
      // headers: this._headers,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
      .then(res => this._handleError(res))
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('email', email);
          return res;
        }
      })
  }

  checkToken(token) {
    // return fetch(`${this._baseUrl}/users/me`, {
    return fetch(`${this._domain}/users/me`, {
      method: 'GET',
      // headers: this._headers,

      // headers: {
      //   ...this._headers,
      //   'Authorization': `Bearer ${token}`
      // }
      headers: {
        authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => this._handleError(res))
      .then(res => res.data)
  }
}

// const auth = new Auth({
//   baseUrl: 'https://auth.nomoreparties.co',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// const auth = new Auth({
//   DOMAIN,
//   headers: {
//     // eslint-disable-next-line no-template-curly-in-string
//     authorization: "Bearer ${token}",
//     "Content-Type": "application/json",
//     'Accept': 'application/json',
//   },
// });


const auth = new Auth(DOMAIN);

export default auth;
