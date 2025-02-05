import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';

import { useAppDispatch, useAppSelector } from '@/store';
import { logoutUser } from '@/store/asyncThunks/authThunks';

import Loader from '@/components/Loader';
import withAuth from '@/components/withAuth';

type User = {
  name: string;
  email: string;
  role: string;
};

function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          dispatch(logoutUser())
            .unwrap()
            .then(() => {
              router.replace('/login');
            })
            .catch(() => {
              Alert.alert('Error', 'An error occurred while logging out');
            });
        },
      },
    ]);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text
        variant="headlineLarge"
        style={{
          color: '#324C80',
          textAlign: 'center',
          marginBottom: 16,
        }}
      >
        Profile
      </Text>
      <View style={{ alignItems: 'center' }}>
        <Avatar.Image
          size={120}
          source={{
            uri: `https://ui-avatars.com/api/?name=${user?.name}&background=324C80&color=fff`,
          }}
          style={styles.avatar}
          accessibilityLabel="User Avatar"
        />
        <Text variant="headlineMedium" style={styles.name}>
          {user?.name}
        </Text>
        <Text variant="bodyLarge" style={styles.email}>
          {user?.email}
        </Text>
        <Text variant="bodyMedium" style={styles.role}>
          {user?.role.toLocaleUpperCase()}
        </Text>
      </View>
      <Button
        mode="contained"
        style={styles.logoutButton}
        onPress={handleLogout}
        contentStyle={styles.buttonContent}
        icon="logout"
        textColor="white"
        accessibilityLabel="Logout Button"
      >
        Logout
      </Button>
    </View>
  );
}

export default withAuth(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'space-evenly',
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
  role: {
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
