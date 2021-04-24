import React, { useState, useEffect } from 'react';
import { Animated, ImageBackground, View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal, TextInput, KeyboardAvoidingView } from 'react-native';
import Button from 'react-native-button';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/HelperFunctions'
import CardView from 'react-native-cardview'
import CheckBox from 'react-native-check-box'
import bg from '../Assets/background.gif'
import AwesomeAlert from 'react-native-awesome-alerts';
import { Icon } from 'react-native-elements'
import Toast from 'react-native-simple-toast';
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Surveyscreen({ navigation }) {

  const [temp, setTemp] = useState('')
  const [sym, setSym] = useState('')
  const [address, setAddress] = useState('')
  const [title, setTitle] = useState('')
  const [disease,setDisease] = useState([])

  const [cancel, setCancel] = useState(false)
  const [cancelText, setCancelText] = useState('')

  const Symptoms = require('../Assets/symptoms.json')
  const [isChecked, setIsChecked] = useState(false)
  const [symptoms, setSymptoms] = useState([])
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  const [showAlert, setshowAlert] = useState(false)
  const [mess, setMessage] = useState("")
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [loading,setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(pos => {
      Geocoder.init('AIzaSyAtmd1hCJa4fN7mhErgwQ5KvVpV2WOsZGs')
      Geocoder.from(pos.coords.latitude, pos.coords.longitude).then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log(addressComponent)
        setAddress(addressComponent)
      }).catch((e) => {
        console.log(e)
      })
    },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
    )
  }

  useEffect(() => {
    AsyncStorage.getItem('token', (err, MobileNumber) => {
      console.log(MobileNumber)
      setPhoneNumber(MobileNumber)
    })
    fetchLocation()
  },[])

  const onChecked = (id) => {
    const data = Symptoms
    const index = data.findIndex(x => x.id === id)
    data[index].checked = !data[index].checked
    console.log(data[index].checked)
    console.log(symptoms)
    setSymptoms([...data])

  }


  const handleAlert = () => {
    setTitle('Error')
    let error = false
    if (!temp.trim().length || !address.trim().length) {
      error = true
      Toast.showWithGravity("Fill In All Fields", Toast.SHORT, Toast.BOTTOM)
    }
    if(parseFloat(temp) > 37.5){
      error = true
      Toast.showWithGravity("Enter A Valid Temprature", Toast.SHORT, Toast.BOTTOM)
    }
    if(!error) {
      setshowAlert(true)
      setCancelText("No, Cancel")
      setCancel(true)
      setMessage("Please Verify The Details Being Sent. As These Information Will Be Used By PHI Officers To Help You Out")
    }

  }

  const addPatient = () => {
    setshowAlert(false)
    const details = {
      phone: phoneNumber,
      temp: temp,
      symptoms: disease,
      address: address
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
    }
    setLoading(true)
    fetch('https://cvid-trace.herokuapp.com/addPatient', requestOptions)
      .then(response => response.json())
      .then(data => {
        setLoading(false)
        console.log(data)
        if (data['result'] === "Successfully Added") {
          Toast.showWithGravity('Successfully Added Details', Toast.LONG, Toast.BOTTOM);
        }
        else {
          Toast.showWithGravity('Failed To Add Details', Toast.LONG, Toast.BOTTOM);
        }
      }).catch(e => {
        Toast.showWithGravity('An Error Occurred', Toast.LONG, Toast.BOTTOM);

      })
  }

  const handlePress = () => {
    setCancel(false)
    setTitle('Diagnosis')
    var sym = symptoms.map((t) => t.key)
    var checks = symptoms.map((t) => t.checked)
    let items = []
    for (let index = 0; index < checks.length; index++) {
      if (checks[index] === true) {
        items.push(sym[index])
      }
    }
    setDisease([...items])
    if (items.includes("None Of the Above Symptoms")) {
      setshowAlert(true)
      setMessage("Woah !!, You're Fine. You Have Nothing To Worry")
    }
    else if (items.includes("Difficulty In Breathing") || items.includes("Chest Pain Or Pressure") || items.includes("Loss Of Speech Or Movement") || items.includes("Loss Of Taste Or Smell")) {
      setVisible(true)
    }
    else if (items.includes("Fever") || items.includes("Dry Cough") || items.includes("Tiredness") || items.includes("Sore Throat") || items.includes("Aches & Pains")) {
      setshowAlert(true)
      setMessage("You Have Got Little Less Major Symptoms Of COVID-19. Please Stay In Isolation And Take Good Rest WIth Medications")
    }
    else if (items.includes("Headache") || items.includes("Conjunctivitis") || items.includes("Feeling Nausea") || items.includes("Phlegm") || items.includes("Diarrhoea")) {
      setshowAlert(true)
      setMessage("You Have Got Minor Symptoms Of COVID-19. Please Stay In Rest And Take Good Medications Before It Becomes Any Worse")
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E3E3E3" }}>
      <AnimatedLoader
          visible={loading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../Assets/loading.json")}
          animationStyle={styles.lottie}
          speed={1}
        >
          <Text style={styles.headerText}>Redording Details ....</Text>
        </AnimatedLoader>
      <Modal animationType={'slide'} visible={visible} animationOutTiming={5000}
        animationOut={'slideOutUp'}>
        <View>
          <Icon size={24} color='#517fa4' type="material" name="close" onPress={() => setVisible(false)} />
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginTop: SCREEN_HEIGHT * 0.02, marginLeft: SCREEN_WIDTH * 0.23 }}>Critical Condition</Text>
          <Icon color={'red'} type="material" name="error" size={60} style={{ marginLeft: SCREEN_WIDTH * 0.001 }} />
        </View>
        <View style={{ marginTop: SCREEN_HEIGHT * 0.033, alignSelf: 'center' }}>
          <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold', textTransform: 'capitalize' }}>Please fill in fields below for an immediate checkup </Text>
        </View>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true} style={{ marginTop: SCREEN_HEIGHT * 0.033, alignSelf: 'center', paddingTop: 30 }}>
          <TextInput style={styles.input}
            onChangeText={(text) => setTemp(text)}
            type={"text"}
            underlineColorAndroid="transparent"
            placeholder="Body Temparature"
            placeholderTextColor="#7A7B88"
            autoCapitalize="none"
            dataDetectorTypes={"all"}
            keyboardType={"numeric"}
            keyboardAppearance={"default"}
            autoCompleteType={"off"}
            autoCorrect={true}
          />
          <TextInput style={styles.areaInput}
            onChangeText={(text) => setSym(text)}
            type={"text"}
            multiline
            numberOfLines={10}
            underlineColorAndroid="transparent"
            placeholder="Other Symptoms"
            placeholderTextColor="#7A7B88"
            autoCapitalize="none"
            dataDetectorTypes={"all"}
            keyboardAppearance={"default"}
            autoCompleteType={"off"}
            autoCorrect={true}
          />
          <Button
            style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}
            styleDisabled={{ color: 'white' }}
            disabled={isDisabled}
            containerStyle={{ marginTop: SCREEN_HEIGHT * 0.04, marginLeft: SCREEN_WIDTH * 0.2, width: 200, padding: 8, height: 45, overflow: 'hidden', borderRadius: 10, backgroundColor: '#21C885' }}
            disabledContainerStyle={{ backgroundColor: 'lightgreen' }}
            onPress={() => handleAlert()}
          >
            Submit
      </Button>
        </KeyboardAwareScrollView>
      </Modal>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={title}
        message={mess}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={cancel}
        showConfirmButton={true}
        cancelText={"Cancel"}
        onCancelPressed={() => {
          setshowAlert(false)
        }}
        cancelButtonColor="#1FC11B"
        cancelButtonStyle={{ marginLeft: 5, width: 100 }}
        cancelButtonTextStyle={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}
        confirmText="OK"
        confirmButtonColor="#1FC11B"
        confirmButtonStyle={{ marginLeft: 5, width: 100 }}
        confirmButtonTextStyle={{ fontSize: 16, fontWeight: 'bold', marginLeft: 27 }}
        onConfirmPressed={() => {
          if (cancel) {
            addPatient()
          }
          else {
            setshowAlert(false)
          }

        }}
      />
      <CardView cardElevation={30}
        cornerRadius={10} style={styles.card}>
        <Text style={styles.headerText}> How Are Your Symptoms Today </Text>
        <ScrollView>
          <View style={styles.survey}>
            {Symptoms.map((item, key) => (
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} key={key} onPress={() => onChecked(item.id)}>
                <CheckBox style={{ flex: 1, padding: 18 }}
                  onClick={() => onChecked(item.id)}
                  isChecked={item.checked}
                  rightText={item.key}></CheckBox>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </CardView>
      <Button
        style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}
        styleDisabled={{ color: 'white' }}
        disabled={isDisabled}
        containerStyle={{ marginBottom: SCREEN_HEIGHT * 0.01, marginLeft: SCREEN_WIDTH * 0.25, width: 200, padding: 8, height: 45, overflow: 'hidden', borderRadius: 10, backgroundColor: '#21C885' }}
        disabledContainerStyle={{ backgroundColor: 'lightgreen' }}
        onPress={() => handlePress()}
      >
        Diagnose
      </Button>

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200
  },
  input: {
    margin: 20,
    paddingLeft: 10,
    height: 50,
    width: 320,
    fontSize: 16,
    borderColor: '#21C885',
    borderWidth: 3,
    borderRadius: 10
  },
  areaInput: {
    paddingLeft: 10,
    paddingBottom: 50,
    margin: 20,
    height: 100,
    width: 320,
    fontSize: 16,
    borderColor: '#21C885',
    borderWidth: 3,
    borderRadius: 10
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 45,
    fontFamily: "Oswald-Bold"
  },
  image: {
    flex: 1,
    resizeMode: "repeat",
    justifyContent: "center"
  },
  card: {
    height: SCREEN_HEIGHT * 0.72,
    width: SCREEN_WIDTH * 0.85,
    marginBottom: SCREEN_HEIGHT * 0.03,
    marginTop: SCREEN_HEIGHT * 0.02,
    marginLeft: SCREEN_WIDTH * 0.075
  },
  survey: {
    marginTop: 25
  },
  checkBox: {
    flex: 1,
    padding: 10,
    marginLeft: 25,
    marginTop: 18
  }
})


export default Surveyscreen;