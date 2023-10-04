// SettingsScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {AuthContext} from '../Navigation/AuthProvider';

const SettingsScreen = () => {

  const {logout} = React.useContext(AuthContext);
  return (
    <View style={styles.wrapper}>
      <Text>1. Setup your Sleep Journey</Text>

      <Text>2. Complete your Sleep Journey</Text>

      <Text>3. View your Sleep Journey History</Text>
      <TouchableOpacity onPress={() => logout()}>
                <Text>Logout</Text>
              </TouchableOpacity>
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
