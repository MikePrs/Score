import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Dimensions, Image } from 'react-native';
import axios from 'axios';
import AppContext from "../components/toggleContext";
import { WaveIndicator } from 'react-native-indicators';
import ProgressLabel from 'react-progress-label';
import { Feather } from '@expo/vector-icons';


const fullWidth = Dimensions.get('window').width;

const TeamScreen = ({ route, navigation }) => {
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => { navigation.navigate('Settings') }}>
        <Feather name="settings" size={26} color="white" style={{ padding: 15 }} />
      </TouchableOpacity>
    )
  })

  const { teamStats } = route.params;
  const [players, setPlayers] = useState('');
  const [coach, setCoach] = useState('');
  const [loading, setloading] = useState(true);
  const [TeamBadge, setTeamBadge] = useState('');



  const myContext = useContext(AppContext);

  useEffect(() => {


    axios.get(`https://apiv2.apifootball.com/?action=get_teams&league_id=${teamStats.league_id}&team_id=${teamStats.team_id}&APIkey=8f8f4594d71357c3ce5c0d9ee136ceac676962384ccf4443aba2d3bf5659cd6b`)
      .then(res => {

        const teams = res.data;

        // setPlayers(teams[0].players);
        setCoach(teams[0].coaches);


        setTeamBadge(teamStats.team_badge);
        category(teams[0].players)
        setloading(false);
      })

  }, []);



  function category(data) {
    var newData = [];
    var executed = false;
    var executed1 = false;
    var executed2 = false;
    var executed3 = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].player_type === "Goalkeepers") {

        if (!executed) {
          newData.push({ player_name: data[i].player_type });
          executed = true;
        }
        newData.push(data[i]);

      } else if (data[i].player_type === "Defenders") {

        if (!executed1) {
          newData.push({ player_name: data[i].player_type });
          executed1 = true;
        }
        newData.push(data[i]);

      } else if (data[i].player_type === "Midfielders") {

        if (!executed2) {
          newData.push({ player_name: data[i].player_type });
          executed2 = true;
        }
        newData.push(data[i]);

      } else if (data[i].player_type === "Forwards") {

        if (!executed3) {
          newData.push({ player_name: data[i].player_type });
          executed3 = true;
        }
        newData.push(data[i]);

      }

    }
    setPlayers(newData);
  }



  function icon(item) {
    if (myContext.toggleValue) {
      if (item.player_name === "Goalkeepers") {
        return require("../assets/hand.png");
      } else if (item.player_name === "Defenders") {
        return require("../assets/shield.png");
      } else if (item.player_name === "Midfielders") {
        return require("../assets/center.png");
      } else if (item.player_name === "Forwards") {
        return require("../assets/forward.png");
      } else {
        return require("../assets/pencil.png");
      }
    } else {
      if (item.player_name === "Goalkeepers") {
        return require("../assets/Dark_hand.png");
      } else if (item.player_name === "Defenders") {
        return require("../assets/Dark_shield.png");
      } else if (item.player_name === "Midfielders") {
        return require("../assets/Dark_center.png");
      } else if (item.player_name === "Forwards") {
        return require("../assets/Dark_forward.png");
      } else {
        return require("../assets/Dark_pencil.png");
      }
    }
  }


  function DarkModeProgress() {
    if (myContext.toggleValue) {
      return '#D6D6D6'
    } else {
      return '#272727'
    }
  }



  if (loading) {
    return (
      <View style={[!myContext.toggleValue ? stylesLight.loading : stylesDark.loading]}>
        <WaveIndicator size={100} color='#27ae60' />
      </View>
    );
  } else {
    return (
      <ScrollView>
        <View style={[myContext.toggleValue ? stylesLight.container : stylesDark.container]}>

          <View style={{ padding: 8 }}>

            <Image
              style={[myContext.toggleValue ? stylesLight.image : stylesDark.image]}
              source={{ uri: TeamBadge }}
            />


            <Text style={[myContext.toggleValue ? stylesLight.teamName : stylesDark.teamName]}>{teamStats.team_name}</Text>


            <ScrollView horizontal={true} style={{ paddingVertical: 35 }}>

              <View style={[myContext.toggleValue ? stylesLight.statsContainer : stylesDark.statsContainer]}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={[myContext.toggleValue ? stylesLight.statsHeader : stylesDark.statsHeader]}>Overall</Text>
                </View>
                <Text style={[myContext.toggleValue ? stylesLight.positionLabel : stylesDark.positionLabel]}>Pos: #{teamStats.overall_league_position}</Text>
                <View style={[myContext.toggleValue ? stylesLight.teamStatsContainer : stylesDark.teamStatsContainer]}>
                  <Text style={[myContext.toggleValue ? stylesLight.teamStats : stylesDark.teamStats]}>W:{teamStats.overall_league_W}</Text>
                  <Text style={[myContext.toggleValue ? stylesLight.teamStats : stylesDark.teamStats]}>D:{teamStats.overall_league_D}</Text>
                  <Text style={[myContext.toggleValue ? stylesLight.teamStats : stylesDark.teamStats]}>L:{teamStats.overall_league_L}</Text>
                </View>



                <View style={[myContext.toggleValue ? stylesLight.teamStatsContainer : stylesDark.teamStatsContainer]}>
                  <View style={{ alignSelf: 'center' }}>
                    <ProgressLabel
                      progress={parseFloat(teamStats.overall_league_GF) * 100 / parseFloat(teamStats.overall_league_payed) > 100 ? 100 : parseFloat(teamStats.overall_league_GF) * 100 / parseFloat(teamStats.overall_league_payed)}
                      fillColor={DarkModeProgress()}
                      trackColor="#90caf9"
                      progressColor="#0984e3"
                      progressWidth={6}
                      trackWidth={6}
                      trackBorderWidth={1}
                      trackBorderColor={DarkModeProgress()}
                      cornersWidth={5}
                      size={80}
                      text={(parseFloat(teamStats.overall_league_GF) / parseFloat(teamStats.overall_league_payed)).toFixed(1)}
                      textProps={{
                        x: '50%',
                        y: '50%',
                        dx: 2,
                        dy: 8,
                        textAnchor: 'middle',
                        style: {
                          fontSize: 20,
                          fontWeight: '500',
                          fill: '#0984e3'
                        }
                      }}
                    />
                    <View style={{ flexDirection: 'column', }}>
                      <Text style={[myContext.toggleValue ? stylesLight.progressLabels : stylesDark.progressLabels]}>GF / game</Text>
                    </View>
                  </View>

                  <View style={{ alignSelf: 'center' }}>
                    <ProgressLabel
                      progress={parseFloat(teamStats.overall_league_GA) * 100 / parseFloat(teamStats.overall_league_payed) > 100 ? 100 : parseFloat(teamStats.overall_league_GA) * 100 / parseFloat(teamStats.overall_league_payed)}
                      fillColor={DarkModeProgress()}
                      trackColor="#90caf9"
                      progressColor="#0984e3"
                      progressWidth={6}
                      trackWidth={6}
                      trackBorderWidth={1}
                      trackBorderColor={DarkModeProgress()}
                      cornersWidth={5}
                      size={80}
                      text={(parseFloat(teamStats.overall_league_GA) / parseFloat(teamStats.overall_league_payed)).toFixed(1)}
                      textProps={{
                        x: '50%',
                        y: '50%',
                        dx: 2,
                        dy: 8,
                        textAnchor: 'middle',
                        style: {
                          fontSize: 20,
                          fontWeight: '500',
                          fill: '#0984e3'
                        }
                      }}
                    />
                    <View style={{ flexDirection: 'column', }}>
                      <Text style={[myContext.toggleValue ? stylesLight.progressLabels : stylesDark.progressLabels]}>GA / game</Text>
                    </View>
                  </View>
                </View>

                <View style={{ alignSelf: 'center' }}>
                  <ProgressLabel
                    progress={parseFloat(teamStats.overall_league_W) * 100 / parseFloat(teamStats.overall_league_payed)}
                    fillColor={DarkModeProgress()}
                    trackColor="#90caf9"
                    progressColor="#0984e3"
                    progressWidth={6}
                    trackWidth={6}
                    trackBorderWidth={1}
                    trackBorderColor={DarkModeProgress()}
                    cornersWidth={5}
                    size={80}
                    text={(parseFloat(teamStats.overall_league_W) * 100 / parseFloat(teamStats.overall_league_payed)).toFixed(1) + "%"}
                    textProps={{
                      x: '50%',
                      y: '50%',
                      dx: 2,
                      dy: 8,
                      textAnchor: 'middle',
                      style: {
                        fontSize: 20,
                        fontWeight: '500',
                        fill: '#0984e3'
                      }
                    }}
                  />
                </View>
                <View style={{ flexDirection: 'column', }}>
                  <Text style={[myContext.toggleValue ? stylesLight.progressLabels : stylesDark.progressLabels]}>Win %</Text>
                </View>
              </View>


              <View style={[myContext.toggleValue ? stylesLight.statsContainer : stylesDark.statsContainer]}>
                <View style={{ flexDirection: 'column', }}>
                  <Text style={[myContext.toggleValue ? stylesLight.statsHeader : stylesDark.statsHeader]}>Home</Text>
                </View>
                <Text style={[myContext.toggleValue ? stylesLight.positionLabel : stylesDark.positionLabel]}>Pos: #{teamStats.home_league_position}</Text>
                <View style={[myContext.toggleValue ? stylesLight.teamStatsContainer : stylesDark.teamStatsContainer]}>
                  <Text style={[myContext.toggleValue ? stylesLight.teamStats : stylesDark.teamStats]}>W:{teamStats.home_league_W}</Text>
                  <Text style={[myContext.toggleValue ? stylesLight.teamStats : stylesDark.teamStats]}>D:{teamStats.home_league_D}</Text>
                  <Text style={[myContext.toggleValue ? stylesLight.teamStats : stylesDark.teamStats]}>L:{teamStats.home_league_L}</Text>
                </View>

                <View style={[myContext.toggleValue ? stylesLight.teamStatsContainer : stylesDark.teamStatsContainer]}>
                  <View style={{ alignSelf: 'center' }}>
                    <ProgressLabel
                      progress={parseFloat(teamStats.home_league_GF) * 100 / parseFloat(teamStats.home_league_payed) > 100 ? 100 : parseFloat(teamStats.home_league_GF) * 100 / parseFloat(teamStats.home_league_payed)}
                      fillColor={DarkModeProgress()}
                      trackColor="#90caf9"
                      progressColor="#0984e3"
                      progressWidth={6}
                      trackWidth={6}
                      trackBorderWidth={1}
                      trackBorderColor={DarkModeProgress()}
                      cornersWidth={5}
                      size={80}
                      text={(parseFloat(teamStats.home_league_GF) / parseFloat(teamStats.home_league_payed)).toFixed(1)}
                      textProps={{
                        x: '50%',
                        y: '50%',
                        dx: 2,
                        dy: 8,
                        textAnchor: 'middle',
                        style: {
                          fontSize: 20,
                          fontWeight: '500',
                          fill: '#0984e3'
                        }
                      }}
                    />
                    <View style={{ flexDirection: 'column', }}>
                      <Text style={[myContext.toggleValue ? stylesLight.progressLabels : stylesDark.progressLabels]}>GF / game</Text>
                    </View>
                  </View>

                  <View style={{ alignSelf: 'center' }}>
                    <ProgressLabel
                      progress={parseFloat(teamStats.overall_league_GA) * 100 / parseFloat(teamStats.overall_league_payed) > 100 ? 100 : parseFloat(teamStats.home_league_GA) * 100 / parseFloat(teamStats.home_league_payed)}
                      fillColor={DarkModeProgress()}
                      trackColor="#90caf9"
                      progressColor="#0984e3"
                      progressWidth={6}
                      trackWidth={6}
                      trackBorderWidth={1}
                      trackBorderColor={DarkModeProgress()}
                      cornersWidth={5}
                      size={80}
                      text={(parseFloat(teamStats.home_league_GA) / parseFloat(teamStats.home_league_payed)).toFixed(1)}
                      textProps={{
                        x: '50%',
                        y: '50%',
                        dx: 2,
                        dy: 8,
                        textAnchor: 'middle',
                        style: {
                          fontSize: 20,
                          fontWeight: '500',
                          fill: '#0984e3'
                        }
                      }}
                    />
                    <View style={{ flexDirection: 'column', }}>
                      <Text style={[myContext.toggleValue ? stylesLight.progressLabels : stylesDark.progressLabels]}>GA / game</Text>
                    </View>
                  </View>
                </View>

                <View style={{ alignSelf: 'center' }}>
                  <ProgressLabel
                    progress={parseFloat(teamStats.home_league_W) * 100 / parseFloat(teamStats.home_league_payed)}
                    fillColor={DarkModeProgress()}
                    trackColor="#90caf9"
                    progressColor="#0984e3"
                    progressWidth={6}
                    trackWidth={6}
                    trackBorderWidth={1}
                    trackBorderColor={DarkModeProgress()}
                    cornersWidth={5}
                    size={80}
                    text={(parseFloat(teamStats.home_league_W) * 100 / parseFloat(teamStats.home_league_payed)).toFixed(1) + "%"}
                    textProps={{
                      x: '50%',
                      y: '50%',
                      dx: 2,
                      dy: 8,
                      textAnchor: 'middle',
                      style: {
                        fontSize: 20,
                        fontWeight: '500',
                        fill: '#0984e3'
                      }
                    }}
                  />
                </View>
                <View style={{ flexDirection: 'column', }}>
                  <Text style={[myContext.toggleValue ? stylesLight.progressLabels : stylesDark.progressLabels]}>Win %</Text>
                </View>
              </View>


              <View style={[myContext.toggleValue ? stylesLight.statsContainer : stylesDark.statsContainer]}>
                <View style={{ flexDirection: 'column', }}>
                  <Text style={[myContext.toggleValue ? stylesLight.statsHeader : stylesDark.statsHeader]}>Away</Text>
                </View>
                <Text style={[myContext.toggleValue ? stylesLight.positionLabel : stylesDark.positionLabel]}>Pos: #{teamStats.away_league_position}</Text>
                <View style={[myContext.toggleValue ? stylesLight.teamStatsContainer : stylesDark.teamStatsContainer]}>
                  <Text style={[myContext.toggleValue ? stylesLight.teamStats : stylesDark.teamStats]}>W:{teamStats.away_league_W}</Text>
                  <Text style={[myContext.toggleValue ? stylesLight.teamStats : stylesDark.teamStats]}>D:{teamStats.away_league_D}</Text>
                  <Text style={[myContext.toggleValue ? stylesLight.teamStats : stylesDark.teamStats]}>L:{teamStats.away_league_L}</Text>
                </View>

                <View style={[myContext.toggleValue ? stylesLight.teamStatsContainer : stylesDark.teamStatsContainer]}>
                  <View style={{ alignSelf: 'center' }}>
                    <ProgressLabel
                      progress={parseFloat(teamStats.away_league_GF) * 100 / parseFloat(teamStats.away_league_payed) > 100 ? 100 : parseFloat(teamStats.away_league_GF) * 100 / parseFloat(teamStats.away_league_payed)}
                      fillColor={DarkModeProgress()}
                      trackColor="#90caf9"
                      progressColor="#0984e3"
                      progressWidth={6}
                      trackWidth={6}
                      trackBorderWidth={1}
                      trackBorderColor={DarkModeProgress()}
                      cornersWidth={5}
                      size={80}
                      text={(parseFloat(teamStats.away_league_GF) / parseFloat(teamStats.away_league_payed)).toFixed(1)}
                      textProps={{
                        x: '50%',
                        y: '50%',
                        dx: 2,
                        dy: 8,
                        textAnchor: 'middle',
                        style: {
                          fontSize: 20,
                          fontWeight: '500',
                          fill: '#0984e3'
                        }
                      }}
                    />
                    <View style={{ flexDirection: 'column', }}>
                      <Text style={[myContext.toggleValue ? stylesLight.progressLabels : stylesDark.progressLabels]}>GF / game</Text>
                    </View>
                  </View>

                  <View style={{ alignSelf: 'center' }}>
                    <ProgressLabel
                      progress={parseFloat(teamStats.away_league_GA) * 100 / parseFloat(teamStats.away_league_payed) > 100 ? 100 : parseFloat(teamStats.away_league_GA) * 100 / parseFloat(teamStats.away_league_payed)}
                      fillColor={DarkModeProgress()}
                      trackColor="#90caf9"
                      progressColor="#0984e3"
                      progressWidth={6}
                      trackWidth={6}
                      trackBorderWidth={1}
                      trackBorderColor={DarkModeProgress()}
                      cornersWidth={5}
                      size={80}
                      text={(parseFloat(teamStats.away_league_GA) / parseFloat(teamStats.away_league_payed)).toFixed(1)}
                      textProps={{
                        x: '50%',
                        y: '50%',
                        dx: 2,
                        dy: 8,
                        textAnchor: 'middle',
                        style: {
                          fontSize: 20,
                          fontWeight: '500',
                          fill: '#0984e3'
                        }
                      }}
                    />
                    <View style={{ flexDirection: 'column', }}>
                      <Text style={[myContext.toggleValue ? stylesLight.progressLabels : stylesDark.progressLabels]}>GA / game</Text>
                    </View>
                  </View>
                </View>

                <View style={{ alignSelf: 'center' }}>
                  <ProgressLabel
                    progress={parseFloat(teamStats.away_league_W) * 100 / parseFloat(teamStats.away_league_payed)}
                    fillColor={DarkModeProgress()}
                    trackColor="#90caf9"
                    progressColor="#0984e3"
                    progressWidth={6}
                    trackWidth={6}
                    trackBorderWidth={1}
                    trackBorderColor={DarkModeProgress()}
                    cornersWidth={5}
                    size={80}
                    text={(parseFloat(teamStats.away_league_W) * 100 / parseFloat(teamStats.away_league_payed)).toFixed(1) + "%"}
                    textProps={{
                      x: '50%',
                      y: '50%',
                      dx: 2,
                      dy: 8,
                      textAnchor: 'middle',
                      style: {
                        fontSize: 20,
                        fontWeight: '500',
                        fill: '#0984e3'
                      }
                    }}
                  />
                </View>
                <View style={{ flexDirection: 'column', }}>
                  <Text style={[myContext.toggleValue ? stylesLight.progressLabels : stylesDark.progressLabels]}>Win %</Text>
                </View>
              </View>

            </ScrollView>




            <View style={[myContext.toggleValue ? stylesLight.seperatorContainer : stylesDark.seperatorContainer]}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[myContext.toggleValue ? stylesLight.playerName : stylesDark.playerName]}>
                  Coach
                </Text>
                <View style={{ padding: 10 }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={icon(players)}
                  />
                </View>
              </View>
            </View>

            <FlatList
              data={coach}
              renderItem={({ item, index }) => {
                return (
                  <View style={[myContext.toggleValue ? stylesLight.flatListContainer : stylesDark.flatListContainer]}>
                    <Text style={[myContext.toggleValue ? stylesLight.playerLabel : stylesDark.playerLabel]}>{item.coach_name}</Text>
                  </View>
                );
              }}
              keyExtractor={item => item.player_key}
            >
            </FlatList>



            <FlatList
              data={players}
              renderItem={({ item, index }) => {

                return (
                  <View >
                    {(item.player_name != "Goalkeepers" && item.player_name != "Defenders" && item.player_name != "Midfielders" && item.player_name != "Forwards")
                      ?
                      <View style={[myContext.toggleValue ? stylesLight.flatListContainer : stylesDark.flatListContainer]}>
                        <Text style={[myContext.toggleValue ? stylesLight.playerLabel : stylesDark.playerLabel]}>{item.player_name}</Text>
                        <Text style={[myContext.toggleValue ? stylesLight.playerNumLabel : stylesDark.playerNumLabel]}>{item.player_number}</Text>
                      </View>
                      :
                      <View style={[myContext.toggleValue ? stylesLight.seperatorContainer : stylesDark.seperatorContainer]}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[myContext.toggleValue ? stylesLight.playerName : stylesDark.playerName]}>
                            {item.player_name}
                          </Text>
                          <View style={{ padding: 10 }}>
                            <Image
                              style={{ width: 20, height: 20 }}
                              source={icon(item)}
                            />
                          </View>
                        </View>
                      </View>
                    }

                  </View>
                );

              }}
              keyExtractor={item => item.player_key}
            >
            </FlatList>



          </View>
        </View>
      </ScrollView >
    );
  }
}

