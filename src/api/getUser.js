import Axios from "axios";
import { AsyncStorage } from "react-native";

export const getUserToken = (accessToken, account) => {
  Axios.post("http://haihoa.emmasoft.com.vn:9000/api/auth/"+account+"", {
    access_token: accessToken
  })
    .then(response => {
      AsyncStorage.setItem("user_access_token", response.data.token);
    })
    .catch(error => {
      alert(error);
    });
};

export const getUserInfo = () => {
  AsyncStorage.getItem("user_access_token", (error, result) => {
    Axios.get("http://haihoa.emmasoft.com.vn:9000/api/users/me", {
      headers: {
        Authorization: "Bearer " +result
      }})
      .then(function(response) {
        AsyncStorage.setItem("user_data", JSON.stringify(response.data));
      })
      .catch(function(error) {
        alert(error);
      });
  });
};
