import { createStackNavigator } from "react-navigation";
import Login from "../components/login/Login";
import UserInfo from "../components/homescreen/UserInfo";

export const LoginNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: Login,
    },
    UserInfo: {
      screen: UserInfo
    }
  },
  {
    initialRouteName: "LoginScreen",
  }
);
