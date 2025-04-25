import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';

export default function BeritaDetailScreen({ route }) {
  const { item } = route.params; // menerima data yang dikirim dari HomeScreen

  // Format tanggal dengan lebih detail
  const formattedDate = new Date(item.createdAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Gambar dinamis dari URL yang ada di item.gambar */}
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/gps-cs-s/AB5caB-TIY1p9krnnjO2VKzCLvXHoLncjRAb3XFeQncFNveZG1OwuCA2I_1uLcgroOgkFaN5RyTOGUtN2BpL02S_j5n2ui2SNrxWKUsdm52WUZatixNMZrdyq6i_SEkgfBPnTzx1ZSGJHg=s680-w680-h510' }} // menampilkan gambar berita
        style={styles.image}
      />
      {/* Membungkus teks dengan komponen <Text> */}
      <Text style={styles.title}>{item.judul}</Text>
      <Text style={styles.date}>{formattedDate}</Text> {/* Format tanggal */}
      
      {/* Menggunakan HTML untuk merender deskripsi yang mengandung tag HTML */}
      <HTML
        source={{ html: item.isi }}  
        contentWidth={300} // Sesuaikan lebar konten dengan lebar perangkat
        tagsStyles={{
          p: { fontSize: 16, color: '#333' },
          h1: { fontSize: 24, fontWeight: 'bold' },
        }} // Custom styles untuk tag HTML
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
});
