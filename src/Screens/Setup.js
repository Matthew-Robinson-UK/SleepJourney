import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from'react-native-paper';
import AndroidPrompt from '../AndroidPrompt';

const Setup = ({ navigation }) => {
    const androidPromptRef = React.useRef();
  return (
    <View style={styles.container}>
      <Button                 
                mode="contained"
                theme={{ colors: { primary: '#5E4B8B' } }}
                style={[styles.btn]} 
                labelStyle={{ color: '#FFF' }}   
                onPress={() => {navigation.navigate('WriteNdef')}}>
                LINK
        </Button>
        <AndroidPrompt ref={androidPromptRef} onCancelPress= {() => {NfcManager.cancelTechnologyRequest();}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001F3F',
},
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

export default Setup;