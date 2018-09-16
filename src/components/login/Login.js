import React, { Component } from "react";
import { View, ImageBackground, ToastAndroid, StyleSheet } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";
import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";
import { SocialIcon, Text } from "react-native-elements";
import { getUserToken, getUserInfo } from "../../api/getUser";

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

  handleSignInGoogle = async () => {
    await GoogleSignin.signIn()
      .then(async user => {
        console.log(user.accessToken);
        await getUserToken(user.accessToken, "google");
        await ToastAndroid.show("Login successful!", ToastAndroid.SHORT);
        await getUserInfo();
        await this.props.navigation.navigate("UserInfo");
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };
  handleSignInFaceBook = () => {
    LoginManager.logInWithReadPermissions(["email", "user_gender"]).then(
      (error, result) => {
        if (error) {
          ToastAndroid.show(
            "Login was calcelled with " + error.message + " reason",
            ToastAndroid.SHORT
          );
        } else if (result.isCancelled) {
          ToastAndroid.show("Login was calcelled", ToastAndroid.SHORT);
        } else {
          console.log(result);
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data.accessToken.toString());
            getUserToken(data.accessToken, "facebook");
            getUserInfo();
            ToastAndroid.show("Login successful!", ToastAndroid.SHORT);
            this.props.navigation.navigate("UserInfo");
          });
        }
      }
    );
  };
  render() {
    console.log(GoogleSignin.currentUser);

    return (
      <ImageBackground
        source={require("../../assets/background-login.jpg")}
        style={styles.ImageBackgroundStyle}
      >
        <View style={styles.blackFont} />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text style={styles.logo}>Cư Xá</Text>
          </View>
          <View style={styles.subHeading}>
            <Text style={styles.textSubHeading}>
              Start with the font you want, and always end with a generic
              family, to let the browser pick a similar font
            </Text>
          </View>
          <View style={{ marginHorizontal: "7%", flex: 1 }}>
            <SocialIcon
              title="Sign In With Facebook"
              button
              type="facebook"
              onPress={this.handleSignInFaceBook}
            />
            <SocialIcon
              title="Sign in with Google"
              button
              type="google-plus-official"
              onPress={() => this.handleSignInGoogle()}
            />
          </View>
          <Text style={{ textAlign: "center", color: "white", flex: 0.3 }}>
            By continuing, you agree to our Terms and Conditions
          </Text>
        </View>
      </ImageBackground>
    );
  }

  static navigationOptions = {
    header: null
  };
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 70,
    fontWeight: "bold",
    textAlign: "center",
    color: "#f45c42"
  },
  ImageBackgroundStyle: {
    width: "100%",
    height: "100%",
    zIndex: -1,
    position: "absolute"
  },
  subHeading: {
    flex: 1,
    justifyContent: "flex-start",
    marginHorizontal: "10%"
  },
  textSubHeading: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  blackFont: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 0,
    opacity: 0.5
  }
});

export default Login;
