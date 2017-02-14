import * as types from '../actionTypes'
import * as api from './api'
import {beginRequest, completeRequest, thrownRequest} from '../requests/actions'
import {getUserFormData} from '../userForm/access'

export function loadUsersSuccess (users) {
  return { type: types.LOAD_USERS_SUCCESS, users }
}

export function loadUserSuccess (user) {
  return { type: types.LOAD_USER_SUCCESS, user }
}

export function createUserSuccess (user) {
  return { type: types.CREATE_USER_SUCCESS, user }
}

export function updateUserSuccess (user) {
  return { type: types.UPDATE_USER_SUCCESS, user }
}

export function setFormUser (user) {
  return { type: types.SET_FORM_USER, user }
}

export function setEmptyFormUser () {
  return { type: types.SET_EMPTY_FORM_USER }
}

export function updateFormUser ({ target: { name, value } }) {
  return { type: types.UPDATE_FORM_USER, property: name, value }
}

export function loadUsers () {
  return function (dispatch) {
    dispatch(beginRequest())
    return api.getUsers()
    .then(users => {
      dispatch(loadUsersSuccess(users))
      dispatch(completeRequest())
    })
    .catch(e => {
      dispatch(thrownRequest())
      throw Error(e)
    })
  }
}

export function loadUser (id) {
  return function (dispatch) {
    dispatch(beginRequest())
    return api.getUser(id)
    .then(user => {
      dispatch(loadUserSuccess(user))
      dispatch(completeRequest())
    })
    .catch(e => {
      dispatch(thrownRequest())
      throw Error(e)
    })
  }
}

export function saveUser () {
  return function (dispatch) {
    var user = getUserFormData().user
    dispatch(beginRequest())
    return api.saveUser(user)
    .then(savedUser => {
      user.id
      ? dispatch(updateUserSuccess(savedUser))
      : dispatch(createUserSuccess(savedUser))
      dispatch(completeRequest())
    })
    .catch(e => {
      dispatch(thrownRequest())
      throw Error(e)
    })
  }
}
