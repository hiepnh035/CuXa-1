import { createStackNavigator } from "react-navigation";
import Login from "../components/login/Login";
import UserInfo from "../components/homescreen/UserInfo";
import {GoogleSignin} from "react-native-google-signin";
GoogleSignin.configure({
  webClientId:
    "551531393756-odehvgqonl6r5ulamijhd4p72i8lbsbb.apps.googleusercontent.com"
});
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
    initialRouteName:(GoogleSignin.currentUser === undefined)? "LoginScreen":"UserInfo",
  }
);
