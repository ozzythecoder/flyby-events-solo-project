function validateEmail(email) {
  const isNotEmail = /^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return !email.match(isNotEmail)
}

function validatePasswords(pass1, pass2) {
  return pass1 === pass2
}

export { validateEmail, validatePasswords }