import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            backgroundColor: '#87CEEB',
            image: <Image source={require('../Assets/Images/sun.png')} style={styles.image} />,
            title: 'Setup your Sleep Journey',
            "subtitle": "First, head to the Journey tab and add 3 habits to your Journey. Scan 3 separate NFC tags and place them somewhere easy to access. \n\n The first, something you already do e.g. brush your teeth. \n\n The second something new e.g. drink water.\n\nThe third \"Sleep\" is the most important, place the tag across the room from your bed move a charger there if needed. This is where your phone will be placed when you get into bed."
          },
          {
            backgroundColor: '#003366',
            image: <Image source={require('../Assets/Images/sunset.png')} style={styles.image} />,
            title: 'Complete your Sleep Journey',
            subtitle: 'Complete your journey just before getting into bed.\n\nScan your first tag and follow your journey. \n\nOnce completed, leave your phone on the last tag until morning.',
          },
          {
            backgroundColor: '#001F3F',
            image: <Image source={require('../Assets/Images/moon.png')} style={styles.image} />,
            title: 'View your Sleep Journeys',
            subtitle: "Head to the History tab to view your completed sleep journeys.",
          },
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  image: {
    width: 400, 
    height: 200, 
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});