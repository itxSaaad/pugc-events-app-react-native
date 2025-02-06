import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import Loader from '@/components/Loader';
import { useAppDispatch, useAppSelector } from '@/store';
import { loginUser } from '@/store/asyncThunks/authThunks';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    loading,
    error: authError,
    user,
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        router.replace('/');
      })
      .catch(() => {
        setError('Invalid email or password');
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.heading}>
        Welcome Back!
      </Text>
      <Text variant="bodyLarge" style={styles.subheading}>
        Log in to continue
      </Text>

      {error || authError ? (
        <Text style={styles.errorText}>{error || authError}</Text>
      ) : null}

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        outlineColor="#324C80"
        activeOutlineColor="#324C80"
        keyboardType="email-address"
        textColor="#324C80"
        left={<TextInput.Icon icon="email" />}
      />

      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        outlineColor="#324C80"
        activeOutlineColor="#324C80"
        textColor="#324C80"
        secureTextEntry={!passwordVisible}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={passwordVisible ? 'eye' : 'eye-off'}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
      />

      <Button
        mode="contained"
        style={styles.loginButton}
        onPress={handleLogin}
        contentStyle={styles.buttonContent}
        textColor="white"
        icon="login"
      >
        Login
      </Button>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <Text
          style={styles.registerButton}
          onPress={() => router.push('/register')}
        >
          Register
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontWeight: '700',
    color: '#324C80',
    textAlign: 'center',
    marginBottom: 6,
  },
  subheading: {
    color: '#334155',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  loginButton: {
    backgroundColor: '#324C80',
    borderRadius: 8,
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  errorText: {
    color: '#FF453A',
    textAlign: 'center',
    marginBottom: 16,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  registerText: {
    color: '#334155',
  },
  registerButton: {
    color: '#324C80',
    fontWeight: '700',
  },
});
