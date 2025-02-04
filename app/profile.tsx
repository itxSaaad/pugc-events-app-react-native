import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';

export default function Profile() {
  const router = useRouter();
  const [user] = useState({
    name: 'Muhammad Saad Faisal',
    email: 'saad@example.com',
  });

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => router.replace('/login') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={120}
        source={{
          uri: `https://ui-avatars.com/api/?name=${user.name}&background=324C80&color=fff`,
        }}
        style={styles.avatar}
      />
      <Text variant="headlineMedium" style={styles.name}>
        {user.name}
      </Text>
      <Text variant="bodyLarge" style={styles.email}>
        {user.email}
      </Text>

      <Button
        mode="contained"
        style={styles.logoutButton}
        onPress={handleLogout}
        contentStyle={styles.buttonContent}
        icon="logout"
        textColor="white"
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#324C80',
  },
  name: {
    fontWeight: '700',
    color: '#324C80',
    textAlign: 'center',
    marginBottom: 6,
  },
  email: {
    color: '#334155',
    textAlign: 'center',
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#324C80',
    borderRadius: 8,
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 6,
  },
});
