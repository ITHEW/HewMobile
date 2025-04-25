// components/BeritaCard.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import moment from 'moment';
import 'moment/locale/id';

export default function BeritaCard({ item, onPress }) {
  const tanggal = new Date(item.createdAt).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta', // agar sesuai WIB
  });
  
  return (
    <Card style={styles.card} onPress={() => onPress?.(item)}>
      <Card.Cover source={{ uri: 'https://lh3.googleusercontent.com/gps-cs-s/AB5caB-TIY1p9krnnjO2VKzCLvXHoLncjRAb3XFeQncFNveZG1OwuCA2I_1uLcgroOgkFaN5RyTOGUtN2BpL02S_j5n2ui2SNrxWKUsdm52WUZatixNMZrdyq6i_SEkgfBPnTzx1ZSGJHg=s680-w680-h510' }} />
      <Card.Content>
        <Title style={styles.title}>{item.judul}</Title>
        <Paragraph style={styles.date}>{tanggal}</Paragraph>
        <Paragraph>{item.slug}</Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    elevation: 4,
    overflow: 'hidden',
    marginBottom: 16,
    padding: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
});
