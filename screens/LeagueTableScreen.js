import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native';
import AppContext from "../components/toggleContext";
import Table from "../components/Table";
import axios from 'axios';
import { WaveIndicator} from 'react-native-indicators';
import { Feather } from '@expo/vector-icons';

const LeagueTableScreen = ({ route, navigation }) => {

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => { navigation.navigate('Settings') }}>
        <Feather name="settings" size={26} color="white" style={{ padding: 15 }} />
      </TouchableOpacity>
    )
  })


  const [league_table, setLeague_table] = useState('');
  const [loading, setloading] = useState(true);

  const { leagueImage } = route.params;
  const { leagueId } = route.params;

  useEffect(() => {

    axios.get(`https://apiv2.apifootball.com/?action=get_standings&league_id=${leagueId}&APIkey=8f8f4594d71357c3ce5c0d9ee136ceac676962384ccf4443aba2d3bf5659cd6b`)
      .then(res => {
        const table = res.data;

        setloading(false);
        setLeague_table(table);
        
      })

  },[]);


 


  const myContext = useContext(AppContext);

  if (loading) {
    return (
      <View style={[!myContext.toggleValue ? stylesLight.loading : stylesDark.loading]}>
        <WaveIndicator size={100} color='#27ae60' />
      </View>
    );
  } else {
    return (

      <View style={[myContext.toggleValue ? stylesLight.container : stylesDark.container]}>
        <Table item={league_table} image={leagueImage} navigation={navigation}></Table>
      </View>

    );
  }


}


const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'black',
    fontSize: 20,
  },
  loading: {
    flex: 1,
    backgroundColor: '#121212'
  }
});
const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: 20
  },
  loading: {
    flex: 1,
    backgroundColor: 'white'
  }
});


export default LeagueTableScreen;