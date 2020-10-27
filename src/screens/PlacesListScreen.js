import React, { useEffect } from "react";
import { Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import MyHeaderButton from "../components/MyHeaderButton";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/places-actions";

export default ({ navigation }) => {
  const places = useSelector(state => state.data.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
          <Item
            title="Газар нэмэх"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => navigation.navigate("NewPlace")}
          />
        </HeaderButtons>
      ),
      title: "Миний дуртай газрууд"
    });
  }, [navigation]);

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id.toString()}
      renderItem={itemData => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            navigation.navigate("PlaceDetail", { place: itemData.item });
          }}
        />
      )}
    />
  );
};
