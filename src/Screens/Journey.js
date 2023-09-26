import React from 'react';
import {View, Text, StyleSheet, Image, Platform } from 'react-native';
import { habitList } from '../HabitData';
import { getNextHabit } from '../Components/GetNextHabit'
import {Button} from 'react-native-paper';
import AndroidPrompt from '../AndroidPrompt';
import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';

const images = {
    'toothbrush': require('../Assets/Images/toothbrush.jpg'),
}


function Journey(props) {
    const {route, navigation} = props;
    const {msg} = route.params;
  
    const lowerCaseMsg = msg.toLowerCase();
  
    const imageSource = images[lowerCaseMsg] || require('../Assets/Images/default.jpg');
  
    const nextHabit = getNextHabit(msg, habitList);

    const androidPromptRef = React.useRef();

    async function readNdef() {
        try {  
          if (Platform.OS === 'android') {
          androidPromptRef.current.setHintText(`Now scan the ${nextHabit.name} tag`);
          androidPromptRef.current.setVisible(true);
          }
          await NfcManager.requestTechnology(NfcTech.Ndef);
          const tag = await NfcManager.getTag();
          navigation.navigate('TagDetailsScreen', {tag});
        } catch (ex) {
            androidPromptRef.current.setHintText('Error');
            console.error(ex);
        } finally {
          NfcManager.cancelTechnologyRequest();
          if (Platform.OS === 'android') {
          androidPromptRef.current.setVisible(false);
          }
        }
    }
    
  
        return (
            <View style={styles.wrapper}>
                <View style={styles.currentHabitWrapper}>
                    <Image source={imageSource} style={styles.image} />
                    <Text style={styles.msg}>{msg}</Text>
                </View>
                
                {nextHabit && (
                  <View style={styles.nextHabitButton}>
                    <Button 
                        mode="contained"  // Changed from "outlined" to "contained"
                        theme={{ colors: { primary: '#5E4B8B' } }}
                        style={[styles.btn]} 
                        labelStyle={{ color: '#FFF' }}  
                        onPress={() => {readNdef();}}
                    >
                        PRESS TO CONTINUE
                    </Button>
                  </View>
                )}
                <AndroidPrompt ref={androidPromptRef} />
            </View>
        );
            }

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
      image: {
        width: 150,
        height: 150,
        borderRadius: 25,
        marginBottom: 10,
        resizeMode: 'cover',
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
  });

export default Journey;