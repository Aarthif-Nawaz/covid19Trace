import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CurrentLoc from './CurrentLoc';
import VisitedLoc from './VisitedLoc';

const Tab = createMaterialTopTabNavigator();

function MapsScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Current Location"
      swipeEnabled={true}
      tabBarOptions={{
        activeTintColor: 'white',
        labelStyle: { fontSize: 15, fontWeight: 'bold' },
        style: { backgroundColor: '#3AB749' }}}
    >
      <Tab.Screen
        name="Current Location"
        component={CurrentLoc}
        options={{ tabBarLabel: 'Current Location' }}
      />
      <Tab.Screen
        name="Visited Location"
        component={VisitedLoc}
        options={{ tabBarLabel: 'Visited Locations' }}
      />
    </Tab.Navigator>
  );
}

export default MapsScreen;