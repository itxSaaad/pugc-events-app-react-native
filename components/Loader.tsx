import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#324C80" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
