import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Styles } from '../components/style';
import ErrorBoundary from '../components/ErrorBoundry';
import colors from '../utils/Colors';
import { isAndroid } from '../utils/HelperFunctions';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import FullButtonComponent from '../components/FullButtonComponent';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import AnimatedLoader from "react-native-animated-loader";
import { cos, set } from 'react-native-reanimated';

const OTPScreen = function ({ route: { params: { phoneNumber } }, navigation }) {
  const [showAlert, setshowAlert] = useState(false)
  const [mess, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [visible, setVisible] = useState(false)

  const [otpArray, setOtpArray] = useState(['', '', '', '']);
  const [submittingOtp, setSubmittingOtp] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirm, setConfirm] = useState(null);

  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fivthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);


  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

  useEffect(() => {
    signInWithPhoneNumber();
  }, [])

  async function signInWithPhoneNumber() {
    try {
      setVisible(true)
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setVisible(false);
      setConfirm(confirmation);
    } catch (e) {
      setVisible(false);
      navigation.navigate('Telephone');
      console.log(e)
    }
  }

  async function confirmCode() {
    try {
      setVisible(true)
      const code = otpArray.join("");
      setVisible(false)
      const response = await confirm.confirm(code);
      if (response) {
        await AsyncStorage.setItem('token', "Logged In")
        navigation.navigate('Main');
      }
    } catch (e) {
      setshowAlert(true)
      setTitle('Error In Confirming Code')
      setMessage('Please Enter the Correct Code')
      setVisible(false)
      console.log(e)

    }
  }
  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fivthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
          setSubmittingOtp(false);
        }
      }
    };
  };

  const onOtpKeyPress = index => {
    return ({ nativeEvent: { key: value } }) => {
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 4) {
          fourthTextInputRef.current.focus();
        } else if (index === 5) {
          fivthTextInputRef.current.focus();
        }
        if (isAndroid && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = '';
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  return (
    <ErrorBoundary screenName={'OTPScreen'}>
      <View style={styles.container}>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={title}
          message={mess}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="lightblue"
          confirmButtonStyle={{ marginLeft: 5, width: 100 }}
          confirmButtonTextStyle={{ fontSize: 16, fontWeight: 'bold', marginLeft: 27 }}
          onConfirmPressed={() => {
            setshowAlert(false)
          }}
        />
        <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../Assets/loading.json")}
          animationStyle={styles.lottie}
          speed={1}
        >
          <Text style={styles.headerText}>Loading ...</Text>
        </AnimatedLoader>
        <CustomText>
          Enter OTP sent to your{' ' + phoneNumber}
        </CustomText>
        <View style={[Styles.row, Styles.mt12]}>
          {[
            firstTextInputRef,
            secondTextInputRef,
            thirdTextInputRef,
            fourthTextInputRef,
            fivthTextInputRef,
            sixthTextInputRef,
          ].map((textInputRef, index) => (
            <CustomTextInput
              containerStyle={[Styles.fill, Styles.mr12]}
              value={otpArray[index]}
              onKeyPress={onOtpKeyPress(index)}
              onChangeText={onOtpChange(index)}
              keyboardType={'numeric'}
              maxLength={1}
              color={colors.BLACK}
              style={[styles.otpText, Styles.centerAlignedText]}
              autoFocus={index === 0 ? true : undefined}
              refCallback={refCallback(textInputRef)}
              key={index}
            />
          ))}
        </View>
        {errorMessage ? (
          <CustomText
            style={[
              Styles.negativeText,
              Styles.mt12,
              Styles.centerAlignedText,
            ]}>
            {errorMessage}
          </CustomText>
        ) : null}

        <FullButtonComponent
          type={'fill'}
          text={'Submit'}
          textStyle={styles.submitButtonText}
          buttonStyle={Styles.mt24}
          onPress={() => confirmCode()}
          disabled={submittingOtp}
        />
      </View>
    </ErrorBoundary>
  );
};

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
    padding: 16,
    flex: 1,
    alignItems: 'center',
    paddingTop: 130,
  },
  submitButtonText: {
    color: colors.WHITE,
  },
  otpText: {
    color: colors.BLUE,
    fontSize: 18,
    width: '100%',
  },
});

export default OTPScreen;