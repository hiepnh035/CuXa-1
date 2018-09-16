/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import { LoginNavigator } from "./src/navigations/LoginStack";
import {Provider} from "react-redux";
import store from "./src/store";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <LoginNavigator/>
      </Provider>
    );
  }
}
