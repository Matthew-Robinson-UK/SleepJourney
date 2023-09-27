import React from 'react';
import { View, Image, StyleSheet, Animated, Text } from 'react-native';
import { habitList } from '../HabitData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const images = {
    'toothbrush': require('../Assets/Images/toothbrush.png'),
    'water': require('../Assets/Images/water.png'),
    'charger': require('../Assets/Images/charger.png'),
};


function getHabitStatus(habitName) {
    const [completedHabits, setCompletedHabits] = React.useState([]);
    const [currentHabit, setCurrentHabit] = React.useState('');

    React.useEffect(() => {
        const fetchCompletedHabits = async () => {
            try {
                const storedHabits = await AsyncStorage.getItem('completedHabits');
                if (storedHabits) {
                    setCompletedHabits(JSON.parse(storedHabits));
                }
            } catch (error) {
                console.error("Error fetching completed habits: ", error);
            }
        };

        fetchCompletedHabits();
    }, []);
        if (completedHabits.includes(habitName)) {
            return 'completed';
        } else if (habitName === currentHabit) {
            return 'active';
        } else {
            return 'default';
        }
}

function CompletedJourneyScreen() {

    const progressTrackerOpacity = React.useRef(new Animated.Value(1)).current;
    const textBoxOpacity = React.useRef(new Animated.Value(0)).current;


    React.useEffect(() => {
        const timer = setTimeout(() => {
            // Fade out progressTracker and fade in textBox simultaneously
            Animated.parallel([
                Animated.timing(progressTrackerOpacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,  // This is important for performance
                }),
                Animated.timing(textBoxOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,  // This is important for performance
                }),
            ]).start();
        }, 3000);  // 3 seconds delay
    
        return () => clearTimeout(timer);  // Clear timer on component unmount
    }, []);

    
    return (
        <View style={styles.wrapper}>
            <Animated.View style={[styles.progressTracker, { opacity: progressTrackerOpacity }]}>
                {habitList.map((habit, index) => {
                    const status = getHabitStatus(habit.name);
                    const habitIconSource = images[habit.name.toLowerCase()];
                    let overlayIconSource;

                    if (status === 'completed') {
                        overlayIconSource = require('../Assets/Images/tick.png');
                    }

                    return (
                        <View key={index} style={styles.habitIconWrapper}>
                            <Image 
                                source={habitIconSource} 
                                style={styles.habitIcon}
                            />
                            {overlayIconSource && (
                                <Image 
                                    source={overlayIconSource} 
                                    style={styles.overlayIcon} 
                                />
                            )}
                        </View>
                    );
                })}
            </Animated.View>
            <Animated.View style={{ opacity: textBoxOpacity }}>
                <Text style={{ fontSize: 24, color: 'white' }}>Good night.</Text>
            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001F3F',
      },
    progressTracker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,  // Add some padding to separate the icons
        marginBottom: 20,
        position: 'absolute',
        top: 10,
    },
    habitIconWrapper: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',  // so the inner elements can be positioned absolutely
    },
    habitIcon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderWidth: 2,
        borderColor: '#F5F5F5',
        borderRadius: 30,
    },    
    overlayIcon: {
        position: 'absolute',  // position the tick icon absolutely
        top: 0,                // these ensure the tick icon covers the habit icon
        left: 0,
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
});

export default CompletedJourneyScreen;
