import React from 'react';
import {View, StyleSheet, SafeAreaView, Platform} from 'react-native';
import {Button, TextInput, Chip} from 'react-native-paper';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import AndroidPrompt from '.././AndroidPrompt';

function WriteNdefScreen(props) {
  const [selectedLinkType, setSelectedLinkType] = React.useState('URI');
  const [value, setValue] = React.useState('');
  const [message, setMessage] = React.useState(''); 
  const androidPromptRef = React.useRef();

  async function writeNdef() {
    setMessage('Now tap NFC');
    androidPromptRef.current.setVisible(true);  // Show prompt
    androidPromptRef.current.setHintText('Now tap NFC');
    let scheme = null;
    if  (selectedLinkType === 'URI') {
        scheme = 'com.sleepjourney://';
    } else if (selectedLinkType === 'TEL') {
      scheme = 'tel:';
    } else if (selectedLinkType === 'SMS') {
      scheme = 'sms:';
    } else if (selectedLinkType === 'EMAIL') {
      scheme = 'mailto:';
    } else if (selectedLinkType === 'WEB') {
        scheme = 'https://';
    } else {
      throw new Error('no such type');
    }
    const uriRecord = Ndef.uriRecord(`${scheme}${value}`);
    const bytes = Ndef.encodeMessage([uriRecord]);

    try {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        androidPromptRef.current.setHintText('Success');
      } catch (ex) {
        androidPromptRef.current.setHintText('Error');
        console.log(ex);
      } finally {
        NfcManager.cancelTechnologyRequest();
        setTimeout(() => {
            androidPromptRef.current.setVisible(false);  // Hide prompt
          }, 1500);
      }
  }

  return (
    <View style={styles.wrapper}>
      <SafeAreaView />
      <View style={[styles.wrapper, styles.pad]}>
        <View style={styles.linkType}>
          {['URI','WEB', 'TEL', 'SMS', 'EMAIL',].map(linkType => (
            <Chip
              key={linkType}
              style={styles.chip}
              selected={linkType === selectedLinkType}
              onPress={() => setSelectedLinkType(linkType)}>
              {linkType}
            </Chip>
          ))}
        </View>
        <TextInput
          label="TARGET"
          value={value}
          onChangeText={setValue}
          autoCapitalize="none"
        />
      </View>

      <View style={[styles.bottom, styles.bgLight]}>
        <Button onPress={writeNdef}>WRITE</Button>
      </View>
      <SafeAreaView style={styles.bgLight} />
      <AndroidPrompt ref={androidPromptRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#001F3F',
  },
  pad: {
    padding: 20,
  },
  chip: {
    marginRight: 10,
    marginBottom: 10,
  },
  linkType: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bottom: {
    padding: 10,
    alignItems: 'center',
  },
  bgLight: {
    backgroundColor: '#FFD180',
  },
});

export default WriteNdefScreen;