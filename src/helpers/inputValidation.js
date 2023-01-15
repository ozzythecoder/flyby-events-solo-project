function validateEmail(email) {
  const isValidEmail = /^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return email.match(isValidEmail)
}

function validatePasswords(pass1, pass2) {
  return pass1 === pass2
}

export { validateEmail, validatePasswords }