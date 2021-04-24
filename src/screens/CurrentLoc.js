import * as React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, RefreshControl } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/HelperFunctions'
import AnimatedLoader from "react-native-animated-loader";
import Geocoder from 'react-native-geocoding';
import AwesomeButton from "react-native-really-awesome-button";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from 'react-native-snackbar-component'
import Toast from 'react-native-simple-toast';
import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 45,
    fontFamily: "Oswald-Bold"
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 500,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const initalState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
}

function CurrentLoc({ navigation }) {
  const [currentPosition, setCurrentPosition] = React.useState(initalState)
  const [loc, setLoc] = React.useState('')
  const [isDisabled, setIsDisabled] = React.useState(false)
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [visible, setVisible] = React.useState(false)
  const [snackVisible, setSnackVisible] = React.useState(false)
  const [snackMessage, setSnackMessage] = React.useState('')
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    fetchLocation()
  }, []);

  const fetchLocation = () => {
    setRefreshing(true);
    Geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords
      setCurrentPosition({
        ...currentPosition,
        latitude,
        longitude
      })
      setRefreshing(false)
      Geocoder.init('AIzaSyAtmd1hCJa4fN7mhErgwQ5KvVpV2WOsZGs')
      Geocoder.from(pos.coords.latitude, pos.coords.longitude).then(json => {
        var addressComponent = json.results[0].formatted_address;
        setLoc(addressComponent)
      }).catch((e) => {
        console.log(e)
      })
    },
      error => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000}
    )
  }

  React.useEffect(() => {
    AsyncStorage.getItem('token', (err, MobileNumber) => {
      setPhoneNumber(MobileNumber)
    })
    fetchLocation()
  }, [])

  const recordLocation = () => {

    var date = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss a');
    const details = {
      phone: phoneNumber,
      date: date,
      location: loc
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
    }
    setVisible(true)
    fetch('https://cvid-trace.herokuapp.com/addLocation', requestOptions)
      .then(response => response.json())
      .then(data => {
        setVisible(false)
        console.log(data)
        if (data['result'] === "Successfully Added") {
          Toast.showWithGravity('Successfully Added Location', Toast.LONG, Toast.BOTTOM);
        }
        else {
          Toast.showWithGravity('Failed To Add Location', Toast.LONG, Toast.BOTTOM);
        }
      }).catch(e => {
        Toast.showWithGravity('An Error Occurred', Toast.LONG, Toast.BOTTOM);

      })

  }

  return (
    <ScrollView refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    >
      <SafeAreaView style={styles.container}>
        <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../Assets/loading.json")}
          animationStyle={styles.lottie}
          speed={1}
        >
          <Text style={styles.headerText}>Recording Current Location ....</Text>
        </AnimatedLoader>
        {currentPosition.latitude ? (
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            showsUserLocation={true}
            region={currentPosition}
          />
        ) : <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../Assets/loading.json")}
          animationStyle={styles.lottie}
          speed={1}
        >
          <Text style={styles.headerText}>Fetching Current Location ...</Text>
        </AnimatedLoader>}

      </SafeAreaView>
      <View style={{
        marginTop: SCREEN_HEIGHT * 0.67,
        marginLeft: SCREEN_WIDTH * 0.23
      }}>
        <AwesomeButton
          backgroundColor={"#22BD49"}
          onPress={recordLocation}
          height={50}
          width={200}
          paddingHorizontal={10}
        >
          Record Location
    </AwesomeButton>
      </View>
    </ScrollView>
  );

}
export default CurrentLoc;