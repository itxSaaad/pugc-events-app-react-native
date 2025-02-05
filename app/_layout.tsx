import { Slot, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import store from '@/store';

export default function RootLayout() {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/';
  const isNotAuth = pathname === '/login' || pathname === '/register';

  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={'#324C80'} barStyle={'light-content'} />

          <View style={styles.header}>
            <Appbar.Header style={styles.headerContent}>
              <Image
                source={require('../assets/images/favicon.png')}
                style={styles.logo}
              />
              <Appbar.Content
                title="PUGC Events"
                titleStyle={styles.headerText}
              />
              {isNotAuth ? null : (
                <>
                  {isHome ? (
                    <Appbar.Action
                      style={styles.menuButton}
                      icon="account"
                      color="#fff"
                      onPress={() => router.push('/profile')}
                    />
                  ) : (
                    <Appbar.Action
                      style={styles.menuButton}
                      icon="home"
                      color="#fff"
                      onPress={() => router.push('/')}
                    />
                  )}
                </>
              )}
            </Appbar.Header>
          </View>

          <View style={styles.content}>
            <Slot />
          </View>
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#324C80',
  },
  headerContent: {
    justifyContent: 'space-between',
    backgroundColor: '#324C80',
  },
  logo: {
    width: 32,
    height: 32,
    marginHorizontal: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuContent: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginTop: 55,
    padding: 10,
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    marginHorizontal: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: '#324C80',
  },

  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
