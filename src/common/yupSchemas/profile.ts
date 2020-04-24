import * as yup from 'yup';

export const PROFILE_VALIDATIONS = {
  FULL_NAME_MIN: 5,
  FULL_NAME_MAX: 255
};

export const PROFILE_ERR_MESSAGES = {
  FULL_NAME_NOT_VALID: `Name should be between ${PROFILE_VALIDATIONS.FULL_NAME_MIN} and 
		${PROFILE_VALIDATIONS.FULL_NAME_MAX} characters`
};

export const fullNameValidation = yup
  .string()
  .required("Full Name is required")
  .min(
    PROFILE_VALIDATIONS.FULL_NAME_MIN,
    PROFILE_ERR_MESSAGES.FULL_NAME_NOT_VALID
  )
  .max(
    PROFILE_VALIDATIONS.FULL_NAME_MAX,
    PROFILE_ERR_MESSAGES.FULL_NAME_NOT_VALID
  );

export const profileValidationSchema = yup.object().shape({
  fullName: fullNameValidation
});
