import React, { useState } from 'react';
import {
  StyleSheet, Text, TextInput, TouchableOpacity,
  View, Image, Alert, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('home'); // 👈 usa el mismo nombre de tu navigator
    } catch (error) {
      let mensaje = 'Ocurrió un error al iniciar sesión';

      if (error.code === 'auth/user-not-found') mensaje = 'No existe una cuenta con ese correo';
      if (error.code === 'auth/wrong-password') mensaje = 'Contraseña incorrecta';
      if (error.code === 'auth/invalid-email') mensaje = 'El correo no es válido';
      if (error.code === 'auth/invalid-credential') mensaje = 'Correo o contraseña incorrectos';

      Alert.alert('Error', mensaje);
    } finally {
      setLoading(false);
    }
  };

  const Registrate = () => {
    navigation.navigate('registro');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Image source={require("../images/logo.png")} style={styles.logoImage} resizeMode="contain" />
          </View>

          <Text style={styles.appTitle}>Synapse</Text>
          <Text style={styles.subtitle}>Aprende más inteligente</Text>
        </View>

        <View style={styles.scrollContainer}>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.welcomeTitle}>Bienvenidos</Text>
            <Text style={styles.welcomeSubtitle}>Ingresa a tu cuenta para continuar</Text>

            {/* Google */}
            <TouchableOpacity style={styles.googleButton}>
              <Image
                style={styles.GoogleImage}
                resizeMode="contain"
                source={require('../images/google.webp')}
              />
              <Text style={styles.googleButtonText}>Continuar con Google</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>O con email</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={18} color="#A0AEC0" style={styles.inputIcon} />
              <TextInput
                placeholder="tu@email.com"
                placeholderTextColor="#B0B7C3"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={18} color="#A0AEC0" style={styles.inputIcon} />
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#B0B7C3"
                secureTextEntry={!showPassword}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color="#A0AEC0"
                />
              </TouchableOpacity>
            </View>

            {/* Login */}
            <TouchableOpacity
              style={[styles.loginButton, loading && { opacity: 0.7 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              }
            </TouchableOpacity>

            {/* Registro */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes cuenta? </Text>
              <TouchableOpacity onPress={Registrate}>
                <Text style={styles.registerLink}>Regístrate</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.Foot}>
            Al continuar, aceptas nuestros Términos y Política de Privacidad
          </Text>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop:60,
    marginBottom:10,
    alignItems: 'center',
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  card: {
    width: '88%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 28,
    borderWidth:0.1,
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: '#94A3B8',
    marginBottom: 24,
  },
  logoImage: {
    width: 80,
    height: 80,
},
  GoogleImage: {
      width: 20,
      height: 20,
  },
  googleButton: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  googleButtonText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginLeft:10,
    marginRight:10,
    fontSize: 13,
    color: '#94A3B8',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
    marginTop: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  loginButton: {
    marginTop: 12,
    height: 54,
    backgroundColor: '#3B82F6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  registerLink: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Foot: {
    width: '80%',
    textAlign: 'center',
    fontSize: 12,
    color: '#A1A1AA',
  },
});