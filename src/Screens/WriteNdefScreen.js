import React from 'react';
import {View, StyleSheet, SafeAreaView, Platform, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import AndroidPrompt from '.././AndroidPrompt';
import { addHabit } from '../Components/CreateHabit';
import { deleteHabit } from '../Components/DeleteHabit';


function WriteNdefScreen(props) {

  const habitId = props.route.params?.habitId;
  const [selectedLinkType, setSelectedLinkType] = React.useState('URI');
  const [value, setValue] = React.useState('');
  const [message, setMessage] = React.useState(''); 
  const androidPromptRef = React.useRef();

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Habit",
      "Are you sure you want to delete this habit?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            deleteHabit(habitId);
            props.navigation.navigate('Setup');  // Redirect back to Setup screen after deleting
          } 
        }
      ]
    );
  };

  async function writeNdef() {
    setMessage('Now tap NFC');
    androidPromptRef.current.setVisible(true);
    androidPromptRef.current.setHintText('Now tap NFC');
    let scheme = 'com.sleepjourney://';
  
    const uriRecord = Ndef.uriRecord(`${scheme}${value}`);
    const bytes = Ndef.encodeMessage([uriRecord]);
  
    try {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        androidPromptRef.current.setHintText('Success');
  
        // Get habitId from navigation params, if available
        
        // Pass habitId to addHabit. If it's undefined, addHabit will know to add a new habit
        addHabit(value, habitId);
        console.log(habitId);
  
        props.navigation.navigate('Setup');
      } catch (ex) {
        androidPromptRef.current.setHintText('Error');
        console.log(ex);
      } finally {
        NfcManager.cancelTechnologyRequest();
        setTimeout(() => {
            androidPromptRef.current.setVisible(false);
          }, 1500);
      }
  }

  return (
    <View style={styles.wrapper}>
      <View style={[styles.wrapper, styles.pad]}>
        <TextInput
          label="HABIT"
          value={value}
          onChangeText={setValue}
          autoCapitalize="none"
        />
      </View>

      <View style={[styles.bottom, styles.bgLight]}>
        <Button onPress={writeNdef}>WRITE</Button>
      </View>
      {habitId && (
      <View style={[styles.bottom, styles.bgRed]}>
      
          <Button onPress={confirmDelete}>DELETE</Button>
      </View>
      )}
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
  bgRed: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'red',
  },
});

export default WriteNdefScreen;