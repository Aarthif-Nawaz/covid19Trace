import * as React from 'react';
import Survey from './Survey'
import Maps from './Maps'
import Cases from './Cases'
import News from './News'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements'

const Tab = createMaterialBottomTabNavigator();
const SurveyStack = createStackNavigator();
const MapStack = createStackNavigator();
const CaseStack = createStackNavigator();
const NewsStack = createStackNavigator();

const SurveyStackScreen = ({navigation}) => (
  <SurveyStack.Navigator screenOptions={{
    headerStyle : {
      backgroundColor:'#21C885',
    },
    headerTintColor:"#fff",
    headerTitleAlign:'center',
    headerTitleStyle: {
      fontWeight:"bold"
    }
  }}>
    <SurveyStack.Screen name="Survey" component={Survey} options={{
      title:"Survey",
      headerLeft: null  
    }} />
    </SurveyStack.Navigator>
);

const MapStackScreen = ({navigation}) => (
  <MapStack.Navigator screenOptions={{
    headerStyle : {
      backgroundColor:'#22BD49',
    },
    headerTintColor:"#fff",
    headerTitleAlign:'center',
    headerTitleStyle: {
      fontWeight:"bold"
    }
  }}>
    <MapStack.Screen name="Maps" component={Maps} options={{
      title:"Maps",
      headerLeft: null  
    }} />
    </MapStack.Navigator>
);

const CasesStackScreen = ({navigation}) => (
  <CaseStack.Navigator screenOptions={{
    headerStyle : {
      backgroundColor:'#7922BD',
    },
    headerTintColor:"#fff",
    headerTitleAlign:'center',
    headerTitleStyle: {
      fontWeight:"bold"
    }
  }}>
    <CaseStack.Screen name="Cases" component={Cases} options={{
      title:"Cases",
      headerLeft: null  
    }} />
    </CaseStack.Navigator>
);

const NewsStackScreen = ({navigation}) => (
  <NewsStack.Navigator screenOptions={{
    headerStyle : {
      backgroundColor:'#BD2232',
    },
    headerTintColor:"#fff",
    headerTitleAlign:'center',
    headerTitleStyle: {
      fontWeight:"bold"
    }
  }}>
    <NewsStack.Screen name="News" component={News} options={{
      title:"News",
      headerLeft: null  
    }} />
    </NewsStack.Navigator>
);



function Main() {
  return (
    <Tab.Navigator
      initialRouteName="Survey"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Survey"
        component={SurveyStackScreen}
        options={{
          tabBarLabel: 'Survey',
          tabBarColor:'#21C885',
          tabBarIcon: ({ color }) => (
            <Icon name="form" type="ant-design" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Maps"
        component={MapStackScreen}
        options={{
          tabBarLabel: 'Maps',
          tabBarColor:'#22BD49',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-map" type='ionicon' color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Cases"
        component={CasesStackScreen}
        options={{
          tabBarLabel: 'Cases',
          tabBarColor:'#7922BD',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-heart" type='ionicon' color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsStackScreen}
        options={{
          tabBarLabel: 'News',
          tabBarColor:'#BD2232',
          tabBarIcon: ({ color }) => (
            <Icon name="newspaper-sharp" type='ionicon' color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;