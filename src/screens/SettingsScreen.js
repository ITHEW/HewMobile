// src/screens/SettingsScreen.js
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.replace('Login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.button}>
        <Button title="Logout" color="#d32f2f" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' },
  title: { fontSize:24, marginBottom:20 },
  button: { width: '60%' },
});
