import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import { StatusBar } from "react-native";
import { COLORS } from "./src/styles";
import AppRouter from "./src/navigation";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={COLORS.transparent}
        />
        <AppRouter />
      </PersistGate>
    </Provider>
  );
};

export default App;
