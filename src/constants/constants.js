module.exports = {
    defaultServerResponse: {
      status: 400,
      message: '',
      body: {}
    },
    userMessage: {
      LOGIN_SUCCESS: 'Login Success',
      DUPLICATE_EMAIL: 'User already exist with given email',
      USER_NOT_FOUND: 'User not found',
      INVALID_PASSWORD: 'Incorrect Password',
      SIGNUP_SUCCESS: "Signup and Authenticated Successfully"
    },
    requestValidationMessage: {
      BAD_REQUEST: 'Invalid fields',
      TOKEN_MISSING: 'Token missing from header'
    },
    databaseMessage: {
      INVALID_ID: 'Invalid Id'
    },
    serverMessage: {
      SERVERERROR: 'Something Went Wrong : Service -'
    }
  }