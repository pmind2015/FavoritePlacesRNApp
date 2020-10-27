import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as placesActions from "../store/places-actions";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = props => {
  const [placeName, setPlaceName] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  // Газрын зургаас сонгосон байршлыг дамжуулсан бол хүлээж авч хадгална
  React.useEffect(() => {
    if (props.route.params) {
      setSelectedLocation(props.route.params.mapSelectedLocation);
    }
  }, [props.route]);

  // ХАДГАЛ товчийг дарахад базд хадгална
  const savePlaceHandler = () => {
    dispatch(
      placesActions.addPlace(placeName, selectedImage, selectedLocation)
    );
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Газрын нэр</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={() => {
            setPlaceName(text);
          }}
          value={placeName}
        />

        <ImagePicker
          onImageTaken={() => {
            setSelectedImage(imagePath);
          }}
        />

        <LocationPicker
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          gotoFullMap={() => {
            props.navigation.navigate("Map", { selectedLocation });
          }}
        />

        <View style={{ paddingHorizontal: 100 }}>
          <Button
            title="Хадгал"
            color={Colors.primary}
            onPress={savePlaceHandler}
          />
        </View>
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place"
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;
