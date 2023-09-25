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
      // bypass
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
        <Button mode="contained" style={[styles.btn]} onPress={() => {readNdef();}}>
          TIME FOR BED
        </Button>
        <Button mode="contained" style={styles.btn} onPress={() => {navigation.navigate('WriteNdef')}}>
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
},
bottom: {
  paddingHorizontal: 20,
  paddingVertical: 40,
},
btn: {
  margin: 15,
  padding: 15,
  borderRadius: 8,
  maxWidth: 'auto',
  marginBottom: 15,
  elevation: 2,
},
});

export default Home;