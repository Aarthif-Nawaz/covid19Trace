import React, { useState } from 'react';
import { Animated, ImageBackground, View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import Button from 'react-native-button';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/HelperFunctions'
import CardView from 'react-native-cardview'
import CheckBox from 'react-native-check-box'
import bg from '../Assets/background.gif'
import AwesomeAlert from 'react-native-awesome-alerts';
function Surveyscreen({ navigation }) {


  const Symptoms = require('../Assets/symptoms.json')
  const [isChecked, setIsChecked] = useState(false)
  const [symptoms, setSymptoms] = useState([])
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [isDisabled,setIsDisabled] = useState(false)
  const [showAlert,setshowAlert] = useState(false)
  const [mess, setMessage] = useState("")


  const onChecked = (id) => {
    const data = Symptoms
    const index = data.findIndex(x => x.id === id)
    data[index].checked = !data[index].checked
    console.log(data[index].checked)
    setSymptoms([...data])

  }
  const handlePress = () => {
    var sym = symptoms.map((t) => t.key)
    var checks = symptoms.map((t) => t.checked)
    let items = []
    for (let index = 0; index < checks.length; index++) {
      if (checks[index] === true) {
        items.push(sym[index])
      }
    }
    if(items.includes("None Of the Above Symptoms")){
      setshowAlert(true)
      setMessage("Woah !!, You're Fine. You Have Nothing To Worry")
    }
    else if(items.includes("Difficulty In Breathing") || items.includes("Chest Pain Or Pressure") || items.includes("Loss Of Speech Or Movement") || items.includes("Loss Of Taste Or Smell")){
      setshowAlert(true)
      setMessage("You Have Got Major Symptoms Of COVID-19. You Need To Consult A Doctor Without Any Further Delay")
    }
    else if(items.includes("Fever") || items.includes("Dry Cough") || items.includes("Tiredness") || items.includes("Sore Throat") || items.includes("Aches & Pains")){
      setshowAlert(true)
      setMessage("You Have Got Little Less Major Symptoms Of COVID-19. Please Stay In Isolation And Take Good Rest WIth Medications")
    }
    else if(items.includes("Headache") || items.includes("Conjunctivitis") || items.includes("Feeling Nausea") || items.includes("Phlegm") || items.includes("Diarrhoea")){
      setshowAlert(true)
      setMessage("You Have Got Minor Symptoms Of COVID-19. Please Stay In Rest And Take Good Medications Before It Becomes Any Worse")
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor:"#E3E3E3"}}>
      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Diagnosis"
          message={mess}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#1FC11B"
          confirmButtonStyle={{ marginLeft:5, width: 100 }}
          confirmButtonTextStyle={{ fontSize:16, fontWeight:'bold', marginLeft:27 }}
          onConfirmPressed={() => {
            setshowAlert(false)
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
          style={{ fontSize: 18, fontWeight: 'bold' ,color: 'white' }}
          styleDisabled={{ color: 'white' }}
          disabled={isDisabled}
          containerStyle={{ marginBottom: SCREEN_HEIGHT * 0.01, marginLeft: SCREEN_WIDTH * 0.25 ,width: 200, padding: 8, height: 45, overflow: 'hidden', borderRadius: 10, backgroundColor: '#21C885' }}
          disabledContainerStyle={{ backgroundColor: 'lightgreen' }}
          onPress={() => handlePress()}
        >
          Diagnose
      </Button>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
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
    marginTop:SCREEN_HEIGHT * 0.02,
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