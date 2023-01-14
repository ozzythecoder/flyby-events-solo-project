import { useDispatch } from "react-redux"

const dispatch = useDispatch();

function validateEmail(email) {
  const isNotEmail = /^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  dispatch({ type: 'INVALID_EMAIL' })
  return !email.match(isNotEmail)
}

function validatePasswords(pass1, pass2) {
  if (pass1 !== pass2) {
    dispatch({ type: 'PASSWORDS_DO_NOT_MATCH' })
    return false;
  }
  return true;
}

export { validateEmail, validatePasswords }