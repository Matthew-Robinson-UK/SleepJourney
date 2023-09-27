import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, List } from'react-native-paper';
import AndroidPrompt from '../AndroidPrompt';
import { habitList } from '../HabitData';
import HabitImage from '../Components/HabitImage';

const Setup = ({ navigation }) => {
const androidPromptRef = React.useRef();

return (
    <View style={{ flex: 1, backgroundColor: '#001F3F' }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 15, }}>
        {habitList.map(p => {
          return (
            <List.Item
              key={p.name}
              title={p.name}
              titleStyle={{ color: '#FFF' }}
              left={() => <HabitImage name={p.name.toLowerCase()} />}
              onPress={() => {
                navigation.navigate('Detail', { habit: p, allowCreate: true });
              }}
            />
          );
        })}
      </ScrollView>

      <View style={styles.container}>
        <Button
          mode="contained"
          theme={{ colors: { primary: '#5E4B8B' } }}
          style={styles.btn}
          labelStyle={{ color: '#FFF' }}
          onPress={() => { navigation.navigate('WriteNdef'); }}
        >
          LINK
        </Button>
        <AndroidPrompt ref={androidPromptRef} onCancelPress={() => { /* NfcManager.cancelTechnologyRequest(); */ }} />
      </View>
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