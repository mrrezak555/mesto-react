import { data } from "autoprefixer";

class Api {
  constructor(option) {
    this._baseUrl = option.baseUrl;
    this._headers = option.headers
  }

  rememberId(id) {
    this.id = id
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Произошла ошибка');
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then(this._checkResponse)
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
  }

  deleteCard() {
    return fetch(`${this._baseUrl}/cards/${this.id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${data}`
      })
    })
      .then(this._checkResponse)
  }

}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-57',
  headers: {
    authorization: '474d22e2-c62e-47b3-b3f1-a0975af088eb',
    'Content-Type': 'application/json'
  }
});

export { api };