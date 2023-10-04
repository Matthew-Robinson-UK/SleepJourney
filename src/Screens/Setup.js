import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button, List } from'react-native-paper';
import AndroidPrompt from '../AndroidPrompt';
import HabitImage from '../Components/HabitImage';
import { fetchHabits } from '../Components/FetchHabits';

const Setup = ({ navigation }) => {

  const [habits, setHabits] = useState([]); // New state variable
  const androidPromptRef = React.useRef();
  useFocusEffect(
    React.useCallback(() => {
        const fetchData = async () => {
            try {
                const fetchedHabits = await fetchHabits();
                setHabits(fetchedHabits);
            } catch (error) {
                console.error("Error:", error.message);
                // Handle error in UI/UX, perhaps set some error state here
            }
        };
        fetchData();
    }, [])
);

  return (
    <View style={{ flex: 1, backgroundColor: '#001F3F' }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 15 }}>
        {habits.map((p, index) => (
          <View key={p.name} style={styles.listItemContainer}>
            <List.Item
              title={p.name}
              titleStyle={{ color: '#FFF' }}
              left={() => <HabitImage name={p.name.toLowerCase()} />}
            />
            <View style={styles.buttonContainer}>
              {index !== habits.length - 1 && (
                  <Button 
                  mode="text" 
                  onPress={() => {
                    console.log('Editing Habit:', p.id); // Log habit data here
                    navigation.navigate('WriteNdef', { habit: p, allowCreate: true, habitId: p.id })
                  }}
                >
                  Edit
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
          Add Habit
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
    marginBottom: 10,
  },
  
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  
  });

export default Setup;