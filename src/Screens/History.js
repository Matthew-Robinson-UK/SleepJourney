import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

const SCREEN_DATA_KEY = '@CompletedJourneyScreen:data';

function HistoryScreen() {
  const [data, setData] = useState({
    visitCount: 0,
    visitTimes: [],
    averageVisitTime: 0,
    streak: 0,
  });

  useEffect(() => {
    async function fetchScreenData() {
      try {
        const storedData = await AsyncStorage.getItem(SCREEN_DATA_KEY);
        if (storedData) {
          setData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Error fetching screen data: ", error);
      }
    }

    fetchScreenData();
  }, []);

  const resetData = async () => {
    const resetValues = {
      visitCount: 0,
      visitTimes: [],
      averageVisitTime: 0,
      streak: 0,
    };
  
    try {
      await AsyncStorage.setItem(SCREEN_DATA_KEY, JSON.stringify(resetValues));
      setData(resetValues);
    } catch (error) {
      console.error("Error resetting data: ", error);
    }
  };
  
  

  // Convert decimal time to hours and minutes format
  const convertToHoursAndMinutes = (decimalTime) => {
    const hours = Math.floor(decimalTime);
    const minutes = Math.round((decimalTime - hours) * 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total Journeys: {data.visitCount}</Text>
      <Text style={styles.text}>Avg Journey Completion Time: {convertToHoursAndMinutes(data.averageVisitTime)}</Text>
      <Text style={styles.text}>Current Streak: {data.streak}</Text>
      <Button
        mode="contained" 
        style={styles.btn}
        onPress={resetData}
      >
        Reset Data
      </Button>
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
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  btn: {
    borderWidth: 1,
    backgroundColor: '#FFD180',
    borderColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
});

export default HistoryScreen;