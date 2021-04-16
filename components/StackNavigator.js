
import React, { useContext } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from "@react-navigation/stack";
import Leagues from '../screens/LeaguesScreen';
import Table from '../screens/LeagueTableScreen';
import Team from '../screens/TeamScreen';
import Settings from '../screens/SettingsScreen';


import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const Stack = createStackNavigator();
const fullWidth = Dimensions.get('window').width;



function Header() {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 27 }}>SC</Text>
        <Ionicons name="ios-football" size={26} color="white" />
        <Text style={{ color: 'white', fontSize: 27 }}>RE</Text>
      </View>
    </View>
  );
}


const MainStackNavigator = ({ route, navigation }) => {

  return (
    <Stack.Navigator >

      <Stack.Screen name="Leagues" component={Leagues}
        options={{
          title: 'SCORE',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#27ae60',
          },
          headerTintColor: '#fff',
          headerTitle: <Header />,
        }}
      />
      <Stack.Screen name="Table" component={Table}
        options={{
          title: 'SCORE',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#27ae60',
          },
          headerTintColor: '#fff',

          headerTitle: <Header />
        }}
      />
      <Stack.Screen name="Team" component={Team}
        options={{
          title: 'SCORE',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#27ae60',
          },
          headerTintColor: '#fff',

          headerTitle: <Header />
        }}
      />
      <Stack.Screen name="Settings" component={Settings}
        options={{
          title: 'SCORE',
          headerTitleAlign: 'center',
          // headerRight: () => (< Feather name="settings" size={26} color="white" style={{ padding: 15 }} />),
          headerStyle: {
            backgroundColor: '#27ae60',
          },
          headerTintColor: '#fff',
          headerTitle: <Header />
        }}
      />


    </Stack.Navigator>
  );
}



export default MainStackNavigator;