import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from './src/screens/Cases'
import LottieView from 'lottie-react-native';
import PhoneScreen from './src/screens/telephone';
import OTPScreen from './src/screens/otp'
import Main from './src/screens/Main'
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {

  const moveNext = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
        navigation.navigate('Main')
      }
      else {
        navigation.navigate('Telephone')
      }
    } catch (e) {
      console.log(e)
    }

  }

  return (
    <LottieView
      source={require('./src/Assets/splash.json')}
      autoPlay
      loop={false}
      onAnimationFinish={moveNext}
    />
    
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
        <Stack.Screen name="Telephone" component={PhoneScreen} />
        <Stack.Screen name="OTP Screen" component={OTPScreen} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;