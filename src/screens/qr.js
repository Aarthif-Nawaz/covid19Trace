import * as React from 'react';
import { View, Text, Button, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Toast from 'react-native-simple-toast';
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 28,
    paddingBottom: 17,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

function QR({ navigation }) {

  const onSuccess = e => {
    console.log(e)
    Toast.showWithGravity('Success', Toast.LONG, Toast.BOTTOM);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E3E3E3" }}>
      <QRCodeScanner
        reactivate={true}
        permissionDialogMessage={"Need Permission To Access Camera"}
        reactivateTimeout={5000}
        showMarker={true}
        onRead={onSuccess}
        topContent={
          <Text style={styles.centerText}>
            SCAN{" "}
            <Text style={styles.textBold}>QR</Text>
          </Text>
        }

      />
    </View>
  );

}
export default QR;