const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  playerLabel: {
    padding: 5,
    color: 'black',
    fontSize: 20,
    flex: 1.5,
  },
  flatListContainer: {
    flexDirection: 'row',
    borderWidth: 0.3,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  image: {
    width: 140,
    height: 140,
    alignSelf: 'center'
  },
  teamName: {
    alignSelf: 'center',
    fontSize: 27,
    color: "black"
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 300,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: "#D6D6D6"
  },
  statsHeader: {
    alignSelf: 'center',
    fontSize: 27,
    color: 'black'
  },
  positionLabel: {
    fontSize: 27,
    marginHorizontal: 10,
    color: 'black'
  },
  teamStatsContainer: {
    flexDirection: 'row',
    width: fullWidth - 80,
    marginHorizontal: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  teamStats: {
    fontSize: 27,
    color: "black"
  },
  progressLabels: {
    alignSelf: 'center',
    color: "black"
  },
  seperatorContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#d1d1d1',
    justifyContent: 'center',
    alignItems: 'center',
    color: "black"
  },
  playerNumLabel: {
    fontSize: 20,
    padding: 5,
    marginRight: 10,
    alignSelf: 'flex-end'
  },
  playerName: {
    fontSize: 20,
    padding: 5,
    color: "black"
  },
  loading: {
    flex: 1,
    backgroundColor: '#121212'
  }
});





