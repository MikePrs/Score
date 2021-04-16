import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Image, Animated } from 'react-native';
import { Container, Header, Content, ListItem } from 'native-base';
import ToggleContext from "../components/toggleContext";

import ToggleSwitch from 'toggle-switch-react-native';

import Icon from 'react-native-ico-flags';

import { DarkTheme, List } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';


export default function LeaguesScreen({ navigation }) {

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => { navigation.navigate('Settings') }}>
        <Feather name="settings" size={26} color="white" style={{ padding: 15 }} />
      </TouchableOpacity>
    )
  })
    
  const myContext = useContext(ToggleContext);




  function listColorMode() {
    if (myContext.toggleValue) {
      return 'black'
    } else {
      return 'white'
    }
  }

  function arrowColorMode() {
    if (myContext.toggleValue) {
      return
    } else {
      return DarkTheme
    } 
  }

  // const [expanded, setExpanded] = React.useState(true);
  // const handlePress = () => setExpanded(!expanded);


  return (
    <ScrollView style={[myContext.toggleValue ? stylesLight.container : stylesDark.container]}>
      <View style={{ alignSelf: 'stretch' }}>

        <View style={stylesLight.dropDownItem}>

          <List.Section >
            <List.Accordion
              theme={arrowColorMode()}
              titleStyle={{ color: listColorMode(), fontSize: 20 }}
              title="England"
              left={props => <Icon name="england" height="35" width="40" />}>
              <TouchableOpacity onPress={() => { navigation.navigate('Table', { leagueImage: require("../assets/Premier_League_logo.png"), leagueId: 148 }) }} >
                <List.Item title="Premier League"
                  titleStyle={{ color: listColorMode(), fontSize: 15 }}
                  left={() =>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require('../assets/Premier_League_logo.png')}
                    />}
                />
              </TouchableOpacity  >
              <View style={[myContext.toggleValue ? stylesLight.seperator : stylesDark.seperator]} />
              <TouchableOpacity onPress={() => { navigation.navigate('Table', { leagueImage: require("../assets/EFL_Championship.png"), leagueId: 149 }) }}>
                <List.Item title="Championship"
                  titleStyle={{ color: listColorMode(), fontSize: 15 }}
                  left={() =>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require('../assets/EFL_Championship.png')}
                    />}
                />
              </TouchableOpacity>
            </List.Accordion>
            <View style={[myContext.toggleValue ? stylesLight.seperator : stylesDark.seperator]} />
            <List.Accordion
              theme={arrowColorMode()}
              titleStyle={{ color: listColorMode(), fontSize: 20 }}
              title="Spain"
              left={props => <Icon name="spain" height="35" width="40" />}>
              <TouchableOpacity onPress={() => { navigation.navigate('Table', { leagueImage: require("../assets/laliga.png"), leagueId: 468 }) }}>
                <List.Item title="La Liga"
                  titleStyle={{ color: listColorMode(), fontSize: 15 }}
                  left={() =>
                    <Image
                      style={{ width: 30, height: 40 }}
                      source={require('../assets/laliga.png')}
                    />}
                />
              </TouchableOpacity>
              <View style={[myContext.toggleValue ? stylesLight.seperator : stylesDark.seperator]} />
              <TouchableOpacity onPress={() => { navigation.navigate('Table', { leagueImage: require("../assets/LaLiga2.png"), leagueId: 469 }) }}>
                <List.Item title="La Liga 2"
                  titleStyle={{ color: listColorMode(), fontSize: 15 }}
                  left={() =>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require('../assets/LaLiga2.png')}
                    />}
                />
              </TouchableOpacity>
            </List.Accordion>
            <View style={[myContext.toggleValue ? stylesLight.seperator : stylesDark.seperator]} />
            <List.Accordion
              theme={arrowColorMode()}
              titleStyle={{ color: listColorMode(), fontSize: 20 }}
              title="France"
              left={props => <Icon name="france" height="35" width="40" />}>
              <TouchableOpacity onPress={() => { navigation.navigate('Table', { leagueImage: require("../assets/ligue1.png"), leagueId: 176 }) }}>
                <List.Item title="Ligue 1"
                  titleStyle={{ color: listColorMode(), fontSize: 15 }}
                  left={() =>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require('../assets/ligue1.png')}
                    />}
                />
              </TouchableOpacity>
              <View style={[myContext.toggleValue ? stylesLight.seperator : stylesDark.seperator]} />
              <TouchableOpacity onPress={() => { navigation.navigate('Table', { leagueImage: require("../assets/ligue2.png"), leagueId: 177 }) }}>
                <List.Item title="Ligue 2"
                  titleStyle={{ color: listColorMode(), fontSize: 15 }}
                  left={() =>
                    <Image
                      style={{ width: 50, height: 40 }}
                      source={require('../assets/ligue2.png')}
                    />}
                />
              </TouchableOpacity>
            </List.Accordion>
            <View style={[myContext.toggleValue ? stylesLight.seperator : stylesDark.seperator]} />
            <List.Accordion
              theme={arrowColorMode()}
              titleStyle={{ color: listColorMode(), fontSize: 20 }}
              title="Germany"
              left={props => <Icon name="germany" height="35" width="40" />}>
              <TouchableOpacity onPress={() => { navigation.navigate('Table', { leagueImage: require("../assets/Bundesliga.png"), leagueId: 195 }) }}>
                <List.Item title="Bundesliga "
                  titleStyle={{ color: listColorMode(), fontSize: 15 }}
                  left={() =>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require('../assets/Bundesliga.png')}
                    />}
                />
              </TouchableOpacity>
              <View style={[myContext.toggleValue ? stylesLight.seperator : stylesDark.seperator]} />
              <TouchableOpacity onPress={() => { navigation.navigate('Table', { leagueImage: require("../assets/Bundesliga2.png"), leagueId: 196 }) }}>
                <List.Item title="Ligue 2"
                  titleStyle={{ color: listColorMode(), fontSize: 15 }}
                  left={() =>
                    <Image
                      style={{ width: 50, height: 40 }}
                      source={require('../assets/Bundesliga2.png')}
                    />}
                />
              </TouchableOpacity>
            </List.Accordion>
            <View style={[myContext.toggleValue ? stylesLight.seperator : stylesDark.seperator]} />
            <List.Accordion
              theme={arrowColorMode()}
              titleStyle={{ color: listColorMode(), fontSize: 20 }}
              title="Greece"
              left={props => <Icon name="greece" height="35" width="40" />}>
              <TouchableOpacity onPress={() => { navigation.navigate('Table', { leagueImage: require("../assets/SuperLeague.png"), leagueId: 209 }) }}>
                <List.Item title="Superleague "
                  titleStyle={{ color: listColorMode(), fontSize: 15 }}
                  left={() =>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require('../assets/SuperLeague.png')}
                    />}
                />
              </TouchableOpacity>
              <View style={[myContext.toggleValue ? stylesLight.seperator : stylesDark.seperator]} />
              <TouchableOpacity onPress={() => { navigation.navigate('Table', { leagueImage: require("../assets/FootballLeague.png"), leagueId: 210 }) }}>
                <List.Item title="Football League"
                  titleStyle={{ color: listColorMode(), fontSize: 15 }}
                  left={() =>
                    <Image
                      style={{ width: 50, height: 40 }}
                      source={require('../assets/FootballLeague.png')}
                    />}
                />
              </TouchableOpacity>
            </List.Accordion>


          </List.Section>

        </View>
        <View style={[myContext.toggleValue ? stylesLight.seperator : stylesDark.seperator]} />

      </View>

    </ScrollView>
  );
}



const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  text: {
    fontSize: 25,
    color: 'black'
  },
  seperator: {
    paddingVertical: 5,
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    alignSelf: 'stretch'
  },
  dropDownItem: {
    padding: 10
  },
  dropItem: {
    paddingVertical: 10,
    marginHorizontal: 70,
    fontSize: 20,
    color: 'black'
  },

});
const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',

  },
  text: {
    fontSize: 25,
    color: 'white'
  },
  seperator: {
    paddingVertical: 5,
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    alignSelf: 'stretch'
  },
  dropDownItem: {
    padding: 20
  },
  dropItem: {
    paddingVertical: 10,
    marginHorizontal: 70,
    fontSize: 20,
    color: '#707070'
  },
  toggle: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    right: 10,
    height: 60,

    borderRadius: 100
  },
});