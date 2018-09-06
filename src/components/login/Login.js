import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";
import { LoginButton, AccessToken } from "react-native-fbsdk";

class Login extends Component {
  state = {
    userInfo: null
  };
  componentWillMount() {
    // GoogleSignin.hasPlayServices({ autoResolve: true });
    GoogleSignin.configure({
      webClientId:
        "551531393756-odehvgqonl6r5ulamijhd4p72i8lbsbb.apps.googleusercontent.com"
    });
  }
  handleSignInGoogle = () => {
    GoogleSignin.signIn()
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["email", "user_gender"]}
          onLoginFinished={(error, result) => {
            if (error) {
              alert("Login failed with error: " + error.message);
            } else if (result.isCancelled) {
              alert("Login was cancelled");
            } else {
              console.log(result);
              AccessToken.getCurrentAccessToken().then(data => {
                console.log(data.accessToken.toString());
              });
              alert(
                "Login was successful with permissions: " +
                  result.grantedPermissions
              );
              this.props.navigation.navigate("UserInfo");
            }
          }}
          onLogoutFinished={() => alert("User logged out")}
        />
        <Button
          title="Sign In With Google"
          onPress={() => this.handleSignInGoogle()}
        />
      </View>
    );
  }
}

export default Login;
