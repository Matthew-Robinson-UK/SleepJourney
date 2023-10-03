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
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 15 }}>
        {habitList.map((p, index) => (
          <View key={p.name} style={styles.listItemContainer}>
            <List.Item
              title={p.name}
              titleStyle={{ color: '#FFF' }}
              left={() => <HabitImage name={p.name.toLowerCase()} />}
            />

            <View style={styles.buttonContainer}>
              {/* Display Edit button for items that are not last in the list */}
              {index !== habitList.length - 1 && (
                <Button mode="text" onPress={() => navigation.navigate('Detail', { habit: p, allowCreate: true })}>
                  Edit
                </Button>
              )}

              {/* Display Delete button for items that are neither the first nor the last */}
              {index !== 0 && index !== habitList.length - 1 && (
                <Button mode="text" onPress={() => {
                  // Handle delete action here
                  console.log(`Delete ${p.name}`);
                }}>
                  Delete
                </Button>
              )}
            </View>
          </View>
        ))}
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
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,  // Optional, adds spacing between list items.
  },
  
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // This ensures buttons are aligned to the right.
  },
  
  });

export default Setup;