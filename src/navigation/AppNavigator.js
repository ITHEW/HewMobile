import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import BeritaDetailScreen from '../screens/BeritaDetailScreen'; // ⬅️ import screen detail
import HxPageScreen from '../screens/HxPageScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen
              name="Dashboard"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BeritaDetail"
              component={BeritaDetailScreen}
              options={{ title: 'Detail Berita' }}
            />
            <Stack.Screen
              name="HxPage"
              component={HxPageScreen}
              options={{ title: '' }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: '' }}
            />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}