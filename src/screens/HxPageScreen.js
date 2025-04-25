import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

const menuItems = [
    { title: 'Profile', page:'Profile', icon: require('../../assets/images/menu_hx/profile.png') },
    { title: 'Kehadiran', page:'KehadiranPage', icon: require('../../assets/images/menu_hx/absensi.png') },
    { title: 'Data Cuti', page:'DatacutiPage', icon: require('../../assets/images/menu_hx/cuti.png') },
    { title: 'Remunerasi', page:'PProfilePage', icon: require('../../assets/images/menu_hx/remunerasi.png') },
    { title: 'Penilaian', page:'PrProfilePage', icon: require('../../assets/images/menu_hx/penilaian.png') },
    { title: 'Kesehatan', page:'EProfilePage', icon: require('../../assets/images/menu_hx/kesehatan.png') },
    { title: 'Gaji(Coming Soon)', page:'ProfilePage', icon: require('../../assets/images/menu_hx/gaji.png') },
    { title: 'Regulasi', page:'ProfilePage', icon: require('../../assets/images/menu_hx/regulasi.png') },
    { title: 'Finansial', page:'ProfilePage', icon: require('../../assets/images/menu_hx/finansial.png') },
    { title: 'Pelatihan', page:'ProfilePage', icon: require('../../assets/images/menu_hx/training.png') },
    { title: 'Karir', page:'ProfilePage', icon: require('../../assets/images/menu_hx/karir.png') },
    { title: 'Dokumen', page:'ProfilePage', icon: require('../../assets/images/menu_hx/dokumen.png') },
];

export default function HxPageScreen({ route }) {
  const { user } = useContext(AuthContext);
  const users = Array.isArray(user) && user.length > 0 ? user[0] : {};
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.menuItem} 
      onPress={() => navigation.navigate(`${item.page}`, { title: item.title })}
      >
      <Image source={item.icon} style={styles.icon} />
      <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <View style={styles.profileCard}>
            <Image
                source={{
                uri: users?.foto
                    ? `https://herbaemas.com/images/${users.foto}`
                    : 'https://placekitten.com/200/200',
                }}
                style={styles.avatar}
            />
            <View style={styles.profileText}>
                <Text style={styles.name}>{users?.nama ?? 'Nama Karyawan'}</Text>
                <Text style={styles.detail}>{users?.nama_departemen ?? 'Departemen'}</Text>
                <Text style={styles.detail}>{users?.nama_jabatan ?? 'Jabatan'}</Text>
            </View>
        </View>
        <FlatList
            data={menuItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={styles.grid}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 16 },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      textAlign: 'center',
    },
    grid: { alignItems: 'center' },
    menuItem: {
      alignItems: 'center',
      margin: 8,
      width: 90,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      backgroundColor: '#f9f9f9',
    },
    icon: {
      width: 40,
      height: 40,
      marginBottom: 6,
      resizeMode: 'contain',
    },
    text: {
      textAlign: 'center',
      fontSize: 11,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 22,
        padding: 10,
        borderRadius: 12,
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    profileText: {
        flex: 1,
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    detail: {
        fontSize: 12,
        color: '#555',
    },
});
