import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View } from'react-native';

import Home from './Screens/Home';
import WriteNdefScreen from './Screens/WriteNdefScreen';
import Screen2 from './Screens/History';
import Journey from './Screens/Journey';
import TagDetailsScreen from './Screens/TagDetailsScreen';
import CompletedJourneyScreen from './Screens/CompletedJourney';
import Setup from './Screens/Setup';
import Settings from './Screens/Settings';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Journey" component={Journey} options={{ headerShown: false }} />
            <Stack.Screen name="TagDetailsScreen" component={TagDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CompletedJourneyScreen" component={CompletedJourneyScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const JourneysStack = createStackNavigator();

function JourneysNavigator() {
    return (
        <JourneysStack.Navigator>
            <JourneysStack.Screen name="Setup" component={Setup} options={{ headerShown: false }} />
            <JourneysStack.Screen name="WriteNdef" component={WriteNdefScreen} options={{ headerShown: false }} />
        </JourneysStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Sleep Journey"
            screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#001F3F',
                tabBarStyle: {
                    borderTopWidth: 0, 
                    backgroundColor: '#5E4B8B',
                    paddingTop: 2,
                    height: 60,
                },
                tabBarLabelStyle: {
                    marginBottom: 6,
                },
            }}>
                <Tab.Screen 
                    name="Journey"
                    component={JourneysNavigator}
                    options={({ focused }) => ({
                        tabBarLabel: 'Journey',
                        tabBarIcon: ({ color, size }) => (
                                <FontAwesome5 name="route" color={color} size={size} />
                        ),
                        headerStyle: {
                            backgroundColor: '#001F3F',
                            backgroundColor: '#001F3F',
                            borderBottomWidth: 0,
                            shadowOpacity: 0,
                            elevation: 0,    
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerTitle: 'Sleep Journey',
                        headerLeft: () => (
                            <MaterialCommunityIcons 
                                name="weather-night" 
                                size={24} 
                                color="#fff" 
                                style={{ marginLeft: 10 }}
                            />
                        ),
                    })}
                />    
                <Tab.Screen 
                    name="Sleep Journey" 
                    component={AppNavigator} 
                    options={({ navigation }) => ({
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="moon-o" color={color} size={size} />
                        ),
                        headerStyle: {
                            backgroundColor: '#001F3F',
                            borderBottomWidth: 0,
                            shadowOpacity: 0,
                            elevation: 0,    
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerTitle: '',
                        headerLeft: () => (
                            <MaterialCommunityIcons 
                                name="weather-night" 
                                size={24} 
                                color="#fff" 
                                style={{ marginLeft: 10 }}
                            />
                        ),
                        headerRight: () => (
                            <View style={{ marginRight: 10 }}>
                                <Ionicons
                                    name="settings-outline" 
                                    size={24} 
                                    color="#fff" 
                                    onPress={() => navigation.navigate('Settings')} 
                                />
                            </View>
                        ),
                    })}
                />
                <Tab.Screen 
                    name="History" 
                    component={Screen2} 
                    options={{
                        tabBarLabel: 'History',
                        tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="tasks" color={color} size={size} />
                        ),
                        headerStyle: {
                            backgroundColor: '#001F3F',
                            borderBottomWidth: 0,
                            shadowOpacity: 0,
                            elevation: 0,    
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerLeft: () => (
                            <MaterialCommunityIcons 
                                name="weather-night" 
                                size={24} 
                                color="#fff" 
                                style={{ marginLeft: 10 }}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
                }

export default BottomTabNavigation;