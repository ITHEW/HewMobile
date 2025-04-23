import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';

const menuItems = [
    { title: 'Mgt. Representative', icon: require('../../assets/images/menu/mr.png') },
    { title: 'Human Experience', icon: require('../../assets/images/menu/hr.png') },
    { title: 'General Affair', icon: require('../../assets/images/menu/ga.png') },
    { title: 'Purchasing', icon: require('../../assets/images/menu/purchase.png') },
    { title: 'Produksi', icon: require('../../assets/images/menu/prod.png') },
    { title: 'Engineering', icon: require('../../assets/images/menu/eng.png') },
    { title: 'Supply Chain', icon: require('../../assets/images/menu/sc.png') },
    { title: 'QR & D', icon: require('../../assets/images/menu/qc.png') },
  ];
  
export default function HomeScreen() {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.menuItem} onPress={() => alert(item.title)}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
    );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
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
container: { flex: 1, paddingTop: 40, backgroundColor: '#f5f5f5' },
title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
grid: { alignItems: 'center' },
menuItem: {
    alignItems: 'center',
    margin: 10,
    width: 90,
},
icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
    resizeMode: 'contain',
},
text: {
    textAlign: 'center',
    fontSize: 12,
},
});
