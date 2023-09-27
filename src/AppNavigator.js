import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View } from'react-native';

import Home from './Screens/Home';
import WriteNdefScreen from './Screens/WriteNdefScreen';
import Screen2 from './Screens/Screen2';
import Journey from './Screens/Journey';
import TagDetailsScreen from './Screens/TagDetailsScreen';
import CompletedJourneyScreen from './Screens/CompletedJourney';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeStack" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="WriteNdef" component={WriteNdefScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Journey" component={Journey} options={{ headerShown: false }} />
            <Stack.Screen name="TagDetailsScreen" component={TagDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CompletedJourneyScreen" component={CompletedJourneyScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#001F3F',
                tabBarStyle: {
                    borderTopWidth: 0,  // Removes the border
                    backgroundColor: '#5E4B8B',  // Set the background color here
                    paddingTop: 2, 
                },
                tabBarLabelStyle: {   // Adjust label position if needed
                    marginBottom: 6,   // Increase this to move label up
                },
            }}
                >
                <Tab.Screen 
                    name="Sleep Journey" 
                    component={AppNavigator} 
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => <FontAwesome name="bed" color={color} size={size} />,
                        tabBarItemStyle: {
                            backgroundColor: '#5E4B8B',
                        },
                        headerStyle: {
                            backgroundColor: '#5E4B8B',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Tab.Screen 
                    name="Details" 
                    component={Screen2} 
                    options={{
                        tabBarLabel: 'History',
                        tabBarIcon: ({ color, size }) => <FontAwesome name="moon-o" color={color} size={size} />,
                        tabBarItemStyle: {
                            backgroundColor: '#5E4B8B',
                        },
                        tabBarItemStyle: {
                            backgroundColor: '#5E4B8B',
                        },
                        headerStyle: {
                            backgroundColor: '#5E4B8B',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


export default BottomTabNavigation;