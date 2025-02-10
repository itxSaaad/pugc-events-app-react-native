import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';

import Loader from '@/components/Loader';
import withAuth from '@/components/withAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchProfile, logoutUser } from '@/store/asyncThunks/authThunks';

function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, loading, userDetails, error } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  useEffect(() => {
    if (userDetails === null) {
      dispatch(fetchProfile());
    }
  }, []);

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
      {error && (
        <Text variant="bodyMedium" style={styles.errorText}>
          {error}
        </Text>
      )}
      <Text variant="headlineLarge" style={styles.headerText}>
        Profile
      </Text>
      <View style={styles.profileCard}>
        <Avatar.Image
          size={150}
          source={{
            uri: `https://ui-avatars.com/api/?name=${userDetails?.name}&background=324C80&color=fff`,
          }}
          style={styles.avatar}
          accessibilityLabel="User Avatar"
        />
        <View style={styles.userInfoContainer}>
          <Text variant="headlineMedium" style={styles.name}>
            {userDetails?.name}
          </Text>
          <Text variant="bodyLarge" style={styles.email}>
            {userDetails?.email}
          </Text>
          <View style={styles.roleChip}>
            <Text variant="bodyMedium" style={styles.roleText}>
              {userDetails?.role.toLocaleUpperCase()}
            </Text>
          </View>
          <View style={styles.statsCard}>
            <Text variant="titleMedium" style={styles.statsLabel}>
              RSVPed Events
            </Text>
            <Text variant="headlineMedium" style={styles.statsNumber}>
              {userDetails?.rsvps.length}
            </Text>
          </View>
        </View>
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
  },
  headerText: {
    color: '#324C80',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  errorText: {
    color: '#FF453A',
    textAlign: 'center',
    marginBottom: 16,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 8,
  },
  avatar: {
    marginBottom: 20,
    borderColor: '#324C80',
    shadowColor: '#324C80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  userInfoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontWeight: '700',
    color: '#324C80',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 24,
  },
  email: {
    color: '#334155',
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.8,
  },
  roleChip: {
    backgroundColor: 'rgba(207, 226, 243, 0.5)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 20,
  },
  roleText: {
    color: '#324C80',
    fontWeight: '600',
  },
  statsCard: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(207, 226, 243, 0.5)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(50, 76, 128, 0.1)',
  },
  statsLabel: {
    color: '#324C80',
    marginBottom: 4,
  },
  statsNumber: {
    color: '#324C80',
    fontWeight: 'bold',
    fontSize: 28,
  },
  logoutButton: {
    backgroundColor: '#324C80',
    borderRadius: 12,
    marginTop: 32,
    shadowColor: '#324C80',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
