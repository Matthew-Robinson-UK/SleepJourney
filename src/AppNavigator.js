import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Home from './Screens/Home';
import WriteNdefScreen from './Screens/WriteNdefScreen';
import Screen2 from './Screens/Screen2';
import Journey from './Screens/Journey';
import TagDetailsScreen from './Screens/TagDetailsScreen';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeStack" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="WriteNdef" component={WriteNdefScreen} />
            <Stack.Screen name="Journey" component={Journey} />
            <Stack.Screen name="TagDetailsScreen" component={TagDetailsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen 
                    name="SleepJourney" 
                    component={AppNavigator} 
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => <FontAwesome name="ship" color={color} size={size} />,
                    }}
                />
                <Tab.Screen 
                    name="Details" 
                    component={Screen2} 
                    options={{
                        tabBarLabel: 'History',
                        tabBarIcon: ({ color, size }) => <FontAwesome name="gear" color={color} size={size} />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default BottomTabNavigation;