import React, { useState, useContext } from 'react';
import { API_BASE_URL } from '../constants/api';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const background = require('../../assets/images/background.png'); // ganti dengan path kamu
const logo = require('../../assets/images/logo.png');

export default function LoginScreen() {
    const navigation = useNavigation();
    const { login }  = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'NIK dan password harus diisi.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // tambahkan header lain jika perlu, misal Authorization
                },
                body: JSON.stringify({ username, password }),
            });
            
            const data = await res.json();
            setLoading(false);
            
            if (res.ok) {
                if (data.kode == 200) {
                    const resDetail = await fetch(`${API_BASE_URL}/karyawan-detail`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + data.refreshToken
                      },
                      body: JSON.stringify({ nik:username }),
                    });
                    const dataDetail = await resDetail.json();
                    if (!resDetail.ok) {
                      throw new Error(dataDetail.message || 'Gagal ambil detail');
                    }
                    await login(data.refreshToken, dataDetail)
                    navigation.replace('Dashboard');
                }else{
                    Alert.alert('Login Gagal', data.message || 'Periksa kembali NIK dan Password.');
                }
            } else {
            // tampilkan pesan error dari server
                Alert.alert('Login Gagal', data.message || 'Periksa kembali kredensial.');
            }
        } catch (err) {
            setLoading(false);
            Alert.alert('Network Error', 'Tidak dapat terhubung ke server.');
            console.error(err);
        }
    };
  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.titleSpan}>PT. Herba Emas Wahidatama</Text>
        <TextInput
          placeholder="Nomor Induk Karyawan"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        {loading
          ? <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
          : <Button title="Login" onPress={handleLogin} />
        }
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.14)', // efek gelap transparan
  },
  logo: {
    width: 150, // atur sesuai kebutuhan
    height: 100,
    marginLeft: 90,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
  },
  titleSpan: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
    color: '#fff',
  },
});
