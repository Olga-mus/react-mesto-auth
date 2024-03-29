export class Auth {
  constructor(config) {
      this.baseURL = config.baseURL
  }

  _handleError(res) {
    return res.ok ? res.json() : Promise.reject(res.status)
  }

  register(email, password) {
    return fetch(`${this.baseURL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => this._handleError(res))
  }

  authorize(email, password) {
    return fetch(`${this.baseURL}/signin`, {
      method: 'POST',
      credentials: 'include',
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
    return fetch(`${this.baseURL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => this._handleError(res))
      .then(res => res.data)
  }
}

export const auth = new Auth({
  baseURL: 'https://api.tritonanta.nomoredomains.sbs',
})
