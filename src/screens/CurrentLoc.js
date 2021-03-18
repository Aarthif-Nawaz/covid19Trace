import * as React from 'react';
import { View, Text , Button } from 'react-native';

function CurrentLoc({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text> Current Location </Text>
        </View>
      );

}
export default CurrentLoc;