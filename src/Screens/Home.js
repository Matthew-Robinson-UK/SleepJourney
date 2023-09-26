import React from 'react';
import {TouchableOpacity, View, StyleSheet, Linking, Text, Platform} from 'react-native';
import {Button} from 'react-native-paper';
import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';
import AndroidPrompt from '.././AndroidPrompt'
import { useNavigation } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const [start, setStart] = React.useState(null);
  const [duration, setDuration] = React.useState(0);
  const androidPromptRef = React.useRef(); // call React.useRef() to obtain a ref object

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
      if (url) {
        navigation.navigate('Journey', {
          msg: url.split('://')[1],
        });
      }
    }

    Linking.getInitialURL().then((url) => {
      handleUrl(url);
    });

    Linking.addEventListener('url', (event) => {
      handleUrl(event.url);
    });

    return () => {
      Linking.removeAllListeners('url');
    };
  }, [navigation]);

  async function readNdef() {
    try {  
      if (Platform.OS === 'android') {
      androidPromptRef.current.setVisible(true);
      }
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
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
      <View style={styles.bottom}>
        <Button                 
                mode="contained"  // Changed from "outlined" to "contained"
                theme={{ colors: { primary: '#5E4B8B' } }}
                style={[styles.btn]} 
                labelStyle={{ color: '#FFF' }}  
                onPress={() => {readNdef();}}>
                TIME FOR BED
        </Button>
        <Button                 
                mode="contained"  // Changed from "outlined" to "contained"
                theme={{ colors: { primary: '#5E4B8B' } }}
                style={[styles.btn]} 
                labelStyle={{ color: '#FFF' }}   
                onPress={() => {navigation.navigate('WriteNdef')}}>
                LINK
        </Button>
        <AndroidPrompt ref={androidPromptRef} onCancelPress= {() => {NfcManager.cancelTechnologyRequest();}} />
      </View>
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
bottom: {
  paddingHorizontal: 20,
  paddingVertical: 40,
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

export default Home;