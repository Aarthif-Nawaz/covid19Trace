import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/HelperFunctions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, CardTitle, CardImage } from 'react-native-material-cards'
import AnimatedLoader from "react-native-animated-loader";
import { ScrollView } from 'react-native';
import AwesomeButton from "react-native-really-awesome-button";

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
  }
});

export default function VisitedLoc({ navigation }) {

  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [locations, setLocations] = useState([])
  const [visible, setVisible] = useState(false)

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: phoneNumber })
  }

  const fetchData = () => {
    setVisible(true)
    fetch('https://cvid-trace.herokuapp.com/getLocation', requestOptions)
      .then(response => response.json())
      .then(data => {
        setVisible(false)
        console.log(data['result'])
        if (data['result'] !== "Failure") {
          setLocations([...data['result']])
        }
      })
  }



  useEffect(() => {
    AsyncStorage.getItem('token', (err, MobileNumber) => {
      if (MobileNumber) {
        setPhoneNumber(MobileNumber)
      }
    })
  }, [])



  return (
    <ScrollView>
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../Assets/loading.json")}
        animationStyle={styles.lottie}
        speed={1}
      >
        <Text style={styles.headerText}>Fetching Visited Locations ....</Text>
      </AnimatedLoader>
      {locations.map((location, index) => (
        <Card key={index}>
          <CardImage
            source={{ uri: 'https://mcdn.wallpapersafari.com/medium/42/95/ONTIpz.jpg' }}
            title={""}
          />
          <CardTitle
            title={location.location}
            subtitle={location.date}
          />
        </Card>
      ))}
      <View style={{
        marginTop: SCREEN_HEIGHT * 0.02,
        marginLeft: SCREEN_WIDTH * 0.23,
      }}>
        <AwesomeButton
          backgroundColor={"#22BD49"}
          onPress={fetchData}
          height={50}
          width={200}
          paddingHorizontal={10}
        >
          View Locations
    </AwesomeButton>
      </View>
    </ScrollView>
  );

}
