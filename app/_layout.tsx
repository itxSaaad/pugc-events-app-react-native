import { Slot, usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import {
  AnimatedFAB,
  Appbar,
  Divider,
  Menu,
  Provider as PaperProvider,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const isHome = pathname === '/';
  const isNotAuth =
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/events/create';

  return (
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
                  <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                      <Appbar.Action
                        style={styles.menuButton}
                        icon="account-circle"
                        color="#fff"
                        onPress={() => setMenuVisible(true)}
                      />
                    }
                    contentStyle={styles.menuContent}
                  >
                    <Menu.Item
                      onPress={() => {
                        setMenuVisible(false);
                        router.push('/profile');
                      }}
                      title="Profile"
                      leadingIcon="account"
                      titleStyle={styles.menuItemText}
                    />
                    <Menu.Item
                      onPress={() => {
                        setMenuVisible(false);
                        router.push('/login');
                      }}
                      title="login"
                      leadingIcon="account"
                      titleStyle={styles.menuItemText}
                    />
                    <Menu.Item
                      onPress={() => {
                        setMenuVisible(false);
                        router.push('/register');
                      }}
                      title="register"
                      leadingIcon="account"
                      titleStyle={styles.menuItemText}
                    />
                    <Divider />
                    <Menu.Item
                      onPress={() => {
                        setMenuVisible(false);
                        console.log('Logout');
                      }}
                      title="Logout"
                      leadingIcon="logout"
                      titleStyle={styles.menuItemText}
                    />
                  </Menu>
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

        {isNotAuth ? null : (
          <>
            {isHome ? (
              <AnimatedFAB
                style={styles.fab}
                color="white"
                label="Create Event"
                extended={true}
                animateFrom={'right'}
                icon="plus"
                iconMode={'static'}
                onPress={() => router.push('/events/create')}
              />
            ) : null}
          </>
        )}
      </SafeAreaView>
    </PaperProvider>
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
    resizeMode: 'contain',
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 70,
    backgroundColor: '#324C80',
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
