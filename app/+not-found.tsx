import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function PlusNotFound() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Page not found
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        The page you're looking for doesn't exist.
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        textColor="white"
        buttonColor="#324C80"
        onPress={() => {
          router.push('/');
        }}
      >
        Go back home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#324C80',
  },
  subtitle: {
    color: '#324C80',
    opacity: 0.7,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#324C80',
    borderRadius: 8,
    marginTop: 8,
  },
});
