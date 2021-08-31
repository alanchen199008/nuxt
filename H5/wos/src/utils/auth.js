import Cookies from 'js-cookie'

const TokenKey = 'FBAPPH_TOKEN'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setSession(key, value) {
  sessionStorage.setItem(key, value)
}

export function getSession(key) {
  return sessionStorage.getItem(key)
}

export function clearSession() {
  sessionStorage.clear()
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, value)
}

export function getLocalStorage(key) {
  return localStorage.getItem(key)
}
