// src/navigation/TabNavigator.js
import React, { useContext } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { AuthContext } from '../contexts/AuthContext'; 
import ProfileScreen from '../screens/ProfileScreen';
import PresensiScreen from '../screens/PresensiScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import PengumumanScreen from '../screens/PengumumanScreen';

const Tab = createBottomTabNavigator();

// Sekarang `user.profileUrl` bisa dipakai untuk headerRight


export default function TabNavigator() {
    const { user } = useContext(AuthContext);
    const users = Array.isArray(user) && user.length > 0 ? user[0] : {};
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // --- Header (Top Navbar) ---
        headerShown: true,
        headerStyle: {
          backgroundColor: '#78cf81',
        },
        headerTintColor: '#fff',
        headerTitle: '', 
        headerLeft: () => (
          <Image
            source={require('../../assets/images/logo.png')}
            style={{
              width: 100,
              height: 30,
              resizeMode: 'contain',
              marginLeft: 12,
            }}
          />
        ),
        // letakkan foto profile di kanan
        headerRight: () => (
            <Image
              source={{
                uri:
                    users?.foto
                    ? `https://herbaemas.com/images/${users.foto}`
                    : 'https://placekitten.com/200/200',
              }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                marginRight: 12,
              }}
            />
          ),
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#616161',
        // Style container navbar
        tabBarStyle: {
            backgroundColor: '#78cf81',    // biru tua
            borderTopWidth: 0,              // hilangkan garis atas
            elevation: 5,                   // shadow Android
            height: 60,
            paddingBottom: 5,
          },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'Presensi') iconName = 'calendar-number';
          else if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Pengumuman') iconName = 'newspaper';
          else if (route.name === 'Settings') iconName = 'settings';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Presensi" component={PresensiScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pengumuman" component={PengumumanScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
