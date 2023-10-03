// SettingsScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text>1. Setup your Sleep Journey</Text>

      <Text>2. Complete your Sleep Journey</Text>

      <Text>3. View your Sleep Journey History</Text>
    </View>
  );
}

const styles = StyleSheet.create({
wrapper: {
    flex: 1,
    alignItems: 'center',      
    justifyContent: 'center',  
    backgroundColor: '#001F3F',
  }
})

export default SettingsScreen
