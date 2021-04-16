import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList, Dimensions, Image } from 'react-native';
import AppContext from "./toggleContext";

const fullWidth = Dimensions.get('window').width;

const Table = ({ item, image, navigation}) => {
  const [table, setTable] = useState([]);


  useEffect(() => {
    setTable(item);

    teamStatusColor();

  })

  const myContext = useContext(AppContext);



  function teamStatusColor(overall_promotion) {


    const price_formatted = overall_promotion;
    const promotion = typeof price_formatted === "string" ? price_formatted.split(' ')[0] : ""

    if (overall_promotion == 'Promotion - Champions League (Group Stage)') {
      return '#4d94ff';
    } else if (overall_promotion == "Promotion - Europa League (Group Stage)") {
      return '#ff9933';
    } else if (promotion == 'Relegation') {
      return '#ff4d4d';
    }

  }




  return (
    <View style={[myContext.toggleValue ? styles.container : stylesDark.container]}>


      <View style={{ padding: 5 }}>

        <Image
          style={{ width: 140, height: 140, alignSelf: 'center' }}
          source={image}
        />

      </View>


      <View style={[myContext.toggleValue ? styles.headerContainer : stylesDark.headerContainer]}>



        <Text style={[myContext.toggleValue ? styles.headerStatsLabels : stylesDark.headerStatsLabels]}>#</Text>

        <Text style={[myContext.toggleValue ? styles.headerStatsLabels : stylesDark.headerStatsLabels]}>Team</Text>

        <View style={[myContext.toggleValue ? styles.statisticsHeaderContainer : stylesDark.statisticsHeaderContainer]}>

          <Text style={[myContext.toggleValue ? styles.headerStatsLabels : stylesDark.headerStatsLabels]}>P</Text>

          <Text style={[myContext.toggleValue ? styles.headerStatsLabels : stylesDark.headerStatsLabels]}>GF</Text>

          <Text style={[myContext.toggleValue ? styles.headerStatsLabels : stylesDark.headerStatsLabels]}>GA</Text>

          <Text style={[myContext.toggleValue ? styles.headerStatsLabels : stylesDark.headerStatsLabels]}>Pts</Text>
        </View>


      </View>

      <FlatList
        data={item}
        renderItem={({ item, index }) =>
          <TouchableOpacity onPress={() => { navigation.navigate('Team', { teamId: item.team_id, leagueId: item.league_id , teamStats:item}) }}>
            <View style={[myContext.toggleValue ? styles.flatListContainer : stylesDark.flatListContainer]}>


              <View style={[myContext.toggleValue ? [styles.positionNumberContainer, { backgroundColor: teamStatusColor(item.overall_promotion) }] : [stylesDark.positionNumberContainer, { backgroundColor: teamStatusColor(item.overall_promotion) }]]}>

                <Text style={[myContext.toggleValue ? styles.positionNumber : stylesDark.positionNumber]}>{index + 1}  </Text>

              </View>


              <Text
                numberOfLines={1}
                style={[myContext.toggleValue ? styles.teamLabel : stylesDark.teamLabel]}
              >
                {item.team_name}
              </Text>


              <View style={[myContext.toggleValue ? styles.statisticsContainer : stylesDark.statisticsContainer]}>

                <Text style={[myContext.toggleValue ? styles.statsLabels : stylesDark.statsLabels]}>{item.overall_league_payed}</Text>

                <Text style={[myContext.toggleValue ? styles.statsLabels : stylesDark.statsLabels]}>{item.overall_league_GF}</Text>

                <Text style={[myContext.toggleValue ? styles.statsLabels : stylesDark.statsLabels]}>{item.overall_league_GA}</Text>

                <Text style={[myContext.toggleValue ? styles.statsLabels : stylesDark.statsLabels]}>{item.overall_league_PTS}</Text>
              </View>

            </View>


          </TouchableOpacity>

        }
        keyExtractor={item => item.team_id}
      >

      </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',

  },
  flatListContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    width: fullWidth,
    backgroundColor: 'white',
    height:46

  },
  positionNumberContainer: {
    flex: 0.3,
    borderRightWidth: 1,
    
  },
  positionNumber: {
    fontSize: 20,
    color: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5
  },
  teamLabel: {
    padding: 5,
    color: 'black',
    fontSize: 20,
    flex: 1.5,
    
  },
  statisticsContainer: {
    flex: 1.3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  statsLabels: {
    fontSize: 14,
    padding: 5,
    paddingHorizontal: 10,
    color: 'black',
    alignSelf: 'center',
    flex: 1,
  },
  statisticsHeaderContainer: {
    flex: 1.3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#d1d1d1',
  },
  headerStatsLabels: {

    padding: 5,
    paddingHorizontal: 10,
    color: 'black',
    backgroundColor: '#d1d1d1'
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderWidth: 0.5,
    width: fullWidth,
    backgroundColor: '#d1d1d1',
  },


});
const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',

  },
  flatListContainer: {
    flexDirection: 'row',
    borderWidth: 0.3,
    borderColor: '#707070',
    width: fullWidth,
    backgroundColor: '#121212',
    height:46
  },
  positionNumberContainer: {
    flex: 0.3,
    borderRightWidth: 1,
    borderColor: '#707070',
    
  },
  positionNumber: {
    fontSize: 20,
    color: '#D6D6D6',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5

  },
  teamLabel: {
    padding: 5,
    color: '#D6D6D6',
    fontSize: 20,
    flex: 1.5
  },
  statisticsContainer: {
    flex: 1.3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#121212',
  },
  statsLabels: {
    fontSize: 14,
    padding: 5,
    paddingHorizontal: 10,
    color: '#D6D6D6',
    alignSelf: 'center',
    flex: 1,

  },
  headerStatsLabels: {
    padding: 5,
    paddingHorizontal: 8,
    color: '#D6D6D6'
  },
  statisticsHeaderContainer: {
    flex: 1.3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#272727',
  },
  headerStatsLabels: {
    padding: 5,
    paddingHorizontal: 10,
    color: '#D6D6D6',
    backgroundColor: '#272727'
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderWidth: 0.5,
    width: fullWidth,
    backgroundColor: '#272727',
  },
});

export default Table;