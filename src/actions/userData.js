import { GET_DATA } from "../types/userData";

export function getUserData(response) {
  return dispatch => {
    dispatch({
      type: GET_DATA,
      name: response.name,
      email: response.email,
      picture: response.picture
    });
  };
}
