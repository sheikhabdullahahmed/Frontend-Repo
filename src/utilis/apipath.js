export const  BASE_URL = "http://localhost:4000";


export const API_PATHS = {
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    GET_USER_INFO: "/getUser",
  },
  INCOME: {
    ADD_INCOME: "/income/add",
    GET_ALL_USER: "/income/get",
    DELETE_INCOME: (id) => `/income/${id}`,
  },
  EXPENSE: {
    ADD_EXPENSE: "/expense/add",
    GET_ALL_EXPENSE: "/expense/get",
    DELETE_EXPENSE: (id) => `/expense/${id}`,
  },
  IMAGE: {
    UPLOAD_IMAGE: "/upload", // ✅ Add this line
  },
};
