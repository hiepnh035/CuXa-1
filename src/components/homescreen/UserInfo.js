import React, { Component } from "react";
import { View, AsyncStorage, Image } from "react-native";
import { Text, Avatar, Button, Card, ListItem } from "react-native-elements";
import { getUserInfo } from "../../api/getUser";
import { connect } from "react-redux";
import { getUserData } from "../../actions/userData";
import { GoogleSignin } from "react-native-google-signin";

const users = [
  {
    name: "brynn",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
  }
];
class UserInfo extends Component {
  componentWillMount() {
    GoogleSignin.configure({
      webClientId:
        "551531393756-odehvgqonl6r5ulamijhd4p72i8lbsbb.apps.googleusercontent.com"
    });
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AsyncStorage.getItem("user_data").then(value => {
      const data = JSON.parse(value);
      this.props.getUserData(data);
    });
  }
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await this.props.navigation.navigate("LoginScreen");
      // await AsyncStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    console.log(GoogleSignin.currentUser);
    return (
      <Card title={this.props.userName} image={{ uri: this.props.userAvatar }}>
        <Text style={{ marginBottom: 10, textAlign: "center" }}>
          Email: {this.props.userEmail}
        </Text>
        <Button
          icon={{ name: "code" }}
          backgroundColor="red"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="Sign Out"
          onPress={this.signOut}
        />
      </Card>
    );
  }
  static navigationOptions = {
    header: null
  };
}

const mapStateToProps = state => {
  return {
    userName: state.userData.name,
    userAvatar: state.userData.picture,
    userEmail: state.userData.email
  };
};
const mapDispatchToProps = dispatch => ({
  getUserData: (response = null) => {
    dispatch(getUserData(response));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
