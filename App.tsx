import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import { StatusBar } from "react-native";
import { COLORS } from "./src/styles";
import AppRouter from "./src/navigation";
import FlashMessage from "react-native-flash-message";

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
