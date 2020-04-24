

export const USER_VALIDATIONS = {
  EMAIL_MIN: 5,
  EMAIL_MAX: 255,
  USER_NAME_MIN: 5,
  USER_NAME_MAX: 100,
  PASSWORD_MIN: 3,
  PASSWORD_MAX: 50,
};

export const USER_ERR_MESSAGES = {
  FORGOT_PASSWORD_EXPIRED_KEY: "Forgot link has expired",
  INVALID_CREDENTIALS: "invalid credentials",
  CONFIRM_EMAIL: "please confirm your email",
  FORGOT_PASSWORD_ACCOUNT_LOCKED: "account is locked",
  DUPLICATE_EMAIL: "Email already exists",
  DUPLICATE_USER_NAME: "User Name already exists",
  LOGIN_OR_REGISTER: "Please Login or Register",
  USER_NOT_FOUND: "could not find user with that email",
  USER_NOT_EXIST: "User does not exist anymore",
  USER_NOT_AUTHORISED: "user not authorised to make specified changes",
  INVALID_EMAIL_FORMAT: "email must be in valid format",
  EMAIL_NOT_VALID: `Email should be between ${USER_VALIDATIONS.EMAIL_MIN} and 
		${USER_VALIDATIONS.EMAIL_MAX} characters`,
  PASSWORD_NOT_VALID: `Password should be between ${USER_VALIDATIONS.PASSWORD_MIN} and 
		${USER_VALIDATIONS.PASSWORD_MAX} characters`,
  USER_NAME_NOT_VALID: `User name should be between ${USER_VALIDATIONS.USER_NAME_MIN} and 
		${USER_VALIDATIONS.USER_NAME_MAX} characters`,
};
