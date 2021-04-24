import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from './src/screens/Cases'
import LottieView from 'lottie-react-native';
import PhoneScreen from './src/screens/telephone';
import OTPScreen from './src/screens/otp'
import Main from './src/screens/Main'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TermsAndConditions from './src/screens/howto'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './src/utils/HelperFunctions'

const styles = StyleSheet.create({
  header: {
    fontSize: 34,
    color: '#697AE2',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: SCREEN_HEIGHT* 0.7,
    padding: 20,
  },
});
 

function HomeScreen({ navigation }) {

  const moveNext = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
        navigation.navigate('Main')
      }
      else {
        navigation.navigate('Terms')
      }
    } catch (e) {
      console.log(e)
    }
    

  }

  return (
    <View style={{flex:1}}>
    <LottieView
      source={require('./src/Assets/splash.json')}
      autoPlay
      loop={false}
      onAnimationFinish={moveNext}
    />
    <Text style={styles.header} >COVID <Text style={{fontStyle:'italic'}}>TRACE</Text></Text>
    </View>
    
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        headerLeft: null
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Terms" component={TermsAndConditions} />
        <Stack.Screen name="Telephone" component={PhoneScreen} />
        <Stack.Screen name="OTP Screen" component={OTPScreen} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;