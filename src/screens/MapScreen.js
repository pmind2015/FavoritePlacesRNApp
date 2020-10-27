import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";

import Colors from "../constants/Colors";

const MapScreen = ({ navigation, route }) => {
  // Хэрэв байршлыг дамжуулсан бол түүнийг авна
  // Дамжуулаагүй бол undefined утгыг selectedLocation-д өгнө
  const [selectedLocation, setSelectedLocation] = useState(
    route.params.selectedLocation
  );

  // Маркерийг өөрчлөх боломжгүйгээр нээж буй эсэх
  const isDetailView = route.params.isDetailView;

  // Дэлгэцийн баруун дээр ХАДГАЛ товч байрлуулах
  if (!isDetailView)
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={savePickedLocationHandler}
          >
            <Text style={styles.headerButtonText}>Хадгал</Text>
          </TouchableOpacity>
        ),
        title: "Газар сонгоно уу"
      });
    }, [navigation, selectedLocation]);

  // Газрын зураг дээр клик хийхэд маркер байрлуулна
  const selectLocationHandler = event => {
    // Detail дэлгэц дээр байга бол маркерийг хөдөлгөхийг зөвшөөрөхгүй
    if (isDetailView) return;

    // Маркерийн байрлалыг хадгална.
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  // Дэлгэцийн баруун дээрх ХАДГАЛ товчийг дарахад ажиллана.
  const savePickedLocationHandler = () => {
    if (!selectedLocation) {
      alert("Эхлээд хадгалах газраа сонгоно уу");
      return;
    }

    navigation.navigate("NewPlace", { mapSelectedLocation: selectedLocation });
  };

  return (
    <MapView
      style={styles.map}
      region={{
        latitude: selectedLocation ? selectedLocation.lat : 47.9182,
        longitude: selectedLocation ? selectedLocation.lng : 106.9168,
        latitudeDelta: 0.00122,
        longitudeDelta: 0.00421
      }}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary
  }
});

export default MapScreen;
