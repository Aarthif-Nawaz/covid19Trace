import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LocalCases from './localcases';
import GlobalCases from './Globalcases';

const Tab = createMaterialTopTabNavigator();

function Casesscreen() {
  return (
    <Tab.Navigator
      initialRouteName="Local Cases"
      swipeEnabled={true}
      tabBarOptions={{
        activeTintColor: 'white',
        labelStyle: { fontSize: 15, fontWeight: 'bold' },
        style: { backgroundColor: '#B237D0' },
      }}
    >
      <Tab.Screen
        name="Local Cases"
        component={LocalCases}
        options={{ tabBarLabel: 'Local Cases' }}
      />
      <Tab.Screen
        name="Global Cases"
        component={GlobalCases}
        options={{ tabBarLabel: 'GLobal Cases' }}
      />
    </Tab.Navigator>
  );
}

export default Casesscreen;