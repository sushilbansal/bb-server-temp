export const ERR_MESSAGES = {
  CONFIRMATION_EMAIL_LINK_NOT_VALID: "Not a valid Email confirmation link",
  UNEXPECTED_ERROR: "Something went wrong",
  USER_NOT_FOUND: "could not find user with that email",
  INVALID_CREDENTIALS: "invalid credentials",
  CONFIRM_EMAIL: "please confirm your email",
  LOGIN_OR_REGISTER: "please login or register",

  EMAIL_NOT_LONG_ENOUGH: "email must be at least 3 characters",
  INVALID_EMAIL: "email must be a valid email",
  DUPLICATE_EMAIL: "email taken",
  USERNAME_LIMIT: "User Name must be between 5 and 15 characters",

  PASSWORD_NOT_LONG: "password must be at least 3 characters",
  PASSWORD_TOO_LONG: "password must be less than 255 characters",

  FORGOT_PASSWORD_ACCOUNT_LOCKED: "account is locked",
  FORGOT_PASSWORD_EXPIRED_KEY: "Forgot link has expired",

  POST_NOT_FOUND: "post not found",
  NOTING_TO_UPDATE: "nothing to update",
  USER_NOT_AUTHORISED: "user not authorised to make specified changes",

  COMMENT_EMPTY: "comment can not be empty",
  COMMENT_NOT_FOUND: "comment not found",

  DO_NOT_EXIST: " does not exist anymore",

  REPLY_EMPTY: "reply can not be empty",
};

export const ROUTE_NAMES = {
  SPLASH: "SPLASH",
  WELCOME: "WELCOME",

  AUTH: "/auth",
  APP: "/app",
  AUTH_LOADING: "/auth-loading",
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
  HOME: "/",
  PERSONAL_DETAILS: "/personal-details",
  SKILLS_AND_EXPERIENCE: "/skills-and-experience",

  FORGOT_PASSWORD: "/forgot-password",
  CHANGE_PASSWORD: "/change-password",
  RESET_PASSWORD: "/reset-password",
  CONFIRM_EMAIL: "/confirm-email",
  MESSAGE: "/m",

  CREATE_POST: "/create-post",
  CATEGORY_LIST: "/category-list",
  POST_DETAILS: "/post-details",
  EDIT_POST: "/edit-post",
  COMMENT_DETAILS: "/comment-details",
  EDIT_COMMENT: "/edit-comment",

  VIEW_PROFILE: "/view-profile",
  MY_PROFILE: "/my-profile",
  EDIT_PROFILE: "/edit-profile",
  MY_PROFILE_POST_DETAILS: "/profile-post-details",
  USER_POST_DETAILS: "/user-post-details",

  FILTER_AND_SORT: "/filter-and-sort",
  NOTIFICATION: "/notification",

  IS_USER_LOGGED_IN: "IS_USER_LOGGED_IN",
  USER_DETAILS: "/user-details",
  MAIN: "MAIN",
  SETTINGS: "SETTINGS",
  REPLY_DETAILS: "REPLY_DETAILS",
};

export const COOKIE_PREFIX = "qid";

export const USER_CONFIRM_EMAIL = "/user/confirm-email";
export const USER_CHANGE_PASSWORD = "/user/change-password";

export const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss.SSSZ";

export const ANDROID_APP_PACKAGE = "com.bakbak.bakbakapp";
export const IOS_APP_PACKAGE = "com.bakbak.bakbakapp";
export const APP_PACKAGE = "com.bakbak.bakbakapp";

export const WEB_URL = "https://www.bakbakapp.com/";
export const APP_URL = "bakbakapp://";

export interface ISkill {
  skillId: string;
  skillName: string;
  level: number;
}

export interface OptionType {
  name: string;
  value: string;
}

export interface ChipsOptionType {
  id: string;
  name: string;
}

export const NEW = "new";
export const ME = "me";

export const DISPLAY_ERROR_CODE = "display error";

export const COMMENT_SORT = [
  { name: "Score", value: "Top Comments" },
  { name: "Date", value: "Newest first" },
];
export const REPLY_SORT = [
  { name: "Score", value: "Top Replies" },
  { name: "Date", value: "Newest first" },
];

export const SUBSCRIPTION = {
  NEW_COMMENT: "NEW_COMMENT",
  NEW_REPLY: "NEW_REPLY",
  NEW_NOTIFICATION: "NEW_NOTIFICATION",
  NEW_REPORT: "NEW_REPORT",
};
