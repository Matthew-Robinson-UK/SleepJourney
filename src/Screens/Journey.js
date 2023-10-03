import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { habitList } from '../HabitData';
import { getNextHabit } from '../Components/GetNextHabit';
import { Button } from 'react-native-paper';
import AndroidPrompt from '../AndroidPrompt';
import NfcManager, { NfcEvents, NfcTech, Ndef } from 'react-native-nfc-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchStreak } from '../Components/DataHandler';

const images = {
    'toothbrush': require('../Assets/Images/toothbrush.png'),
    'water': require('../Assets/Images/water.png'),
    'charger': require('../Assets/Images/charger.png'),
};

function Journey(props) {
    const { route, navigation } = props;
    const { msg } = route.params;

    const lowerCaseMsg = msg.toLowerCase();
    const imageSource = images[lowerCaseMsg] || require('../Assets/Images/default.png');
    const nextHabit = getNextHabit(msg, habitList);

    const [completedHabits, setCompletedHabits] = React.useState([]);
    const [currentHabit, setCurrentHabit] = React.useState(msg);
    const [unlockedHabits, setUnlockedHabits] = React.useState([]);
    const [isRequestingNFC, setIsRequestingNFC] = React.useState(false);



    const androidPromptRef = React.useRef();

    function getHabitStatus(habitName) {
        if (completedHabits.includes(habitName)) {
            return 'completed';
        } else if (unlockedHabits.includes(habitName)) {
            return 'unlocked';
        } else if (habitName === currentHabit) {
            return 'active';
        } else {
            return 'default';
        }
    }
    
    React.useEffect(() => {
        const fetchCompletedHabits = async () => {
            try {
                const storedHabits = await AsyncStorage.getItem('completedHabits');
                if (storedHabits) {
                    setCompletedHabits(JSON.parse(storedHabits));
                }
            } catch (error) {
                console.error("Error fetching completed habits: ", error);
            }
        };
    
        fetchCompletedHabits();
    }, []);
    

    async function readNdef() {
        setIsRequestingNFC(true);
        console.log("Starting readNdef function...");
        if (isRequestingNFC) {
            console.warn("NFC request already in progress");
        }
        console.log("About to request NFC...");
        return new Promise(async (resolve, reject) => {
            try {
                if (Platform.OS === 'android') {
                    androidPromptRef.current.setHintText(`Now scan the ${nextHabit.name} tag`);
                    androidPromptRef.current.setVisible(true);
                }
                await NfcManager.requestTechnology(NfcTech.Ndef);
                const tag = await NfcManager.getTag();
    
                if (tag.ndefMessage && tag.ndefMessage.length > 0) {
                    const ndefRecord = tag.ndefMessage[0];
                    if (ndefRecord.tnf === Ndef.TNF_WELL_KNOWN) {
                      if (ndefRecord.type.every((b, i) => b === Ndef.RTD_BYTES_URI[i])) {
                        uri = Ndef.uri.decodePayload(ndefRecord.payload);
                      }
                    }
                  }
                
                  let scannedHabitName = uri && uri.split('://')[1];
                console.log(scannedHabitName);
        
                if (scannedHabitName !== nextHabit.name) {
                    androidPromptRef.current.setHintText(nextHabit.name + " is the next habit.");
                    setTimeout(() => androidPromptRef.current.setVisible(false), 2000);
                    return;
                }
        
                let updatedHabits = [...completedHabits, currentHabit];
        
                if (nextHabit.name === habitList[habitList.length - 1].name) {
                    updatedHabits.push(nextHabit.name); 
                    await AsyncStorage.setItem('completedHabits', JSON.stringify(updatedHabits));
                    setCompletedHabits(updatedHabits);
                    navigation.navigate('CompletedJourneyScreen');
                } else {
                    await AsyncStorage.setItem('completedHabits', JSON.stringify(updatedHabits));
                    setCompletedHabits(updatedHabits);
                    navigation.navigate('TagDetailsScreen', { tag });
                }
    
                resolve();
            } catch (ex) {
                setIsRequestingNFC(false);
                androidPromptRef.current.setHintText('Error');
                setTimeout(() => androidPromptRef.current.setVisible(false), 1000);
                reject(ex);
            } finally {
                setIsRequestingNFC(false);
                NfcManager.cancelTechnologyRequest();
            }
        });
    }

    return (
                <View style={styles.wrapper}>
    
                    {/* Progress Tracker */}
                    <View style={styles.progressTracker}>
                        {habitList.map((habit, index) => {
                            const status = getHabitStatus(habit.name);
                            let iconSource;
                            let iconStyles = [styles.habitIcon];  // store styles in an array
    
                            switch (status) {
                                case 'completed':
                                case 'active':
                                case 'unlocked':
                                    iconSource = images[habit.name.toLowerCase()];
                                    if (status === 'active') {
                                        iconStyles.push(styles.activeHabitIcon);
                                    }
                                    break;
                                default:
                                    iconSource = require('../Assets/Images/lock.png');
                                    iconStyles.push({ borderWidth: 0 }); // remove the border for the lock icon
                            }
    
                            return (
                                <View key={index} style={styles.iconContainer}>
                                    <Image 
                                        source={iconSource} 
                                        style={iconStyles} 
                                    />
                                    {(status === 'completed' || (status === 'active' && !unlockedHabits.includes(habit.name))) && (
                                        <View style={{ ...styles.tickIcon, ...styles.habitIcon }}>
                                            <Image 
                                                source={require('../Assets/Images/tick.png')} 
                                                style={{ width: '100%', height: '100%', resizeMode: 'contain' }} 
                                            />
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </View>
    
                    <View style={styles.currentHabitWrapper}>
                        <View style={styles.imageWrapper}>
                            <Image source={imageSource} style={styles.image} />
                        </View>
                        <Text style={styles.msg}>{msg}</Text>
                    </View>
    
                    {nextHabit && (
                        <View style={styles.nextHabitButton}>
                            <Button
                                mode="contained"
                                theme={{ colors: { primary: '#5E4B8B' } }}
                                style={[styles.btn]}
                                labelStyle={{ color: '#FFF' }}
                                onPress={() => {
                                    if (!completedHabits.includes(nextHabit.name)) {
                                        setUnlockedHabits(prevUnlocked => [...prevUnlocked, nextHabit.name]);
    
                                        readNdef()
                                        .then(() => {   
                                            setCompletedHabits(prevHabits => [...prevHabits, currentHabit]);
                                            if (nextHabit) {
                                                setCurrentHabit(nextHabit.name);
                                            }    
                                        })
                                        .catch(error => {
                                            console.error("Error reading NFC:", error);
                                        });
                                    }
                                }}
                            >
                                PRESS TO CONTINUE
                            </Button>
                            <AndroidPrompt ref={androidPromptRef} onCancelPress= {() => {
                                setIsRequestingNFC(false);
                                NfcManager.cancelTechnologyRequest();}} />
                        </View>
                    )}
    
                </View>
            );
                            };
    
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',      
        justifyContent: 'center',  
        backgroundColor: '#001F3F',
      },
      currentHabitWrapper: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
      },
      imageWrapper: {
        width: 202, // Add 2 pixels for the border width on both sides
        height: 202,
        borderRadius: 101,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#D1C4E9',
    },
    image: {
        width: 120,
        height: 120,
    },
      msg: {
        fontSize: 30,
        marginTop: 20,
      },
      nextHabitButton: {
          position: 'absolute',   // Absolute positioning
          bottom: 20,             // Anchor it 20 units from the bottom
          flexDirection: 'row',
          alignItems: 'center',
      },
      arrowText: {
          fontSize: 25,
          color: '#FFF',
          marginRight: 5,
      },
      btn: {
        margin: 20,
        maxWidth: 'auto',
        minWidth: 'auto',
        borderColor: '#F5F5F5',
        borderWidth: 1,
        elevation: 2,
      },
      progressTracker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,  // Add some padding to separate the icons
        marginBottom: 20,
        position: 'absolute',
        top: 10,
    },
    habitIcon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderWidth: 2,
        borderColor: '#F5F5F5',
        borderRadius: 30,
    },    

    activeHabitIcon: {
        borderWidth: 2,
        borderColor: '#F5F5F5',
        borderRadius: 30,  
    },
    iconContainer: {
        position: 'relative', 
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    tickIcon: {
        position: 'absolute', 
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        zIndex: 1,

    },
    
  });

export default Journey;