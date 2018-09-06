import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";

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
        <Text>Hello</Text>
        <Button
          title="Sign In With Facebook"
          onPress={() => this.props.navigation.navigate("UserInfo")}
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
