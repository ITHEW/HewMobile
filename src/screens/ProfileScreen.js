import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Avatar, Card, Title, Provider as PaperProvider } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);
  const profile = Array.isArray(user) && user.length > 0 ? user[0] : {};

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={100}
            source={{
              uri: profile?.foto
                ? `https://herbaemas.com/images/${profile.foto}`
                : 'https://placekitten.com/200/200',
            }}
          />
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Profil Karyawan</Title>

            <TextInput
              label="Nama"
              value={profile?.nama}
              mode="outlined"
              style={styles.input}
              editable={false}
            />

            <TextInput
              label="Jabatan"
              value={profile?.nama_jabatan}
              mode="outlined"
              style={styles.input}
              editable={false}
            />

            <TextInput
              label="Departemen"
              value={profile?.nama_departemen}
              mode="outlined"
              style={styles.input}
              editable={false}
            />

            <TextInput
              label="Email"
              value={profile?.email}
              mode="outlined"
              style={styles.input}
              editable={false}
            />

            <TextInput
              label="Telepon"
              value={profile?.telepon}
              mode="outlined"
              style={styles.input}
              editable={false}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 16,
    fontSize: 18,
  },
});
