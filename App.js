import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import MapScreen from "./src/screens/MapScreen";
import NewPlaceScreen from "./src/screens/NewPlaceScreen";
import PlaceDetailScreen from "./src/screens/PlaceDetailScreen";
import PlacesListScreen from "./src/screens/PlacesListScreen";
import Colors from "./src/constants/Colors";
import placesReducer from "./src/store/places-reducer";
import { init } from "./src/helpers/db";

init()
  .then(() => {
    console.log("Базыг бэлтгэж байна");
  })
  .catch(err => {
    console.log("Базыг бэлтгэж чадсангүй.");
    console.log(err);
  });

const rootReducer = combineReducers({
  data: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Platform.OS === "android" ? Colors.primary : ""
            },
            headerTintColor:
              Platform.OS === "android" ? "white" : Colors.primary,
            headerTitleStyle: { fontSize: 22 }
          }}
          initialRouteName="Places"
        >
          <Stack.Screen name="Places" component={PlacesListScreen} />
          <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
          <Stack.Screen
            name="NewPlace"
            component={NewPlaceScreen}
            options={{ title: "Шинэ газар нэмэх" }}
          />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
