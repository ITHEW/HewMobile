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
import BeritaCard from '../components/BeritaCard';
import { API_BASE_URL } from '../constants/api';
import { useNavigation } from '@react-navigation/native';

const menuItems = [
  { title: 'Mgt. Representative', page:'MrPage', icon: require('../../assets/images/menu/mr.png') },
  { title: 'Human Experience', page:'HxPage', icon: require('../../assets/images/menu/hr.png') },
  { title: 'General Affair', page:'GaPage', icon: require('../../assets/images/menu/ga.png') },
  { title: 'Purchasing', page:'PurPage', icon: require('../../assets/images/menu/purchase.png') },
  { title: 'Produksi', page:'ProdPage', icon: require('../../assets/images/menu/prod.png') },
  { title: 'Engineering', page:'EngPage', icon: require('../../assets/images/menu/eng.png') },
  { title: 'Supply Chain', page:'ScPage', icon: require('../../assets/images/menu/sc.png') },
  { title: 'QR & D', page:'QrPage', icon: require('../../assets/images/menu/qc.png') },
];

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const users = Array.isArray(user) && user.length > 0 ? user[0] : {};
  const navigation = useNavigation();
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/info-limit`)
      .then(res => res.json())
      .then(data => {
        setBeritaList(data); // pastikan data ini array
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem} 
    onPress={() => navigation.navigate(`${item.page}`, { title: item.title })}
    >
      <Image source={item.icon} style={styles.icon} />
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );

  return ( 
    <FlatList
      ListHeaderComponent={
        <>
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

          <Text style={styles.title}>Menu Departemen</Text>
          <FlatList
            key={4}
            data={menuItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            scrollEnabled={false}
            contentContainerStyle={styles.grid}
          />

          <Text style={[styles.title, { marginTop: 20 }]}>Pengumuman Terbaru</Text>
        </>
      }
      data={beritaList}
      renderItem={({ item }) => (
        <BeritaCard
          item={item}
          onPress={(berita) => navigation.navigate('BeritaDetail', { item: berita })}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={
        loading ? (
          <ActivityIndicator size="large" color="#999" style={{ marginTop: 20 }} />
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Belum ada pengumuman.</Text>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 16, fontWeight: 'bold', textAlign: 'left', marginLeft: 10, marginBottom: 8 },
  grid: { alignItems: 'center' },
  menuItem: {
    alignItems: 'center',
    margin: 8,
    width: 80,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  icon: {
    width: 36,
    height: 36,
    marginBottom: 6,
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    fontSize: 10,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 8,
    padding: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
});
