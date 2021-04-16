import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Dimensions, Image, SectionList } from 'react-native';
import AppContext from "../components/toggleContext";
import ToggleSwitch from 'toggle-switch-react-native';
import ToggleContext from "../components/toggleContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const fullWidth = Dimensions.get('window').width;

const SettingsScreen = () => {
  const myContext = useContext(ToggleContext);

  async function onToggle() {
    await myContext.toggleTheme();


    if (myContext.toggleValue) {
      myContext.storeData("light");
      console.log("settings light" + myContext.toggleValue);

    } else {
      myContext.storeData("dark");
      console.log("settings dark" + myContext.toggleValue);

    }
   

  }


  return (
    <View style={[myContext.toggleValue ? stylesLight.container : stylesDark.container]}>

      <Text style={[myContext.toggleValue ? stylesLight.header : stylesDark.header]}>Settings</Text>

      <View style={[myContext.toggleValue ? stylesLight.box : stylesDark.box]}>

        <Text style={[myContext.toggleValue ? stylesLight.text : stylesDark.text]}>Dark Mode</Text>

        <ToggleSwitch
          style={stylesLight.toggle}
          isOn={!myContext.toggleValue}
          onColor="green"
          offColor="black"
          size="medium"
          onToggle={() => onToggle()}
        />

      </View>
    </View>
  );

}

const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 40,
    paddingHorizontal: 3,
    color:"black"
  },
  text: {
    fontSize: 25,
    paddingHorizontal: 20,
    flex: 1,
    color: "black"
  },
  box: {
    borderWidth: 1,
    borderColor: "#707070",
    marginTop: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    backgroundColor:'white'
  },
  toggle: {
    alignSelf: 'flex-end', 
    paddingHorizontal: 20, 
    bottom: 4
  },
});


const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 40,
    paddingHorizontal: 3,
    color: "#D6D6D6"
  },
  text: {
    fontSize: 25,
    paddingHorizontal: 20,
    flex: 1,
    color: "#D6D6D6"
  },
  box: {
    borderWidth: 0.5,
    borderColor: "#707070",
    marginTop: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    backgroundColor: '#121212'
  },
});

export default SettingsScreen;


