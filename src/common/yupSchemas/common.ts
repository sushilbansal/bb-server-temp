import * as yup from "yup";

export const COMMON_VALIDATIONS = {
  EMAIL_MIN: 5,
  EMAIL_MAX: 255,
  PASSWORD_MIN: 3,
  PASSWORD_MAX: 50
};

export const COMMON_ERR_MESSAGES = {
  FORGOT_PASSWORD_EXPIRED_KEY: "Forgot link has expired",
  INVALID_CREDENTIALS: "invalid credentials",
  CONFIRM_EMAIL: "please confirm your email",
  FORGOT_PASSWORD_ACCOUNT_LOCKED: "account is locked",
  DUPLICATE_EMAIL: "Email already exists",
  LOGIN_OR_REGISTER: "Please Login or Register",
  INVALID_EMAIL_FORMAT: "email must be in valid format",
  EMAIL_NOT_VALID: `Email should be between ${COMMON_VALIDATIONS.EMAIL_MIN} and 
		${COMMON_VALIDATIONS.EMAIL_MAX} characters`,
  PASSWORD_NOT_VALID: `Password should be between ${COMMON_VALIDATIONS.PASSWORD_MIN} and 
		${COMMON_VALIDATIONS.PASSWORD_MAX} characters`
};

export const emailValidation = yup
  .string()
  .required()
  .min(COMMON_VALIDATIONS.EMAIL_MIN, COMMON_ERR_MESSAGES.EMAIL_NOT_VALID)
  .max(COMMON_VALIDATIONS.EMAIL_MAX, COMMON_ERR_MESSAGES.EMAIL_NOT_VALID)
  .email(COMMON_ERR_MESSAGES.INVALID_EMAIL_FORMAT);

export const passwordValidation = yup
  .string()
  .required()
  .min(COMMON_VALIDATIONS.PASSWORD_MIN, COMMON_ERR_MESSAGES.PASSWORD_NOT_VALID)
  .max(COMMON_VALIDATIONS.PASSWORD_MAX, COMMON_ERR_MESSAGES.PASSWORD_NOT_VALID);

export const emailValidationSchema = yup.object().shape({
  email: emailValidation
});

export const loginValidationSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation
});

export const passwordValidationSchema = yup.object().shape({
  password: passwordValidation
});

export const linkedInURLValidation = yup.string().url("Not a valid URL");
