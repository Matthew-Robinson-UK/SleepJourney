import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet} from 'react-native';

function Unknown({style = {}, ...props}) {
  return (
    <FastImage
      source={require('../Assets/Images/default.png')}
      style={[styles.base, style]}
      resizeMode="contain"
      {...props}
    />
  );
}

function brushteeth({style = {}, ...props}) {
  return (
    <FastImage
      source={require('../Assets/Images/brush teeth.png')}
      style={[styles.base, style]}
      resizeMode="contain"
      {...props}
    />
  );
}

function Water({style = {}, ...props}) {
  return (
    <FastImage
      source={require('../Assets/Images/water.png')}
      style={[styles.base, style]}
      resizeMode="contain"
      {...props}
    />
  );
  }
  function Charger({style = {}, ...props}) {
    return (
      <FastImage
        source={require('../Assets/Images/charger.png')}
        style={[styles.base, style]}
        resizeMode="contain"
        {...props}
      />
    );
    }

  function HabitImage({name, ...props}) {
    if (name === 'brushteeth') {
      return <brushteeth {...props} />;
    } else if (name === 'water') {
      return <Water {...props} />;
    } else if (name === 'charger') {
      return <Charger {...props} />;
    }
    return <Unknown {...props} />;
  }
  
  const styles = StyleSheet.create({
    base: {
      width: 50,
      height: 50,
    },
  });
  
  export default HabitImage;