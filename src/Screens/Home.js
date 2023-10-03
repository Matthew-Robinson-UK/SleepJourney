import React from 'react';
import {TouchableOpacity, View, StyleSheet, Linking, Text, Platform} from 'react-native';
import {Button} from 'react-native-paper';
import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';
import AndroidPrompt from '.././AndroidPrompt'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchStreak } from '../Components/DataHandler';
import { habitList } from '../HabitData';

const Home = ({ navigation }) => {
  const [start, setStart] = React.useState(null);
  const [duration, setDuration] = React.useState(0);
  const androidPromptRef = React.useRef(); // call React.useRef() to obtain a ref object

  const [streak, setStreak] = React.useState(0);
  const [displayButton, setDisplayButton] = React.useState(true); 


  const SCREEN_DATA_KEY = '@CompletedJourneyScreen:data';

  function resetCompletedHabits() {
    try {
      AsyncStorage.removeItem('completedHabits');
      // If you maintain the completedHabits state in the Home component or want to do other updates, do so here.
    } catch (error) {
      console.error("Error resetting completed habits:", error);
    }
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', resetCompletedHabits);
    
     return () => unsubscribe();
  }, [navigation]);

  React.useEffect(() => {
    async function getStreakData() {
      const { fetchedStreak, displayButton } = await fetchStreak(SCREEN_DATA_KEY);
      if (fetchedStreak !== undefined) {
        setStreak(fetchedStreak);
      }
      setDisplayButton(displayButton);
    }
    getStreakData();
  }, []);

  

  React.useEffect(() => {
    let count = 5;
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      count--;

      if (Platform.OS === 'android') { // set hint text for AndroidPrompt
        androidPromptRef.current.setHintText(`${count}...`);
      } else {
        NfcManager.setAlertMessageIOS(`${count}...`);
      }

      if (count <= 0) {
        NfcManager.unregisterTagEvent().catch(() => 0);
        setDuration(new Date().getTime() - start.getTime());

        if (Platform.OS === 'android') { // hide AndroidPrompt
          androidPromptRef.current.setVisible(false);
        }
      }
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, [start]);
  
  React.useEffect(() => {
    function handleUrl(url) {
      const msg = url.split('://')[1];
      if (url && msg === habitList[0].name) {
        navigation.navigate('Journey', {
          msg: msg,
        });
      }
    }
  
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });
  
    const handleEventUrl = (event) => {
      handleUrl(event.url);
    };
  
    Linking.addEventListener('url', handleEventUrl);
  
    return () => {
      Linking.removeAllListeners('url');
    };
  }, [navigation]);
  

  async function readNdef() {
    try {  
      androidPromptRef.current.setHintText('Scan ' + habitList[0].name + ' to start!');
      if (Platform.OS === 'android') {
        androidPromptRef.current.setVisible(true);
      }
      
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
  
      // Check if the tag message is not the first habit in the habit list
      const payloadString = String.fromCharCode(...tag.ndefMessage[0].payload).trim();
      const habitFromPayload = payloadString.split('://')[1];

      if(habitFromPayload !== habitList[0].name) {
        if (Platform.OS === 'android') {
          androidPromptRef.current.setHintText('Please scan ' + habitList[0].name + '!');
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
        return;
      }
      navigation.navigate('TagDetailsScreen', {tag});
    } catch (ex) {
      androidPromptRef.current.setHintText('Error');
    } finally {
      NfcManager.cancelTechnologyRequest();
      if (Platform.OS === 'android') {
        androidPromptRef.current.setVisible(false);
      }
    }
  }


  return (
    <View style={styles.wrapper}>
      
      <View style={styles.streakWrapper}>
        <Text style={{ fontSize: 24, color: 'white' }}>
          Streak: {streak} {streak === 1 ? 'day' : 'days'}
        </Text>
        
      </View>
      <Button                 
          mode="contained" 
          theme={{ colors: { primary: '#5E4B8B' } }}
          style={[styles.btn]} 
          labelStyle={{ color: '#FFF' }}  
          onPress={readNdef}
        >
          TIME FOR BED
        </Button>

      <View style={styles.bottom}>
        <AndroidPrompt ref={androidPromptRef} onCancelPress= {() => {NfcManager.cancelTechnologyRequest();}} />
      </View>
    </View> 
  );
  
  };

const styles = StyleSheet.create({
wrapper: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#001F3F',
},
streakWrapper: {
  alignItems: 'flex-end',
  marginTop: 50,
  marginStart: 180,
},
bottom: {
  paddingHorizontal: 20,
  paddingVertical: 40,
},
btn: {
  margin: 20,
  maxWidth: 250,
  elevation: 20, // existing for Android

  // Borders for depth
  borderColor: '#fff',
  borderWidth: 2,
  borderRadius: 5,
  
  backgroundColor: "#5E4B8B", // You can replace this with a gradient for more depth
},
});

export default Home;