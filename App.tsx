import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import { StatusBar } from "react-native";
import AppRouter from "./src/navigation";
import FlashMessage from "react-native-flash-message";

import { COLORS } from "./src/styles";

/**
 * @App component wrapped with redux and Persist redux to access global data through out the app
 * Flash Message for access toast message globally
 */

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar backgroundColor={COLORS.white} barStyle={"dark-content"} />
        <AppRouter />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
};

export default App;