const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  playerLabel: {
    padding: 5,
    color: '#D6D6D6',
    fontSize: 20,
    flex: 1.5,
  },
  flatListContainer: {
    flexDirection: 'row',
    borderWidth: 0.3,
    borderColor: '#707070',
    backgroundColor: '#272727',
  },
  image: {
    width: 140,
    height: 140,
    alignSelf: 'center'
  },
  teamName: {
    alignSelf: 'center',
    fontSize: 27,
    color: "#D6D6D6"
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 300,
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: "#272727"
  },
  statsHeader: {
    alignSelf: 'center',
    fontSize: 27,
    color: "#D6D6D6"
  },
  positionLabel: {
    fontSize: 27,
    marginHorizontal: 10,
    color: "#D6D6D6"
  },
  teamStatsContainer: {
    flexDirection: 'row',
    width: fullWidth - 80,
    marginHorizontal: 10,
    flex: 1,
    justifyContent: 'space-between',
    color: "#D6D6D6"
  },
  teamStats: {
    fontSize: 27,
    color: "#D6D6D6"
  },
  progressLabels: {
    alignSelf: 'center',
    color: "#D6D6D6"
  },
  seperatorContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#707070',
    justifyContent: 'center',
    alignItems: 'center',

  },
  playerNumLabel: {
    fontSize: 20,
    padding: 5,
    marginRight: 10,
    alignSelf: 'flex-end',
    color: "#D6D6D6"
  },
  playerName: {
    fontSize: 20,
    padding: 5,
    color: "#D6D6D6"
  },
  loading: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default TeamScreen;