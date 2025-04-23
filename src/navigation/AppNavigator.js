// src/navigation/AppNavigator.js
import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    // while checking token, show spinner or empty screen
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token
          ? <Stack.Screen name="Dashboard" component={TabNavigator} />
          : <Stack.Screen name="Login" component={LoginScreen} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}